

const TrendingArticlesSkeleton = ({ itemsPerPage }:any) => {
  return (
    <div
      className="flex flex-col px-4 animate-pulse"
      style={{ flex: `0 0 calc((100% - 7%) / ${itemsPerPage})` }}
    >
      <div className="h-[232px] rounded-[20px] bg-gray-500" />
      <div className="w-full h-[24px] bg-gray-500 rounded-[6px] mt-4"></div>
      <div className="flex gap-7 pt-2 justify-between">
        <div className="flex gap-1">
          <div className="w-[60px] h-[16px] bg-gray-500 rounded-[6px]"></div>
        </div>
        <div className="flex">
          <div className="w-[60px] h-[16px] bg-gray-500 rounded-[6px]"></div>
        </div>
        <div className="flex">
          <div className="w-[60px] h-[16px] bg-gray-500 rounded-[6px]"></div>
        </div>
      </div>
    </div>
  );
};

export default TrendingArticlesSkeleton;
