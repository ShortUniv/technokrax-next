
const ArticleDetailsSkeleton = () => {
  return (
    <div className="mx-[5%] md:mx-[15%] lg:mx-[20%] xl:mx-[24%] 2xl:mx-[28%] animate-pulse">
      <div className="flex gap-10 mt-4 ">
        <div className="bg-gray-500 w-[120px] h-[20px] rounded-[6px]  "></div>
        <div className="bg-gray-500 w-[120px] h-[20px] rounded-[6px] "></div>
      </div>
      <div className="bg-gray-500 w-[90px] h-[20px] mt-2 rounded-[6px] "></div>
      <div className="bg-gray-500 w-full h-[245px] sm:h-[380px]   mt-8 rounded-[6px] "></div>
      <div className=" mt-6 flex  justify-between shimmers">
        <div className=" bg-gray-500 w-[90px] h-[20px] rounded-[6px] "></div>
        <div className="flex gap-10 xs:gap-4 lg:max-xl:gap-8 ">
          <div className="bg-gray-500 w-[30px] h-[30px] rounded-[6px] "></div>
          <div className="bg-gray-500 w-[30px] h-[30px] rounded-[6px] "></div>
          <div className="bg-gray-500 w-[30px] h-[30px] rounded-full "></div>
          <div className="bg-gray-500 w-[30px] h-[30px] rounded"></div>
        </div>
      </div>
      <div className="bg-gray-500 w-[100%] h-[40px] mt-5 rounded-[6px] "></div>
      <div className="bg-gray-500 w-[80%] h-[15px] mt-3 rounded-[6px] "></div>
      <div className="bg-gray-500 w-[90%] h-[15px] mt-3 rounded-[6px] "></div>
      <div className="bg-gray-500 w-[85%] h-[15px] mt-3 rounded-[6px] "></div>
      <div className="bg-gray-500 w-[85%] h-[15px] mt-3 rounded-[6px] "></div>
      <div className="bg-gray-500 w-[85%] h-[15px] mt-3 rounded-[6px] "></div>
    </div>
  );
};

export default ArticleDetailsSkeleton;
