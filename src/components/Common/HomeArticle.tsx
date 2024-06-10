'use client'
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TrendingArticlesSkeleton from "./TrendingArticlesSkeleton";
import {  useDispatch } from "react-redux";
import { getSliderArticles } from "../../actions/HomePage";


import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";



interface User {
  user: {
    userId: string;
  };
}


const HomeArticle = ({ article, isLoading, heading, subheading ,type}: any) => {
    const router = useRouter();

  const dispatch = useDispatch();
  const [active, setActive] = useState<any>("articles");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isVertical, setIsVertical] = useState(false);
  const [itemHeight, setItemHeight] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);


  const handleOpenArticle = (tagId: any) => {
    router.push(`/articles/${tagId}`);
  };

  const formatLikesCount = (count: any) => {
    if (count === 0 || count < 50) {
      return count.toString();
    } else if (count >= 1000) {
      const formattedCount = (count / 1000).toFixed(1);
      return `${formattedCount}K`;
    } else {
      return count;
    }
  };

  const truncateTitle = (title: any, maxLength: number) => {
    if (!title) return "";
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  const handleNextSlide = async () => {
    if (currentSlide + itemsPerPage < article.length - 1) {
    setCurrentSlide((prev) =>
      Math.min(prev + 1, article.length - itemsPerPage)
    );
  }
  else{
    await dispatch<any>(getSliderArticles({skipCount:article?.length,type:type,userId:user?.user?.userId}))
    setCurrentSlide((prev) =>
      Math.min(prev + 1, article.length - itemsPerPage)
    );
  }
  };

  

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setItemHeight(370);
        setItemsPerPage(4);
        setIsVertical(true);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2);
        setIsVertical(false);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
        setIsVertical(false);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(3);
        setIsVertical(false);
      } else {
        setItemsPerPage(4);
        setIsVertical(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center  sm:px-[3%] overflow-hidden mt-24 items-center ">
      <h2 className="text-[48px] font-semibold leading-[56px] text-center mb-10 font-petrona text-wrap">
        {heading}
      </h2>
      <p className="text-[20px] sm:text-[28px] font-normal text-center mb-8">
        {subheading}
      </p>
      <div className="flex gap-20 xs:gap-12 sm:gap-28 text-[20px] sm:text-[28px] font-normal mb-10">
        <a
          className={`cursor-pointer ${active === "videos" ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
          onClick={() => setActive("videos")}
        >
          Videos
        </a>
        <a
          className={`cursor-pointer ${active === "articles" ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
          onClick={() => setActive("articles")}
        >
          Articles
        </a>
        <a
          className={`cursor-pointer ${active === "news" ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
          onClick={() => setActive("news")}
        >
          News
        </a>
      </div>
      <div className="relative w-full overflow-hidden">
        <div
          className={`flex transition-transform   duration-500 ${isVertical ? "flex-col" : ""}`}
          style={{
            transform: isVertical
              ? `translateY(-${currentSlide * itemHeight}px)`
              : `translateX(-${currentSlide * (93 / itemsPerPage)}%)`,
            height: isVertical ? `${itemHeight * itemsPerPage}px` : "auto",
            width: "100vw",
          }}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`cursor-pointer flex-shrink-0 flex-grow sm:px-2 px-4 z-100`}
                  style={{ flex: `0 0 calc((100% - 7%) / ${itemsPerPage})` }}
                >
                  <TrendingArticlesSkeleton
                    itemsPerPage={itemsPerPage}
                    key={index}
                  />
                </div>
              ))
            : article?.map((data: any, index: number) => {
                const title = truncateTitle(data?.title, 40);
                return (
                  <div
                    key={index}
                    onClick={() => handleOpenArticle(data?.tagId)}
                    className={`cursor-pointer flex-shrink-0 flex-grow sm:px-2 px-4 py-6 ${window.innerWidth > 450 && window.innerWidth <= 640 ? "px-[16%] " : ""}`}
                    style={{ flex: `0 0 calc((100% - 7%) / ${itemsPerPage})` }}
                  >
                    <img
                      src={data?.imgUrl}
                      alt="img"
                      className="rounded-[20px] h-[232px] w-full "
                    />
                    <h3 className="text-[24px] font-semibold leading-[29px] text-wrap">
                      {data?.title ? title : <Skeleton />}
                    </h3>
                    <div className="flex gap-7 pt-2">
                      <div className="flex gap-1">
                        <ThumbUpOutlinedIcon />
                        <p className="text-[10px] font-medium pt-1">
                          Likes{" "}
                          {formatLikesCount(Math.floor(data?.likes?.low)) || <Skeleton />}
                        </p>
                      </div>
                      <div className="flex">
                        <FavoriteBorderOutlinedIcon />
                        <p className="text-[10px] font-medium pt-1">
                          Comments{" "}
                          {formatLikesCount(data?.comments?.low) || (
                            <Skeleton />
                          )}
                        </p>
                      </div>
                      <div className="flex">
                        <VisibilityOutlinedIcon />
                        <p className="text-[10px] font-medium pt-1">
                          Views{" "}
                          {formatLikesCount(data?.views?.low) || <Skeleton />}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="flex gap-10 pt-10">
        <button
          onClick={handlePrevSlide}
          className="w-[80px] h-[80px] bg-[#FAFAFA] rounded-full"
          disabled={currentSlide === 0}
        >
          <ArrowBackIosOutlinedIcon />
        </button>
        <button
          onClick={handleNextSlide}
          className="w-[80px] h-[80px] bg-[#FAFAFA] rounded-full"
          disabled={currentSlide === article.length - itemsPerPage}
        >
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default HomeArticle;
