import React from "react";
import { IoMdClose } from "react-icons/io";

const Topupnews = ({ handlepopup, content }:any) => {
  console.log(content);
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="absolute top-2 right-3">
        <button
          onClick={handlepopup}
          className="text-4xl hover:text-[#d56b01] text-gray-400"
        >
          <IoMdClose />
        </button>
      </div>
      <div className="relative bg-gray-100 rounded-lg w-full max-w-5xl">
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <div
            className="bg-white text-gray-900 font-petrona font-medium text-xl p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: content.longdes }}
          />
          <div className="flex justify-end">
            <button
              onClick={() => window.open(content.link, "_blank")}
              className="border text-gray-50 hover:text-gray-800 mt-4 duration-300 relative group cursor-pointer   overflow-hidden h-16 w-48 rounded-md bg-gray-800 p-2  font-extrabold hover:bg-sky-500"
            >
              <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-700 right-12 top-12 bg-yellow-500"></div>
              <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150  duration-700 right-20 -top-6 bg-orange-500"></div>
              <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8   rounded-full group-hover:scale-150  duration-700 right-32 top-6 bg-pink-500"></div>
              <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4   rounded-full group-hover:scale-150  duration-700 right-2 top-12 bg-red-600"></div>
              <p className="z-10 absolute bottom-2 left-2">
                Read from Source . . .
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topupnews;
