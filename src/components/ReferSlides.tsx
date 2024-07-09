"use client";

import React, { useEffect, useState } from "react";
import alterimg from "../assets/AlterImg.svg";
import { useDispatch } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
import { saveHighlights, likeArticle } from "../actions/Article";
import CommentIcon from "@mui/icons-material/Comment";
import toast from "react-hot-toast";
import ShareIcon from "@mui/icons-material/Share";
import ArticleComments from "./ArticleComments";
import { useRouter } from "next/navigation";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { addViewToArticle } from "../actions/Article";

const ReferSlides = ({
  chunk,
  handlepopup,
  content,
  setContent,
  selectedOption,
}: any) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (chunk) {
      setLikes(chunk?.likes);
      setCommentsState(chunk?.comments);
    }
    window.scrollTo(0, 0);
  }, [chunk]);

  const [commentsState, setCommentsState] = useState([]);
  const [likes, setLikes] = useState<any>([]);
  const user = JSON.parse(localStorage.getItem("profile")!);
  const userId = user?.result?.googleId || user?.user?.userId;
  const hasLikedPost = likes?.find((like: any) => like === userId);

  const formatLikesCount = (count: any) => {
    if (count >= 50) {
      const formattedCount = (count / 1000).toFixed(1);
      return `${formattedCount}K`;
    }
    return count;
  };

  const Likes = () => {
    const formattedLikes = formatLikesCount(likes?.length);

    if (likes?.length > 0 && chunk?.likes) {
      return likes.includes(user?.user?.userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{formattedLikes}
        </>
      ) : (
        <>
          <ThumbUpOutlined fontSize="small" />
          &nbsp;{formattedLikes}
        </>
      );
    } else {
      return (
        <>
          <ThumbUpOutlined fontSize="small" />
          &nbsp;{formattedLikes}
        </>
      );
    }
  };

  const handleLike = async () => {
    if (!user?.user?.userId) {
      toast("Please sign in to like the post", {
        icon: "🔒",
      });
    } else {
      dispatch<any>(
        likeArticle({
          tagId: chunk?.tagId,
          userId: user?.user?.userId,
          type:"referArticle"
        })
      );
      if (hasLikedPost) {
        setLikes(likes.filter((id: any) => id !== userId));
      } else {
        setLikes([...likes, userId]);
      }
    }
  };

  const [commentsActive, setCommentsActive] = useState(false);

  const truncateText = (text: string, limit: number) => {
    if (text?.length > limit) return text.slice(0, limit) + "...";
    return text;
  };

  const handleclick = (tagId: any, con: any) => {
    if (con) {
      setContent(con);
      dispatch<any>(
        addViewToArticle({ tagId:tagId, userId: user?.user?.userId,type:"referArticle" })
      );
      handlepopup();
    } else {
      dispatch<any>(
        addViewToArticle({ tagId:tagId, userId: user?.user?.userId,type:"article" })
      );

      router.push(`/articles/${tagId}`);
    }
  };

  const handleShare = async () => {
    try {
      {
        selectedOption === "article"
          ? await navigator.clipboard.writeText(
              `https://technokrax.com/articles/${chunk?.tagId}`
            )
          : await navigator.clipboard.writeText(chunk?.link);
      }
      toast("Link copied to clipboard!", {
        icon: "🔗",
      });
    } catch (err) {
      toast.error("Failed to copy link. Please try again.");
    }
  };

  const getInitials = (name: any) => {
    if (!name) return "";

    const names = name.split(" ");
    return names
      .map((name: any) => name.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <ArticleComments
        commentsActive={commentsActive}
        setCommentsActive={setCommentsActive}
        tagId={chunk?.tagId}
        commentsState={commentsState}
        setCommentsState={setCommentsState}
        type="referArticle"
      />
      <div className="flex flex-wrap gap-8 p-5">
        {chunk && (
          <div className="relative flex flex-col w-full pb-8 transition-shadow shadow-lg sm:w-[305px] sm:h-[480px] hover:shadow-2xl hover:shadow-[#96a0f3c9] rounded-lg bg-white">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleclick(chunk.tagId, chunk?.link);
              }}
              className="object-cover w-full h-[230px] bg-black shadow-lg rounded-t-md sm:h-[170px]"
              src={chunk.selectedFile ? chunk?.selectedFile : alterimg}
              alt="imghere"
            />
            <div
              style={{ cursor: "pointer" }}
              className="flex flex-col p-4"
              onClick={() => {
                handleclick(chunk.tagId, chunk?.link);
              }}
            >
              <h2
                className={`font-bold text-xl leading-tight ${
                  chunk.title.length > 30 ? "mt-1" : "mt-7"
                }`}
              >
                {truncateText(chunk?.title, 45)}
              </h2>
              <div className="flex items-center mt-1 text-sm font-medium text-gray-600">
                <div className="relative">
                  {chunk?.createdBy?.photo ? (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={chunk?.createdBy?.photo}
                      alt={
                        chunk?.createdBy?.name
                          ? chunk?.createdBy?.name
                          : "User Photo"
                      }
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white text-sm font-bold">
                      {chunk?.createdBy?.name
                        ? getInitials(chunk?.createdBy?.name)
                        : ""}
                    </div>
                  )}
                  {/* {chunk?.createdBy?.name && (
      <div className="absolute inset-0 bg-gray-200 rounded-full opacity-50"></div>
    )} */}
                </div>
                <span className="ml-2">
                  {selectedOption === "article" ? "By" : "Referred By"}{" "}
                  {chunk?.createdBy?.name}
                </span>
              </div>
              <p className="mt-2 text-gray-700 ">
                {truncateText(chunk?.description, 200)}
              </p>
            </div>
            <div className="absolute flex gap-5 left-4 bottom-4">
              <button
                style={{ cursor: "pointer" }}
                onClick={handleLike}
                className="flex items-center gap-1"
              >
                <Likes />
              </button>
              <button
                onClick={() => {
                  if (!user?.user?.userId) {
                    toast("Please sign in to comment on the post", {
                      icon: "🔒",
                    });
                  } else {
                    setCommentsActive(!commentsActive);
                  }
                }}
                className="flex items-center gap-1"
              >
                <CommentIcon fontSize="small" />
                <p>{commentsState?.length}</p>
              </button>
              <button className="flex items-center gap-1">
                <VisibilityOutlinedIcon fontSize="small" />
                <p>{chunk?.views?.length}</p>
              </button>
              <button onClick={handleShare} className="flex items-center gap-1">
                <ShareIcon fontSize="small" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReferSlides;
