'use client'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import HomeArticle from "./Common/HomeArticle";

const UserBasedRecommendation = () => {
  const heading = "Users Similar to you likes this";
  const subheading =
    "See personalised videos, articles and blogs in the world of tech";
  const { userBasedRecommendedArticles, isLoading,userBasedSecondQuerySkipCount } = useSelector(
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
      article={userBasedRecommendedArticles}
      heading={heading}
      subheading={subheading}
      isLoading={isLoading}
      type="userBasedArticles"
      userBasedSecondQuerySkipCount={userBasedSecondQuerySkipCount}
      />
      )}
    </>
  );
};

export default UserBasedRecommendation;
