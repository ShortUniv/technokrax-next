'use client'
import { ToolsToExplore } from "../../constants/sampleData";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import Image from "next/image";

const ToolsToExplores = () => {
  return (
    <div className="flex flex-col justify-center mx-[8%] overflow-hidden mt-24 items-center">
      <h2 className="text-[48px] font-semibold leading-[56px] text-center mb-10 font-petrona">
        Tools To Explore
      </h2>
      <p className=" text-[20px] sm:text-[28px] font-normal text-center mb-16">
        We have tons of tools from different fields for you to explore your
        creativity
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 ">
        {ToolsToExplore.map((data) => (
          <div className="flex flex-col" key={data.id}>
            <Image src={data.toolImg} alt="img" className="rounded-[20px] mb-3" />
            <h3 className="text-[32px] font-normal text-center leading-[38px]">
              {data.name}
            </h3>
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

export default ToolsToExplores;
