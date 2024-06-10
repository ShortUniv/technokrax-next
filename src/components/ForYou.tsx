'use client'
import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";

import HomeArticle from "./Common/HomeArticle";

const ForYou = () => {
  const heading = "For You";
  const subheading =
    "See personalised videos, articles and blogs in the world of tech";
  const { forYouRecommendedArticles, isLoading } = useSelector(
    (state: any) => state?.recommendedArticles
  );

  return (
    <HomeArticle
      article={forYouRecommendedArticles}
      heading={heading}
      subheading={subheading}
      isLoading={isLoading}
      type="forYouArticles"
    />
  );
};

export default ForYou;
