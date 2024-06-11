'use client'
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from 'next/image';

const MyCommunities = () => {
  const communities = [
    {
            id: 1,
            name: "AI Champs",
            description:
              "Join our AI community to explore the cutting-edge advancements, share insights, collaborate with experts, and stay updated on the latest developments in artificial intelligence.",
            members: "10.1K Members",
          },
          {
            id: 2,
            name: "Data Science Wizards",
            description:
              "Join our Data Science community to dive into the world of data, analyze trends, build models, and uncover valuable insights from complex datasets.",
            members: "8.5K Members",
          },
          {
            id: 3,
            name: "Machine Learning Gurus",
            description:
              "Join our Machine Learning community to discuss algorithms, techniques, and applications of ML, and exchange ideas with fellow enthusiasts and experts.",
            members: "6.2K Members",
          },
          {
            id: 4,
            name: "Deep Learning Explorers",
            description:
              "Join our Deep Learning community to explore neural networks, deep architectures, and cutting-edge DL technologies, and share your projects and findings.",
            members: "5.8K Members",
          },
          {
            id: 5,
            name: "Robotics Enthusiasts",
            description:
              "Join our Robotics community to delve into the world of robots, automation, and intelligent systems, and collaborate on exciting projects and research.",
            members: "4.3K Members",
          },
          {
            id: 6,
            name: "Computer Vision Experts",
            description:
              "Join our Computer Vision community to explore the latest advancements in CV, discuss image processing techniques, and share your projects and ideas.",
            members: "3.9K Members",
          },
          {
            id: 7,
            name: "Natural Language Processing Masters",
            description:
              "Join our NLP community to delve into language processing, sentiment analysis, and text generation, and collaborate on innovative NLP projects.",
            members: "2.7K Members",
          },
          {
            id: 8,
            name: "AI Ethics Advocates",
            description:
              "Join our AI Ethics community to discuss the ethical implications of AI technologies, promote responsible AI development, and advocate for fairness and transparency.",
            members: "1.8K Members",
          },
  ];

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
  const gradientClassNames = communities.map((_, index) => generateGradientClassName(index / communities.length));

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

  return (
    <>
      <div className="my-communities p-4 mt-16 ">
        <h2 className="text-3xl font-bold mb-4 font-alegreya">
          My Communities
        </h2>
        <Slider {...settings}>
          {communities?.map((community, index) => (
            <div
              key={community.id}
              className={` w-[300px] h-[320px] bg-gradient-to-br ${gradientClassNames[index]} rounded-lg p-4 flex gap-4 items-center shadow-lg mr-4 `}
            >
              <Image
              width='64'
              height='64'
                src="https://media.istockphoto.com/id/1424987910/photo/coworkers-with-stacked-hands-at-the-office.jpg?s=1024x1024&w=is&k=20&c=zRECSFVK3ZaCa-OCMH_xhrB5x2iGpjy7p-_RL3ywafw="
                alt={community.name}
                className="w-16 h-16 rounded-full mr-4 my-2 "
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-white mb-1">
                  {community.name}
                </h3>
                <p className="text-sm text-gray-200 mb-1">
                  {community.description}
                </p>
                <p className="text-sm text-gray-300">{community.members}</p>
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
