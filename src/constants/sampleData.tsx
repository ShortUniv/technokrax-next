'use client'
import ContentCardImg from "../assets/ContentCardImg.jpeg";
import NewsImg from "../assets/NewsImg.jpeg";
import ChatgptImg from "../assets/ChatgptImg.png";
import FigmaImg from "../assets/FigmaImg.png";
import FirefoxImg from "../assets/FirefoxImg.png";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import ImageIcon from "@mui/icons-material/Image";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BuildIcon from "@mui/icons-material/Build";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";



export const ContentCardData = [
    {
        id:1,
        img: ContentCardImg,
        title: "The Data Science Course Complete Data Science...",
        likes: "1.2K",
        appreciate: "2K",
        views: "1.2K",
    },
    {
        id:2,
        img: ContentCardImg,
        title: "The Data Science Course Complete Data Science...",
        likes: "1.2K",
        appreciate: "2K",
        views: "1.2K",
    },
    {
        id:3,
        img: ContentCardImg,
        title: "The Data Science Course Complete Data Science...",
        likes: "1.2K",
        appreciate: "2K",
        views: "1.2K",
    },
    {
        id:4,
        img: ContentCardImg,
        title: "The Data Science Course Complete Data Science...",
        likes: "1.2K",
        appreciate: "2K",
        views: "1.2K",
    },
]

export const NewsOfTheDayCardData = [
    {
        id:1,
        img:NewsImg,
        title: "ChatGPT is winning the future - but what future is that?",
        previewText: "Chatgpt is gonna win win, i can bet it with you, its the future. Chatgpt, the new Ai tool is taking over gradually. The Ai of the future",
        name: "DAVID ANDERSON",
        publishedTime: "12 MINUTES AGO",
    },
    {
        id:2,
        img:NewsImg,
        title: "ChatGPT is winning the future - but what future is that?",
        previewText: "Chatgpt is gonna win win, i can bet it with you, its the future. Chatgpt, the new Ai tool is taking over gradually. The Ai of the future",
        name: "DAVID ANDERSON",
        publishedTime: "12 MINUTES AGO",
    },
    {
        id:3,
        img:NewsImg,
        title: "ChatGPT is winning the future - but what future is that?",
        previewText: "Chatgpt is gonna win win, i can bet it with you, its the future. Chatgpt, the new Ai tool is taking over gradually. The Ai of the future",
        name: "DAVID ANDERSON",
        publishedTime: "12 MINUTES AGO",
    },
    {
        id:4,
        img:NewsImg,
        title: "ChatGPT is winning the future - but what future is that?",
        previewText: "Chatgpt is gonna win win, i can bet it with you, its the future. Chatgpt, the new Ai tool is taking over gradually. The Ai of the future",
        name: "DAVID ANDERSON",
        publishedTime: "12 MINUTES AGO",
    },
]

 export const ToolsToExplore = [
    {
        id:1,
        toolImg: FigmaImg,
        name: "Figma",
    },
    {
        id:2,
        toolImg: ChatgptImg,
        name: "Chatgpt",
    },
    {
        id:3,
        toolImg: FirefoxImg,
        name: "Firefox",
    },
    {
        id:4,
        toolImg: FigmaImg,
        name: "Figma",
    },
    
]

export const navLinks = [
    {
       id: "home",
       title: "Home",
    },
    {
       id: "learn",
       title: "Learn",
    },
    {
       id: "news",
       title: "News",
    },
    {
       id: "tools",
       title: "Tools",
    },
    {
       id: "community",
       title: "Community",
    },
    {
       id: "about-us",
       title: "About Us",
    },
    
]

export const UserProfileOptions = [
    {
        id: "write",
        title: "Write Article",
    },
    {
        id: "notifications",
        title: "Notifications",
    },
    {
        id: "profile",
        title: "My Profile",
    },
  
]

export const PreferencesData = [ 

    {
        id:1,
        topic:"Programming",
    },
    {
        id:2,
        topic:"Data Science",
    },
    {
        id:3,
        topic:"Artificil Intelligence",
    },
    {
        id:4,
        topic:"Python",
    },
    {
        id:5,
        topic:"Machine Learning",
    },
    {
        id:6,
        topic:"React",
    },
    {
        id:7,
        topic:"Software Development",
    },
    {
        id:8,
        topic:"API",
    },
    {
        id:9,
        topic:"Database",
    },
    {
        id:10,
        topic:"NLPs",
    },
    {
        id:11,
        topic:"Deep Learning",
    },
    {
        id:12,
        topic:"Web Development",
    },
    {
        id:13,
        topic:"React Native",
    },
    {
        id:14,
        topic:"AI/ML",
    },
    {
        id:15,
        topic:"Design",
    },
    {
        id:16,
        topic:"Javascript",
    },
    {
        id:17,
        topic:"Coding",
    },
    {
        id:18,
        topic:"Blockchain",
    },
    {
        id:19,
        topic:"Etherium",
    },
    {
        id:20,
        topic:"Solana",
    },
    {
        id:21,
        topic:"Bitcoin",
    },
    {
        id:22,
        topic:"Smart Contracts",
    },
]

export const AdminSidePanelData = [
    {
        img: <DashboardIcon />,
        title: "Dashboard"

    },
   { 
    img: <ArticleIcon />,
    title: "Articles"
 },
   { 
    img: <VideoCameraFrontIcon />,
    title: "Videos"
 },
   { 
    img: <ImageIcon />,
    title: "Images"
 },
   { 
    img: <NewspaperIcon />,
    title: "News"
 },
   { 
    img: <BuildIcon />,
    title: "Tools"
 },
   { 
    img: <SettingsIcon />,
    title: "Settings"
 },
   { 
    img: <LogoutIcon />,
    title: "Logout"
 },
]