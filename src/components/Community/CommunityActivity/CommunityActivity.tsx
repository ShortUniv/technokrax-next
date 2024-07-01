



"use client";
import React, { useState, useEffect } from "react";
import TiptapEditor from "./TiptapEditor";
import { MuiChipsInput } from "mui-chips-input";
import { useDispatch } from "react-redux";
import { createCommunityDiscussion } from "@/actions/CommunityDiscussion";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FaCalendarAlt } from "react-icons/fa";
import { BiUpvote, BiDownvote, BiCommentDetail } from "react-icons/bi";
import { CircularProgress } from "@mui/material";

const CommunityActivity = ({ community, loading }: any) => {
  const dispatch = useDispatch();
  const [isCreated, setIsCreated] = useState<any>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);

  useEffect(() => {
    if (isCreated) {
      setNewDiscussion({ title: "", content: "" });
      setTags([]);
    }
  }, [isCreated]);

  const [active, setActive] = useState<any>("discussions");
  const [tags, setTags] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
  });

  const handleAdd = (tag: any) => {
    setTags(tag);
  };

  const handleNewDiscussionChange = (field: string, value: string) => {
    setNewDiscussion((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleStartDiscussion = () => {
    dispatch<any>(
      createCommunityDiscussion(
        {
          title: newDiscussion.title,
          content: newDiscussion.content,
          createdBy: user?.user?.userId,
          communityId: community?.community?.communityId,
          tags: tags,
        },
        setIsCreated
      )
    );
    console.log(community?.communityId);
  };

  const truncateText = (text: any, charLimit: any) => {
    if (text?.length <= charLimit) return text;
    return text?.slice(0, charLimit) + "...";
  };

  return (
    <div className="flex flex-col relative mb-32 w-full max-w-[1000px]">
      <div className="flex gap-4 sm:gap-8 text-lg sm:text-xl md:text-2xl font-normal">
        <a
          className={`cursor-pointer ${
            active === "discussions"
              ? "text-blue-500 border-b-2 border-blue-500 z-10"
              : ""
          }`}
          onClick={() => setActive("discussions")}
        >
          Discussions
        </a>
        <a
          className={`cursor-pointer ${
            active === "learn"
              ? "text-blue-500 border-b-2 border-blue-500 z-10"
              : ""
          }`}
          onClick={() => setActive("learn")}
        >
          Learn
        </a>
        <a
          className={`cursor-pointer ${
            active === "events"
              ? "text-blue-500 border-b-2 border-blue-500 z-10"
              : ""
          }`}
          onClick={() => setActive("events")}
        >
          Events
        </a>
      </div>
      <div className="absolute top-[42px] w-full h-[2px] bg-gray-300"></div>
      {active === "discussions" && (
        <div className="mt-8">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Start a New Discussion</h3>
            <input
              type="text"
              placeholder="Title"
              value={newDiscussion.title}
              onChange={(e) => handleNewDiscussionChange("title", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <TiptapEditor
              content={newDiscussion.content}
              setContent={(value) => handleNewDiscussionChange("content", value)}
            />
            <div className="">
              <MuiChipsInput
                style={{ width: "100%", margin: "10px 0" }}
                value={tags}
                onChange={handleAdd}
                size="small"
                placeholder="Add tags...(Optional)"
              />
            </div>
            <button
              onClick={handleStartDiscussion}
              className="px-4 py-2 flex justify-center items-center bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 mt-4"
            >
              {loading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span className="ml-2">Creating Discussion</span>
                </>
              ) : isCreated ? (
                <>
                  <CheckCircleIcon />
                  <span> Discussion Created</span>
                </>
              ) : (
                <span>Start Discussion</span>
              )}
            </button>
          </div>
          {community?.discussions.map((discussion: any) => (
            <Link
              href={`/community/${discussion?.communitySlug}/discussions/${discussion?.slug}`}
              key={discussion?.id}
            >
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 transition-transform transform hover:scale-105">
                <div className="flex items-center mb-2">
                  <img
                    src={discussion?.createdBy?.photo}
                    alt={discussion?.createdBy?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-2">
                    <div className="font-semibold">{discussion?.createdBy?.name}</div>
                    <div className="text-gray-500 text-sm">
                      {truncateText(discussion?.createdBy?.bio, 60)}
                    </div>
                  </div>
                </div>
                <div className="text-lg sm:text-xl font-medium mb-2">
                  {discussion?.title}
                </div>
                <div
                  className="prose mb-4"
                  dangerouslySetInnerHTML={{ __html: discussion?.content }}
                />
                <div className="flex justify-between items-center text-gray-600">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    {new Date(discussion?.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <BiUpvote className="mr-1 text-green-500 font-sans" size={25} />
                      {discussion?.upvotes?.length}
                    </div>
                    <div className="flex items-center">
                      <BiDownvote className="mr-1 text-red-500" size={25} />
                      {discussion?.downvotes?.length}
                    </div>
                    <div className="flex items-center">
                      <BiCommentDetail className="mr-1" size={25} />
                      {discussion?.comments?.length}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default CommunityActivity;

