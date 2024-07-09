'use client'
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

const Badges = () => {
  const { profile } = useSelector((state: any) => state.profile);
  return (
    <>
      {profile?.achievements?.badges?.length === 0 ? (
        <div className="col-span-2 md:col-span-2 lg:col-span-3 flex justify-center items-center text-center h-32">
          <p className="px-1">
            No badges to show - Continue 
            <span className="text-blue-500 underline mx-1">
              <a href="/learn">Learning</a>
            </span> 
            to earn badges.
          </p>
        </div>
      ) : (
        <div className="gap-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {profile?.achievements?.badges?.map((data: any, index: number) => (
            <div key={data?._id || index}>
              <Image src={data.badgeUrl} alt="" width="100" height="100" className="w-[100px] h-[100px]" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const Awards = () => {
  const { profile } = useSelector((state: any) => state.profile);
  return (
    <>
      {profile?.achievements?.awards?.length === 0 ? (
        <div className="col-span-2 md:col-span-2 lg:col-span-3 flex justify-center items-center text-center h-32">
          <p className="px-1">
            No awards to show - Continue 
            <span className="text-blue-500 underline mx-1">
              <a href="/learn">Learning</a>
            </span> 
            to earn awards.
          </p>
        </div>
      ) : (
        <div className="gap-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {profile?.achievements?.awards?.map((data: any, index: number) => (
            <div key={data?._id || index}>
              <Image src={data.awardUrl} alt="" width="100" height="100" className="w-[100px] h-[100px]" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const Achievements = () => {
  const [active, setActive] = useState<any>("badges");
  const { profile } = useSelector((state: any) => state.profile);

  const badgeCount = profile?.achievements?.badges?.length || 0;
  const awardCount = profile?.achievements?.awards?.length || 0;

  return (
    <div className="mt-10 flex flex-col gap-8">
      <h2 className="font-alegreya text-[35px] font-medium">
        My Achievements ({badgeCount + awardCount})
      </h2>
      <div className="flex gap-24">
        <h3
          className={`font-alegreya text-[23px] font-medium cursor-pointer ${active === "badges" ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
          onClick={() => setActive("badges")}
        >
          Badges
        </h3>
        <h3
          className={`font-alegreya text-[23px] font-medium cursor-pointer ${active === "awards" ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
          onClick={() => setActive("awards")}
        >
          Awards
        </h3>
      </div>
      <div>{active === "badges" ? <Badges /> : <Awards />}</div>
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
          transition: "background 0.3s ease",
          width: "200px",
          alignItems: "center",
        }}
      >
        View All {active === "badges" ? "Badges" : "Awards"}
      </button>
    </div>
  );
};

export default Achievements;
