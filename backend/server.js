import express from 'express';
import 'dotenv/config';
import connectDB from './config/mongoDB.js';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import userModel from './models/userModel.js';
import userRouter from './routes/userRouter.js';
import replyRouter from './routes/replyRouter.js';
import checkAuthenticated from './middlewares/checkAuthenticated.js';
import connectCloudinary from './config/cloudinary.js';
import postRouter from './routes/postRouter.js';
import redisRouter from './routes/redisRouter.js'
import likesRouter from './routes/likesRouter.js';
import { syncDisLikesToMongo, syncLikesToMongo } from './utils/syncRedisToMongo.js';

const PORT = process.env.PORT || 4000;
const app = express();

// Connect to MongoDB
// Middleware
connectDB();
connectCloudinary()


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', redisRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/reply", replyRouter);
app.use("/likes",likesRouter)

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,  
    sameSite: 'lax',
  },
}));

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());

// Generate unique username
async function generateUsername(name) {
  const base = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let exists = true, username;
  while (exists) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    username = `${base}${randomNum}`;
    const user = await userModel.findOne({ username });
    if (!user) exists = false;
  }
  return username;
}

// Google Auth Strategy
const authUser = async (request, res, accessToken, refreshToken, profile, done) => {
  try {
    let user = await userModel.findOne({ googleId: profile.id });
    if (user) return done(null, user);

    const username = await generateUsername(profile.displayName);
    const newUser = await userModel.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.email,
      avatar: profile.picture,
      password: 'google',
      username,
    });
    return done(null, newUser);
  } catch (err) {
    return done(err, profile);
  }
};

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/auth/google/callback',
  passReqToCallback: true,
}, authUser));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173',
    failureRedirect: 'http://localhost:5173/login',
  })
);

// Logout
app.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    req.session.destroy(err => {
      if (err) return res.status(500).json({ error: 'Session destruction failed' });

      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      });
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

// Protected Route
app.get("/me", checkAuthenticated, async (req, res) => {
  try {
    const userId = req.user?._id || req.userId;
    const user = await userModel.findById(userId);
    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, user: null, error: 'User not authenticated' });
  }
});
setInterval(syncLikesToMongo, 10 * 1000);
setInterval(syncDisLikesToMongo, 10 * 1000);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
