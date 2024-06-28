'use client'
import { useState, useEffect } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import ProfileEditCard from "./ProfileEditCard";
import { useSelector, useDispatch } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileImageEditor from "./ProfileImageEditor";
import Image from "next/image";
import { getProfile, followUser,unfollowUser } from "@/actions/Profile";
import FollowerFollowingModal from "./FollowerFollowingCard";

interface User {
  user: {
    userId: string;
  };
}

const UserDetails = ({ userId }: any) => {
  const [editCard, setEditCard] = useState<any>(false);
  const [imgCard, setImgCard] = useState<any>(false);
  const { profile } = useSelector((state: any) => state.profile);
  const [loading, setLoading] = useState<any>(false);
  const [followed, setFollowed] = useState<any>(false);
  const [user, setUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const userStoredProfile = localStorage.getItem("profile");
    if (userStoredProfile) {
      const parsedUser = JSON.parse(userStoredProfile);
      setUser(parsedUser);

      if (userId) {
        dispatch<any>(getProfile(userId));
      }
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (profile && user) {
      const isUserFollowing = profile?.relation?.followers?.some(
        (follower: any) => follower.userId === user.user.userId
      );
      setFollowed(isUserFollowing);
    }
  }, [profile, user]);

   const handleFollow = () => {
    if(userId && user?.user?.userId){
     dispatch<any>(followUser({userIdToFollow:userId, userId:user?.user?.userId},setLoading,setFollowed));
     
    }
  }

  const handleUnfollow = () => {
    if (userId && user?.user?.userId) {
      dispatch<any>(unfollowUser({ userIdToUnfollow: userId, userId: user?.user?.userId }, setFollowed));
    }
  };


  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <>
      {editCard && (
        <ProfileEditCard setEditCard={setEditCard} editCard={editCard} profile={profile} />
      )}
      {(imgCard && userId === user?.user?.userId) && (
        <ProfileImageEditor setImgCard={setImgCard} imgCard={imgCard} />
      )}
      <FollowerFollowingModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        followers={profile?.relation?.followers || []}
        following={profile?.relation?.following || []}
      />
      <div className="flex flex-col mt-8">
        <h1 className="font-alegreya text-5xl font-medium mb-4 text-gray-900">
          {user?.user?.userId === userId ? "My Profile" : ""}
        </h1>
        <div className="flex flex-col lg:flex-row bg-gray-100 px-6 md:px-10 py-4 lg:py-20 gap-6 items-center rounded-xl">
          <div className="flex flex-col items-center">
            <div
              className="w-40 h-40 bg-gray-300 rounded-full cursor-pointer overflow-hidden"
              onClick={() => setImgCard(!imgCard)}
            >
              <Image
                src={profile?.userInfo?.photo || "https://i.ibb.co/3m3Lx5B/dummy-avatar.jpg"}
                className="w-full h-full object-cover"
                alt="Profile Photo"
                width='160'
                height='160'
              />
            </div>
            <div
              className="mt-2 font-medium hover:text-blue-800 hover:underline cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <p>
                {formatNumber(profile?.relation?.followers?.length || 0)}{" "}
                {profile?.relation?.followers?.length === 1 ? "Follower" : "Followers"}
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <a
                href={`https://www.instagram.com/${profile?.userInfo?.socials?.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="text-gray-600" />
              </a>
              <a
                href={`https://github.com/${profile?.userInfo?.socials?.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="text-gray-600" />
              </a>
              <a
                href={`https://www.linkedin.com/in/${profile?.userInfo?.socials?.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="text-gray-600" />
              </a>
              <a
                href={`https://twitter.com/${profile?.userInfo?.socials?.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon className="text-gray-600" />
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold mt-10 text-gray-800">
              {profile?.userInfo?.name || "Your Name"}
            </h2>
            <h3 className="text-2xl font-light mt-2 text-gray-600">
              {profile?.userInfo?.email || "Your email"}
            </h3>
            <p className="text-lg text-gray-700 mt-4">
              {profile?.userInfo?.bio ||
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
            </p>
            <button 
              onClick={followed ? handleUnfollow : handleFollow}
              disabled={loading}
              className="w-32 h-12 rounded-md bg-gradient-to-r from-gray-800 to-gray-700 text-white mt-6 hover:from-gray-700 hover:to-gray-600 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span className="ml-2">Following...</span>
                </>
              ) : followed ? (
                <>
                  <CheckCircleIcon />
                  <span className="ml-2">Following</span>
                </>
              ) : (
                "Follow"
              )}
            </button>
          </div>
          <button
            onClick={() => setEditCard(!editCard)}
            className="text-gray-600"
          >
            {userId === user?.user.userId && <EditIcon />}
          </button>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
