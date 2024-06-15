import alterimg from "../assets/AlterImg.svg";
const Slides = ({ chunk, handlepopup, setContent }: any) => {
  const concatenateTitles = (title1: string, limit: number) => {
    if (title1?.length > limit) return title1.slice(0, limit) + "...";
    return title1;
  };
  const handleclick = (con: any) => {
    setContent(con);
    handlepopup();
  };
  return (
    <div className="flex gap-12 flex-wrap p-5 mt-12">
      
      {chunk[0] && (
        <div
          className="relative flex flex-col  sm:w-[640px] sm:h-[360px]   w-full justify-center content-center shadow-lg hover:shadow-2xl hover:shadow-[#96a0f3c9] transition-shadow  rounded-lg "
          onClick={() => {
            handleclick(chunk[0]?.link);
          }}
        >
          <img
            className=" object-contain max-w-full sm:h-[360px]   rounded-md   "
            src={
              chunk[0].image
                ? `https://kpp1td2yze.execute-api.us-west-2.amazonaws.com/dev/nodejs-aws-lambda/server/proxy?url=${encodeURIComponent(chunk[0]?.image)}`
                : alterimg
            }
            alt="imghere"
          />
          <div className="absolute inset-0  opacity-60 bg-gradient-to-t from-gray-800 to-gray-950 hover:opacity-0 rounded-md"></div>
          <div className="absolute max-[390px]:p-5 p-2 text-sm whitespace-nowrap overflow-hidden text-wrap shadow-lg max-[390px]:text-base  bottom-0 max-[390px]:bottom-4 left-4 text-gray-200 md:text-xl sm:text-lg">
            {concatenateTitles(chunk[0]?.title, 190)}
          </div>
        </div>
      )}

      {chunk[1] && (
        <div
          onClick={() => {
            handleclick(chunk[1]?.link);
          }}
          className=" flex flex-col sm:w-[305px] w-full   sm:h-[360px] 0 shadow-lg hover:shadow-2xl hover:shadow-[#96a0f3c9] transition-shadow rounded-lg"
        >
          <img
            className="object-contain max-w-full sm:max-h-[230px] bg-black rounded-t-md  "
            src={
              chunk[1].image
                ? `https://kpp1td2yze.execute-api.us-west-2.amazonaws.com/dev/nodejs-aws-lambda/server/proxy?url=${encodeURIComponent(chunk[1]?.image)}`
                : alterimg
            }
            alt="imghere"
          />
          <div className="pt-7 pl-4 p-2">
            {concatenateTitles(chunk[1]?.title, 90)}
          </div>
        </div>
      )}
      {chunk[2] && (
        <div
          onClick={() => {
            handleclick(chunk[2]?.link);
          }}
          className=" flex flex-col sm:w-[305px]   w-full sm:h-[360px] 0 shadow-lg hover:shadow-2xl hover:shadow-[#96a0f3c9] transition-shadow rounded-lg"
        >
          <img
            className="object-contain max-w-full sm:max-h-[230px] bg-black  rounded-t-md  "
            src={
              chunk[2].image
                ? `https://kpp1td2yze.execute-api.us-west-2.amazonaws.com/dev/nodejs-aws-lambda/server/proxy?url=${encodeURIComponent(chunk[2]?.image)}`
                : alterimg
            }
            alt="imghere"
          />
          <div className="pt-7 pl-4 p-2">
            {concatenateTitles(chunk[2]?.title, 90)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slides;
0;
