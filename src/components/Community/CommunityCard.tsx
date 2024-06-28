import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { joinCommunity } from "@/actions/Community";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { getCommunity } from "@/actions/Community";

const truncateDescription = (text: any, charLimit: any) => {

  if (text?.length <= charLimit) return text;
  return text?.slice(0, charLimit) + "...";
};

const CommunityCard = ({ communities, itemsPerPage }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<{
    [key: string]: boolean;
  }>({});
  const [loadingCommunities, setLoadingCommunities] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);

  useEffect(() => {
    if (user && communities) {
      setJoinedCommunities({
        [communities.communityId]: communities?.members?.some(
          (member: any) => member.userId === user.user.userId
        ),
      });
    }
  }, [user, communities]);

  const dispatch = useDispatch();

  const handleJoinCommunity = async (communityId: string) => {
    dispatch<any>(
      joinCommunity(
        { userId: user?.user?.userId, communityId },
        setJoinedCommunities,
        communityId,
        setLoadingCommunities
      )
    );
  };
  // console.log(joinedCommunities)


  const handleCommunityClick = (slug:any,communityId:any) => {
    // dispatch<any>(getCommunity({communityId:communityId}))
    router.push(`/community/${slug}`)

  }

  return (
    <div
      key={communities?.id}
      className="px-6 mb-4 "
      style={{ flex: `0 0 calc((91.4%) / ${itemsPerPage})` }}
    >
      <div className="relative  w-full  h-[232px] cursor-pointer"
      onClick={() => handleCommunityClick(communities?.slug, communities?.communityId)}
      
      >
        <Image
          src={communities?.communityImage}
          alt="image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h2 className="mt-2 text-xl font-semibold cursor-pointer"
      onClick={() => handleCommunityClick(communities?.slug, communities?.communityId)}
      
      >
        {truncateDescription(communities?.name, 25)}
      </h2>
      <p className="text-gray-700 h-[48px] cursor-pointer"
      onClick={() => handleCommunityClick(communities?.slug, communities?.communityId)}
      
      >
        {truncateDescription(communities?.description, 100)}
      </p>

      <div className="flex justify-between items-center mt-6 xs:mt-12">
        <div className="flex -space-x-2">
          {communities?.members?.slice(0, 3).map((member: any, index: any) => (
            <img
              key={index}
              src={member?.avatar}
              alt={`${member?.username} avatar`}
              title={member?.username}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
          {communities?.members?.length > 3 && (
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-700 border-2 border-white">
              +{communities?.members?.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p>
          <strong>{communities?.members?.length}</strong> Members
        </p>
        <button
          onClick={() => handleJoinCommunity(communities?.communityId)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg flex justify-center items-center hover:bg-blue-600 transition-colors duration-300"
>
          {joinedCommunities[communities?.communityId] ? (
            <span>Joined</span>
          ) : loadingCommunities[communities?.communityId] ? (
            <>
              <CircularProgress size={20} color="inherit" />
              <span className="ml-2">Joining...</span>
            </>
          ) : (
            <span>Join</span>
          )}
        </button>
      </div>
    </div>
    // </div>
  );
};

export default CommunityCard;
