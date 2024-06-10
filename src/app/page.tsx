// "use client";
// import AboutUs from "@/components/Home/AboutUs";
// import Discover from "@/components/Home/Discover";
// import HeroSection from "@/components/Home/HeroSection";
// import ToolsToExplores from "@/components/Home/ToolsToExplore";
// import WhyJoinUs from "@/components/Home/WhyJoinUs";
// import { NavbarComponent } from "@/components/Navbar";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getTrendingArticles, getForYouArticles } from "@/actions/HomePage";
// import Trending from "@/components/Trending";
// import Footer from "@/components/Footer";
// import ForYou from "@/components/ForYou";
// import UserBasedRecommendation from "@/components/UserBasedRecommendation";
// import NewsOfTheDay from "@/components/NewsOfTheDay";

// export default function Home() {
//   const dispatch = useDispatch();
//   const user = JSON.parse(localStorage.getItem("profile")!);

//   useEffect(() => {
//     dispatch<any>(getTrendingArticles({ skipCount: 0 }));
//     if (user?.user?.userId) {
//       dispatch<any>(
//         getForYouArticles({ userId: user?.user?.userId, skipCount: 0 })
//       );
//     }
//   }, [dispatch]);
//   return (
//     <>
//       <NavbarComponent />
//       <HeroSection />
//       <WhyJoinUs />
//       <Discover />
//       <Trending />
//       {user?.user?.userId && (
//         <>
//           <ForYou />
//           <UserBasedRecommendation />
//         </>
//       )}
//       <NewsOfTheDay />
//       <ToolsToExplores />
//       <AboutUs />
//       <Footer />
//     </>
//   );
// }


'use client'
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


interface User {
  user: {
    userId: string;
    // add other properties if needed
  };
}

const Home = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);

  useEffect(() => {
    dispatch<any>(getTrendingArticles({ skipCount: 0 }));
    if (user?.user?.userId) {
      dispatch<any>(
        getForYouArticles({ userId: user?.user?.userId, skipCount: 0 })
      );
    }
  }, [dispatch, user]);

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to our homepage" />
      </Head>
      <NavbarComponent />
      <HeroSection />
      <WhyJoinUs />
      <Discover />
      <Trending />
      {user?.user?.userId && (
        <>
          <ForYou />
          <UserBasedRecommendation />
        </>
      )}
      <NewsOfTheDay />
      <ToolsToExplores />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;
