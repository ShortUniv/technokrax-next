import React, { useState } from "react";
import Image from "next/image";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { followUser } from "@/actions/Profile";
import Link from "next/link";

const truncateBio = (bio: any, length = 60) => {
  if (bio?.length <= length) return bio;
  return bio?.substring(0, length) + "...";
};

const formatDate = (isoString: any) => {
  const date = new Date(isoString);
  return date.toLocaleDateString(); // Adjust date format as needed
};

const FollowerFollowingModal = ({
  open,
  handleClose,
  followers,
  following,
  currentUserId,
}: any) => {
  const [activeTab, setActiveTab] = useState("followers");
  const dispatch = useDispatch();

  if (!open) return null;

  const renderList = (list: any, isFollowingList = false) => {
    if (list.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          {isFollowingList
            ? "You are not following anyone yet."
            : "You have no followers yet."}
        </div>
      );
    }

    return list.map((user: any, index: any) => (
      <div
        key={index}
        className="flex items-center p-4 border-b border-gray-200"
      >
        <Link href={`/profile/${user?.userId}`}>
          <Image
            src={user.profileImage}
            alt={user.name}
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
        </Link>
        <div className="ml-4 flex-grow">
          <Link href={`/profile/${user?.userId}`}>
            <h4 className="font-semibold hover:text-blue-500 hover:underline">
              {user.name}
            </h4>
          </Link>
          <p className="text-sm text-gray-600">{truncateBio(user.bio)}</p>
          {!isFollowingList && (
            <p className="text-xs text-gray-500">
              Followed since {formatDate(user.followedAt)}
            </p>
          )}
          {isFollowingList && (
            <p className="text-xs text-gray-500">
              Started Following {formatDate(user.startedFollowingAt)}
            </p>
          )}
        </div>
        {isFollowingList && (
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Following
          </button>
        )}
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden w-96 max-w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-700"
          onClick={handleClose}
        >
          <Close />
        </button>
        <div className="flex justify-around border-b border-gray-200">
          <button
            className={`p-4 font-medium ${
              activeTab === "followers" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("followers")}
          >
            Followers
          </button>
          <button
            className={`p-4 font-medium ${
              activeTab === "following" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
        </div>
        <div className="p-4 max-h-80 overflow-y-auto">
          {activeTab === "followers"
            ? renderList(followers)
            : renderList(following, true)}
        </div>
      </div>
    </div>
  );
};

export default FollowerFollowingModal;



