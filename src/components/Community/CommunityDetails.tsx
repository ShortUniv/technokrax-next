


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityIntro from "./CommunityIntro";
import CommunityActivity from "./CommunityActivity/CommunityActivity";
import { NavbarComponent } from "../Navbar";
import { useParams } from "next/navigation";
import { getCommunity } from "@/actions/Community";

const CommunityDetails = () => {
  const dispatch = useDispatch();
  const { communities, isLoading } = useSelector((state: any) => state?.communities);
  const { slug } = useParams<any>();

  useEffect(() => {
    dispatch<any>(getCommunity({ slug: slug }));
  }, [slug]);

  return (
    <>
      <NavbarComponent />
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-[6%] mt-6 ">
        <div>
          <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl font-sans">Community</h1>
          <div className="flex flex-col gap-10">
            <CommunityIntro community={communities} />
            {communities?.map((community: any) => (
              <CommunityActivity
                key={community.communityId}
                community={community}
                loading={isLoading}
              />
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default CommunityDetails;
