'use client'
import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import HomeArticle from "./Common/HomeArticle";

const UserBasedRecommendation = () => {
  const heading = "Users Similar to you likes this";
  const subheading =
    "See personalised videos, articles and blogs in the world of tech";
  const { userBasedRecommendedArticles, isLoading } = useSelector(
    (state: any) => state?.recommendedArticles
  );

  return (
    <HomeArticle
      article={userBasedRecommendedArticles}
      heading={heading}
      subheading={subheading}
      isLoading={isLoading}
      type="userBasedArticles"
    />
  );
};

export default UserBasedRecommendation;
