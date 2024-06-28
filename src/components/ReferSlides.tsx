'use client'


import React, { useEffect, useState } from "react";
import alterimg from "../assets/AlterImg.svg";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
import { saveHighlights, likeArticle } from "../actions/Article";
import CommentIcon from "@mui/icons-material/Comment";
import toast from "react-hot-toast";
import ShareIcon from "@mui/icons-material/Share";
import { FaCommentAlt } from "react-icons/fa";
import ArticleComments from "./ArticleComments";
import { useRouter } from "next/navigation";
const ReferSlides = ({
  chunk,
  handlepopup,
  content,
  setContent,
  selectedOption,
}: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  //For likes

  useEffect(() => {
    if (chunk?.content) {
      setLikes(chunk?.likes);
      setCommentsState(chunk?.comments);
    }
    window.scrollTo(0, 0);
  }, [dispatch]);
  const [commentsState, setCommentsState] = useState([]);
  const [likes, setLikes] = useState<any>([]);
  const user = JSON.parse(localStorage.getItem("profile")!);
  const userId = user?.result?.googleId || user?.user?.userId;
  const hasLikedPost = likes?.find((like: any) => like === userId);
  // console.log(likes);
  // console.log(user);
  const formatLikesCount = (count: any) => {
    if (count >= 50) {
      const formattedCount = (count / 1000).toFixed(1); // Convert to K format with one decimal place
      return `${formattedCount}K`;
    }
    return count; // Return the original count if it's less than 1000
  };
  const Likes = () => {
    const formattedLikes = formatLikesCount(likes?.length);

    if (likes?.length > 0 && chunk?.likes) {
      return likes.includes(user?.user?.userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {formattedLikes}
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
        })
      );
      if (hasLikedPost) {
        setLikes(likes.filter((id: any) => id !== userId));
      } else {
        setLikes([...likes, userId]);
      }
    }
  };

  //

  // for comments

  const [commentsActive, setCommentsActive] = useState(false);

  const concatenateTitles = (title1: string, limit: number) => {
    if (title1?.length > limit) return title1.slice(0, limit) + "...";
    return title1;
  };
  const handleclick = (tagId: any, con: any) => {
    if (con) {
      setContent(con);
      handlepopup();
    } else {
      router.push(`/articles/${tagId}`);
      console.log("error");
    }
  };
  //
  const handleShare = async () => {
    try {
      {
        selectedOption == "article"
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
  console.log(selectedOption);
  return (
    <>
      <ArticleComments
        commentsActive={commentsActive}
        setCommentsActive={setCommentsActive}
        tagId={chunk?.tagId}
        commentsState={commentsState}
        setCommentsState={setCommentsState}
      />
      <div className="flex gap-12 flex-wrap p-5 ">
        {chunk && (
          <div className="flex flex-col relative  sm:w-[305px] w-full pb-8  sm:h-[480px] 0 shadow-lg hover:shadow-2xl hover:shadow-[#96a0f3c9] transition-shadow rounded-lg">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleclick(chunk.tagId, chunk?.link);
              }}
              className="object-cover max-w-full sm:max-h-[230px] sm:h-[170px] bg-black shadow-lg  rounded-t-md  "
              src={chunk.selectedFile ? chunk?.selectedFile : alterimg}
              alt="imghere"
            />

            <div
              style={{ cursor: "pointer" }}
              className="pt-7 pl-4 font-bold text-xl p-2"
              onClick={() => {
                handleclick(chunk.tagId, chunk?.link);
              }}
            >
              {concatenateTitles(chunk?.title, 90)}
              <div className="text-gray-600 font-medium text-sm ">
                {selectedOption == "article" ? "By" : "Referred By"}{" "}
                {chunk?.name}
              </div>
            </div>
            <div className="p-2 pl-4 ">
              {concatenateTitles(chunk?.description, 120)}
            </div>
            <div className="absolute left-4 bottom-2 flex gap-5 ">
              <div
                style={{ cursor: "pointer" }}
                className="pb-2"
                onClick={handleLike}
              >
                <Likes />
              </div>
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
                className="flex gap-1  items-center"
              >
                <CommentIcon />
                <p>{commentsState?.length} </p>
                <p className="hidden sm:block">
                  {commentsState?.length > 1 ? "Comments" : "Comment"}
                </p>
              </button>
              <button
                onClick={handleShare}
                className="flex gap-1  items-center"
              >
                <ShareIcon />
              </button>
            </div>
            {/* <CommentIcon /> */}
            {/* <ThumbUpOutlined /> */}
          </div>
        )}

        {/* {chunk[2] && (
        <div
        onClick={() => {
          handleclick(chunk[2].tagId, chunk[2]?.link);
          }}
          className=" flex flex-col sm:w-[305px]   w-full sm:h-[360px] 0 shadow-lg hover:shadow-2xl hover:shadow-[#96a0f3c9] transition-shadow rounded-lg"
          >
          <img
          className="object-contain max-w-full sm:max-h-[230px] bg-black  rounded-t-md  "
          src={chunk[2].selectedFile ? chunk[2]?.selectedFile : alterimg}
          alt="imghere"
          />
          <div className="pt-7 pl-4 p-2">
          {concatenateTitles(chunk[2]?.title, 90)}
          </div>
          </div>
          )} */}
      </div>
    </>
  );
};

export default ReferSlides;
