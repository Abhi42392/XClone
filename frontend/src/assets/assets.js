import home from './home.png'
import home_fill from './home_fill.png'
import community_fill from './community_fill.png'
import community from './community.png'
import logo_fill from './logo_fill.png'
import logo from './logo.png'
import maximize from './maximize.png'
import message_fill from './message_fill.png'
import message from './message.png'
import more from './more.png'
import mute from './mute.png'
import notification from './notification.png'
import pause from './pause.png'
import play from './play.png'
import premium_fill from './premium_fill.png'
import premium from './premium.png'
import profile from './profile.png'
import profile_fill from './profile_fill.png'
import search from './search.png'
import settings from './settings.png'
import verified from './verified.png'
import volume from './volume.png'
import moremini from './moremini.png'
import profile_pic from './profile_pic.jpg'
import msdhonipp from './msdhonipp.jpg'
import scorpiopp from './scorpiopp.jpg'
import shibpp from './shibpp.jpg'
import viratpp from './viratpp.jpg'
import hardikpp from './hardikpp.jpg'
import gallery from './gallery.png'
import post1 from './post1.mp4'
import post2 from './post2.jpg'
import exit from './exit.jpg'
import post3 from './post3.mp4'
import settings_white from './settings_white.png'
import pic_in_pic from './pic_in_pic.png'
import comment from './comment.png'
import like from './like.png'
import save from './save.png'
import views from './views.png'
import upload from './upload.png'
import repost from './repost.png'
import active_like from './active-like.png'
import left_arrow from './left_arrow.png'
import account_background from './account_background.jpg'
import calendar from './calendar.png'
import apple from './apple.png'
import google from './google.png'
import cross from './cross.png'
import plus from './plus.png'
import logout from './logout.png'
import jobs from './jobs.png'
import ads from './ads.png'
import list from './list.png'
import monetization from './monetization.png'
import thunder from './thunder.png'
import edit_icon from './edit_icon.png'

import default_profile from './default_profile.jpg'
import default_background from './default_background.jpg'

export const assets={
    search,settings,premium,premium_fill,verified,volume,
    home,home_fill,message,message_fill,pause,play,notification,
    mute,profile,profile_fill,community,community_fill,logo,
    logo_fill,maximize,more,moremini,profile_pic,gallery,exit,settings_white,
    thunder,ads,monetization,logout,jobs,list,
    pic_in_pic,comment,like,save,views,upload,repost,active_like,left_arrow,
    account_background,calendar,apple,google,cross,plus,default_background,default_profile,
    edit_icon
}
export const userData=[{
    id:"0",
    name:"Abhinav Basa",
    username:"Abhi@42392",
    profile_pic:profile_pic,
    premium:true,
    background_image:account_background,
    joinDate:"September 2024"
}]

export const trends=[
    {hashtag:"Rishab Pant",postsCount:"9,463"},{hashtag:"Shreyas Iyer",postsCount:"9,533"},
    {hashtag:"Prabhas",postsCount:"25.5k"},{hashtag:"#TammanahBhatia",postsCount:"1883"},
    {hashtag:"#RanveerAllahbadia",postsCount:"1001"},
    {hashtag:"#RCBvsGT",postsCount:"2351"}
]

export const follow=[
    {name:"Mahendra Singh Dhoni",username:"@msdhoni",profile_pic:msdhonipp,premium:true},
    {name:"hardik pandya",username:"@hardikpandya7",profile_pic:hardikpp,premium:true},
    {name:"Virat Kohli",username:"@imVkohli",profile_pic:viratpp,premium:true},
    {name:"Scorpio",username:"@Scorpion_JSP",profile_pic:scorpiopp,premium:false},
    {name:"Shib",username:"@Shibtoken",profile_pic:shibpp,premium:false}
]

export const posts=[
    {
        id:"0",
        file:post1,
        title:"Finn Prabhas!!!",
        viewscount:"1k",
        likescount:"427",
        commentscount:"427",
        dateposted:"Dec 5 2024",
        repost:"",
        repostcount:"0",
        userId:"0",
        mediaType:"video"
    },
    {
        id:"1",
        file:post2,
        title:"white vibes",
        viewscount:"10k",
        likescount:"4.37k",
        commentscount:"427",
        dateposted:"Jan 22",
        repost:"",
        repostcount:"0",
        userId:"0",
        mediaType:"image"

    },
    {
        id:"2",
        file:post3,
        title:"Ringtone vibes",
        viewscount:"110k",
        commentscount:"427",
        likescount:"41.37k",
        dateposted:"Nov 22",
        repost:"",
        repostcount:"0",
        userId:"0",
        mediaType:"video"
    }
]

export const replies=[
    {
        id:"0",
        pid:"0",
        file:null,
        title:"Hail Prabhas",
        viewscount:"1k",
        likescount:"427",
        commentscount:"427",
        dateposted:"Dec 5 2024",
        repost:"",
        repostcount:"0",
        userId:"0",
        mediaType:"text"
    },
    {
        pid:"0",
        id:"1",
        file:post2,
        title:"white vibes",
        viewscount:"10k",
        likescount:"4.37k",
        commentscount:"427",
        dateposted:"Jan 22",
        repost:"",
        repostcount:"0",
        userId:"0",
        mediaType:"image"

    },
    {
        id:"2",
        pid:"0",
        file:post3,
        title:"Ringtone vibes",
        viewscount:"110k",
        commentscount:"427",
        likescount:"41.37k",
        dateposted:"Nov 22",
        repost:"",
        repostcount:"0",
        userId:"0",
        mediaType:"video"
    }
]

export const myLikes=[
    {id:"0",userId:"0",postId:"1"}
]



