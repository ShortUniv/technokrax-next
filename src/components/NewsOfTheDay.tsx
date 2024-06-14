'use client'
import { NewsOfTheDayCardData } from "../constants/sampleData";
import Image from "next/image";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const NewsOfTheDay = () => {
  return (
    <div className="flex flex-col justify-center mx-[4%] sm:mx-[8%] overflow-hidden mt-24 items-center">
      <h2 className="text-[48px] font-semibold leading-[56px] text-center mb-10 font-petrona">
        News Of The Day
      </h2>
      <p className="text-[20px] sm:text-[28px] font-normal text-center mb-16">
        Stay updated with the latest happenings in the tech world
      </p>

      <div className=" gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {NewsOfTheDayCardData.map((data) => (
          <div className="flex flex-col gap-6" key={data.id}>
            <Image src={data.img} alt="img" className="rounded-[20px] w-[348px] h-[232px] sm:h-auto sm:max-w-full sm:w-full mx-auto" />
            <h3 className="text-[20px] font-medium leading-[24px] w-[348px] xs:w-[280px] sm:w-auto flex-wrap">
              {data.title}
            </h3>
            <p className="text-[18px] font-normal leading-[21px] w-[348px] xs:w-[280px] sm:w-auto text-wrap">
              {data.previewText}
            </p>
            <div className="flex gap-10">
              <p className="text-[12px] font-medium">{data.name}</p>
              <p className="text-[12px] font-light">{data.publishedTime}</p>
              <ArrowForwardOutlinedIcon />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-10 mt-10">
        <button className="w-[80px] h-[80px] bg-[#FAFAFA] rounded-full">
          <ArrowBackIosOutlinedIcon />
        </button>
        <button className="w-[80px] h-[80px] bg-[#FAFAFA] rounded-full">
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default NewsOfTheDay;
