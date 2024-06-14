'use client'

import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";

import HomeArticle from "./Common/HomeArticle";
import { useEffect, useState } from "react";

const ForYou = () => {
  const heading = "For You";
  const subheading =
    "See personalised videos, articles and blogs in the world of tech";
  const { forYouRecommendedArticles, isLoading } = useSelector(
    (state: any) => state?.recommendedArticles
  );


  const [user,setUser] = useState<any>(null) 


  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);

  return (

    <>
    {user?.user?.userId && (
    <HomeArticle
      article={forYouRecommendedArticles}
      heading={heading}
      subheading={subheading}
      isLoading={isLoading}
      type="forYouArticles"
    />
    )}
    </>
  );
};

export default ForYou;
