

'use client'
import React, { useState, useEffect } from "react";
import alterimg from "../assets/AlterImg.svg";

const Slides = ({ chunk, handlepopup, content, setContent }: any) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchFinalImageUrl = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/nodejs-aws-lambda/server/proxy?url=${encodeURIComponent(chunk?.image)}`
        );
        const data = await response.json();
        setImageUrl(data.finalUrl);
      } catch (error) {
        console.error("Error fetching final image URL:", error);
      }
    };

    if (chunk?.image) {
      fetchFinalImageUrl();
    }
  }, [chunk]);

  const concatenateTitles = (title: any, limit: any) => {
    if (title?.length > limit) return title.slice(0, limit) + "...";
    return title;
  };

  const handleclick = (con: any) => {
    setContent(con);
    handlepopup();
  };

  const shortDescriptionLimit =
    windowWidth < 1024
      ? 5000
      : windowWidth < 1250
      ? windowWidth < 1180
        ? 160
        : 250
      : 300;

  return (
    <div className="flex justify-center gap-12 p-2 flex-wrap sm:m-5 mt-12 w-full">
      {chunk && (
        <div
          className="flex p-2 lg:pl-4 flex-col lg:flex-row items-center md:w-[70%] lg:w-full lg:h-[350px] gap-5  rounded-3xl bg-white cursor-pointer shadow-lg shadow-gray-400 hover:shadow-2xl hover:shadow-[#96a0f3c9] transition-shadow"
          onClick={() => {
            handleclick({
              link: chunk?.link,
              longdes: chunk?.longdescription,
            });
          }}
        >
          <img
            className="max-w-full rounded-xl w-full lg:w-[60vh] lg:h-[310px] object-fill"
            src={imageUrl || alterimg}
            alt="imghere"
          />

          <div className="self-start p-2 lg:w-full">
            <div className="text-xl font-semibold">
              {concatenateTitles(chunk?.title, 190)}
              <br />
            </div>
            <div className="text-gray-500">news by {chunk.source}</div>
            <div
              className="text-lg text-gray-700 pt-2"
              dangerouslySetInnerHTML={{
                __html: concatenateTitles(
                  chunk?.shortdescription,
                  shortDescriptionLimit
                ),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Slides;

