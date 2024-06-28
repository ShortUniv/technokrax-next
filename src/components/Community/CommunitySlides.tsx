

import React, { useState,useEffect } from "react";
import CommunityCard from "./CommunityCard";
import { useSelector } from "react-redux";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CommunitySlides = () => {
  const [slideIndex, setSlideIndex] = useState<{ [key: string]: number }>({});
  const [itemsPerPage,setItemsPerPage] = useState<any>(3);



  const { communities, error, isLoading } = useSelector(
    (state: any) => state.communities
  );


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        // setItemHeight(370);
        setItemsPerPage(1);
        // setIsVertical(true);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2);
        // setIsVertical(false);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
        // setIsVertical(false);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(2);
        // setIsVertical(false);
      } else {
        setItemsPerPage(3);
        // setIsVertical(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  // Group communities by category
  const groupCommunitiesByCategory = (communities: any[]) => {
    const grouped: { [key: string]: any[] } = {};
    communities?.forEach((community: any) => {
      if (!grouped[community.category]) {
        grouped[community.category] = [];
      }
      grouped[community.category].push(community);
    });
    return grouped;
  };

  const groupedCommunities = groupCommunitiesByCategory(communities);

  const handleNextSlide = (category: string) => {
    const currentSlide = slideIndex[category] || 0;
    const maxSlideIndex = groupedCommunities[category].length - itemsPerPage;
    if (currentSlide < maxSlideIndex) {
      setSlideIndex((prev) => ({
        ...prev,
        [category]: currentSlide + 1
      }));
    }
  };

  // Function to handle previous slide for a specific category
  const handlePrevSlide = (category: string) => {
    const currentSlide = slideIndex[category] || 0;
    if (currentSlide - 1 >= 0) {
      setSlideIndex((prev) => ({
        ...prev,
        [category]: currentSlide - 1
      }));
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10 overflow-hidden">
        {error && <div>Error: {error.message}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          Object.keys(groupedCommunities).map((category, index) => (
            <div key={category} className="flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2 pr-[6%]">
                <h2 className="text-3xl font-semibold text-gray-800  xs:text-2xl">{category}</h2>
                <div className="flex gap-2">
                  <button
                    className={`w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 flex justify-center items-center ${slideIndex[category] === 0 ? 'opacity-50 cursor-default' : ''}`}
                    onClick={() => handlePrevSlide(category)}
                    disabled={slideIndex[category] === 0}
                  >
                    <ArrowBackIosIcon />
                  </button>
                  <button
                    className={`w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 flex justify-center items-center ${slideIndex[category] === (groupedCommunities[category].length - itemsPerPage) ? 'opacity-50 cursor-default' : ''}`}
                    onClick={() => handleNextSlide(category)}
                    disabled={slideIndex[category] === (groupedCommunities[category].length - itemsPerPage)}
                  >
                    <ArrowForwardIosIcon />
                  </button>
                </div>
              </div>
              <div className=" relative flex overflow-hidden  w-full "
              >
                <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${(slideIndex[category] || 0) * (91.4 /itemsPerPage)}%)`,width:"100vw" }}>
                  {groupedCommunities[category].map((community: any) => (
                    <CommunityCard
                      key={community.communityId}
                      communities={community}
                      itemsPerPage={itemsPerPage}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CommunitySlides;



