import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import GlobalContext from './context/GlobalContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GlobalContext>
        <BrowserRouter>
          <ToastContainer />
          <App />
        </BrowserRouter>
      </GlobalContext>
    </GoogleOAuthProvider>
  </StrictMode>,
)
