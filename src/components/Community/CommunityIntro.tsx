


import React, { useEffect, useState } from "react";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import { joinCommunity } from "@/actions/Community";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";

const CommunityIntro = ({ community }: any) => {
  const [user, setUser] = useState<any>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<{ [key: string]: boolean }>({});
  const [loadingCommunities, setLoadingCommunities] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);

  useEffect(() => {
    if (user && community) {
      const joinedState: { [key: string]: boolean } = {};
      community?.forEach((comm: any) => {
        const joined = comm?.community?.members?.some(
          (member: any) => member?.userId === user.user.userId
        );
        joinedState[comm?.community?.communityId] = joined;
      });
      setJoinedCommunities(joinedState);
    }
  }, [user, community]);

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

  return (
    <>
      {community?.map((data: any, index: any) => (
        <div key={index} className="w-full max-w-[1000px] mt-4">
          <div className="relative w-full h-[200px] sm:h-[250px]">
            <Image
              src={data?.community?.communityImage}
              alt="image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex justify-between mt-2">
            <h2 className="text-xl sm:text-2xl font-semibold font-sans">
              {data?.community?.name}
            </h2>
            <button className="hover:text-blue-500 transition-colors duration-300">
              <EditIcon />
            </button>
          </div>
          <p className="text-gray-700 mt-3 font-sans">{data?.community?.description}</p>
          <div className="flex justify-between items-center mt-6 sm:mt-12">
            <div className="flex -space-x-2">
              {data?.community?.members?.slice(0, 3).map((member: any, index: any) => (
                <img
                  key={index}
                  src={member?.avatar}
                  alt={`${member?.username} avatar`}
                  title={member?.username}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
              {data?.members?.length > 3 && (
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-700 border-2 border-white">
                  +{data?.community?.members?.length - 3}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-10">
              <p className="font-sans">
                <strong>{data?.community?.members?.length}</strong> Members
              </p>
              <p className="flex items-center gap-1 font-sans">
                <span className="flex h-2 w-2 mr-1">
                  <span className="inline-flex h-full w-full rounded-full bg-green-500"></span>
                </span>
                <strong>{5}</strong> Online
              </p>
            </div>
            <button
              onClick={() => handleJoinCommunity(data?.community?.communityId)}
              className="px-4 sm:px-8 py-2 bg-blue-500 text-white rounded-lg flex justify-center items-center hover:bg-blue-600 transition-colors duration-300"
            >
              {joinedCommunities[data?.community?.communityId] ? (
                <span>Joined</span>
              ) : loadingCommunities[data?.community?.communityId] ? (
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
      ))}
    </>
  );
};

export default CommunityIntro;

