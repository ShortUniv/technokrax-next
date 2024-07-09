'use client'
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { truncateText } from '@/utils/helperFunction';
import { useRouter } from 'next/navigation';

const MyCommunities = () => {


  const { profile } = useSelector((state: any) => state.profile);
const router = useRouter();

  // Define gradient colors
  const gradients = [
    "from-purple-400 via-pink-500 to-red-500",
    "from-green-400 via-blue-500 to-indigo-500",
    "from-yellow-400 via-orange-500 to-red-500",
    "from-green-400 via-teal-500 to-blue-500",
  ];

  // Function to generate a gradient class name with a seed
  const generateGradientClassName = (seed:any) => {
    const index = Math.floor(seed * gradients.length);
    return gradients[index];
  };

  // Generate gradient class names using community index as the seed
  const gradientClassNames = profile?.relation?.communities.map((_:any, index:any) => generateGradientClassName(index / profile?.relation?.communities?.length));

  const CustomPrevArrow = ({currentSlide,slideCount,...props}:any) => (
    <button {...props}>
      <ArrowBackIosNewIcon style={{ fontSize: "24px", color: "black" }} />{" "}
    </button>
  );

  const CustomNextArrow = ({currentSlide,slideCount,...props}:any) => (
    <button {...props}>
      <ArrowForwardIosIcon style={{ fontSize: "24px", color: "black" }} />{" "}
    </button>
  );

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3, 
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2, 
        },
      },
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 1, 
        },
      },
    ],
  };

  const handleCommunityClick = (slug:any) => {
    // dispatch<any>(getCommunity({communityId:communityId}))
    router.push(`/community/${slug}`)
  }

  return (
    <>
      <div className="my-communities p-4 mt-16 ">
        <h2 className="text-3xl font-bold mb-4 font-alegreya">
          My Communities
        </h2>
        <Slider {...settings}>
          {profile?.relation?.communities?.map((community:any, index:any) => (

            <div
             onClick={() => handleCommunityClick(community?.slug)}
              key={community._id}
              className={` w-[300px] h-[320px] bg-gradient-to-br ${gradientClassNames[index]} rounded-lg p-4 flex gap-4 items-center shadow-lg mr-4 cursor-pointer hover:scale-105 transition-transform transform my-4`}
            >
              <Image
              width='64'
              height='64'
                src={community?.communityImage}
                alt={community?.name}
                className="w-16 h-16 rounded-full mr-4 my-2 "
              />
              <div className="flex flex-col gap-2">
                <h3 className={`text-lg font-bold text-white mb-1 ${community?.name?.length > 30 ? "": "mt-[28px]"}`}>
                  {truncateText(community?.name,45)}
                </h3>
                <p className="text-sm text-gray-200 mb-1">
                  {truncateText(community?.description,150)}
                </p>
                <div className="flex gap-4 items-center mt-6 xs:mt-12">
        <div className="flex -space-x-2">
          {community?.members?.slice(0, 3).map((member: any, index: any) => (
            <img
              key={index}
              src={member?.avatar}
              alt={`${member?.username} avatar`}
              title={member?.username}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
          {community?.members?.length > 3 && (
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-700 border-2 border-white">
              +{community?.members?.length - 3}
            </span>
          )}
        </div>
        <p>
          <strong>{community?.members?.length}</strong> Members
        </p>
      </div>
                {/* <p className="text-sm text-gray-300">{community?.members?.length}</p> */}
              </div>
            </div>
    
          ))}
        </Slider>
      </div>
      <button
        className="flex justify-center mx-auto mt-10"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background 0.3s ease,",
          width: "200px",
          alignItems: "center",
        }}
      >
        View All
      </button>
    </>
  );
};

export default MyCommunities;
