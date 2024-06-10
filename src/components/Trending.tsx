'use client'
import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";

import HomeArticle from "./Common/HomeArticle";

interface RootState {
  trendingArticles: {
    trendingArticles: Record<string, TrendingArticlesState>;
    isLoading: boolean;
  };
}

interface TrendingArticlesState {
  isLoading: boolean;

  title: string;
  imgUrl: string;
  likes: {
    high: string;
    low: string;
  };
  views: {
    high: string;
    low: string;
  };
  appreciate: {
    high: string;
    low: string;
  };
  trendinessScore: string;
  tagId: string;
}



const Trending = () => {
  const heading = "What’s Trending";
  const subheading =
    "See trending videos, articles and blogs in the world of tech";
  const { trendingArticles, isLoading } = useSelector(
    (state: RootState) => state.trendingArticles
  );
  let articlesArray = Object.values(trendingArticles);

 

  return (
    <HomeArticle
      article={articlesArray}
      heading={heading}
      subheading={subheading}
      isLoading={isLoading}
      type="trendingArticles"
    />
  
  );
};

export default Trending;
