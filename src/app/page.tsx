
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTrendingArticles, getForYouArticles } from "@/actions/HomePage";
import AboutUs from "@/components/Home/AboutUs";
import Discover from "@/components/Home/Discover";
import HeroSection from "@/components/Home/HeroSection";
import ToolsToExplores from "@/components/Home/ToolsToExplore";
import WhyJoinUs from "@/components/Home/WhyJoinUs";
import { NavbarComponent } from "@/components/Navbar";
import Trending from "@/components/Trending";
import Footer from "@/components/Footer";
import ForYou from "@/components/ForYou";
import UserBasedRecommendation from "@/components/UserBasedRecommendation";
import NewsOfTheDay from "@/components/NewsOfTheDay";
import Head from "next/head";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Technokrax',
  description:"Learning is fun when you learn the right way. Our platform combines AI-driven personalization to ensure that every learning journey is both fun and uniquely tailored to meet individual needs and preferences. So join us in revolutionizing the way we learn.",
  openGraph: {
    title: 'Technokrax',
    description: "Learning is fun when you learn the right way. Our platform combines AI-driven personalization to ensure that every learning journey is both fun and uniquely tailored to meet individual needs and preferences. So join us in revolutionizing the way we learn.",
    images: [
      {
        url: "https://i.ibb.co/Pmm6Mkx/Header-Logo.png",
        width: 800,
        height: 600,
        alt: 'Technokrax.img',
      },
    ],
    type: 'website',
    url: 'https://technokrax.com',
    siteName: 'Technokrax',  
  },
};

const Home = () => {
  return (
    <>
      <Head>
        // <title>Home Page</title>
        // <meta name="description" content="Welcome to our homepage" />
        //{" "}
      </Head>
      <NavbarComponent />
      <HeroSection />
      <WhyJoinUs />
      <Discover />
      <Trending />
      <ForYou />
      <UserBasedRecommendation />
      <NewsOfTheDay />
      <ToolsToExplores />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;
