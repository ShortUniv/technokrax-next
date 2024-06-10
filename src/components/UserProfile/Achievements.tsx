import { useState } from "react";
import { useSelector } from "react-redux";

const Badges = () => {
  const { profile } = useSelector((state: any) => state.profile);
  return (
    <>
      {profile?.achievements?.badges?.map((data: any,index:number) => (
        <div key={data?._id || index} className=" gap-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <img src={data.badgeUrl} alt="" className="w-[100px] h-[100px]" />
          <img src={data.badgeUrl} alt="" className="w-[100px] h-[100px]" />
          <img src={data.badgeUrl} alt="" className="w-[100px] h-[100px]" />
          <img src={data.badgeUrl} alt="" className="w-[100px] h-[100px]" />
          <img src={data.badgeUrl} alt="" className="w-[100px] h-[100px]" />
          <img src={data.badgeUrl} alt="" className="w-[100px] h-[100px]" />
          <img src={data.badgeUrl} alt="" className="w-[100px] h-[100px]" />
        </div>
      ))}
    </>
  );
};
const Awards = () => {
  // const { isLoading, profile } = useSelector((state: any) => state.profile);
  return (
    <>
      {/* {profile?.achievements?.awards?.map((data:any) => ( */}
      <div className=" gap-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

        <img
          src="https://i.postimg.cc/Kvgcwqp0/trophy.png"
          alt=""
          className="w-[100px] h-[100px]"
        />
        <img
          src="https://i.postimg.cc/Kvgcwqp0/trophy.png"
          alt=""
          className="w-[100px] h-[100px]"
        />
        <img
          src="https://i.postimg.cc/Kvgcwqp0/trophy.png"
          alt=""
          className="w-[100px] h-[100px]"
        />
        <img
          src="https://i.postimg.cc/Kvgcwqp0/trophy.png"
          alt=""
          className="w-[100px] h-[100px]"
        />
        <img
          src="https://i.postimg.cc/Kvgcwqp0/trophy.png"
          alt=""
          className="w-[100px] h-[100px]"
        />
        <img
          src="https://i.postimg.cc/Kvgcwqp0/trophy.png"
          alt=""
          className="w-[100px] h-[100px]"
        />
        <img
          src="https://i.postimg.cc/Kvgcwqp0/trophy.png"
          alt=""
          className="w-[100px] h-[100px]"
        />
      </div>

      {/* ))
        
      } */}
    </>
  );
};

const Achievements = () => {
  const [active, setActive] = useState<any>("badges");
  const { profile } = useSelector((state: any) => state.profile);

  const badgeCount = profile?.achievements?.badges?.length || 0;
  const awardCount = profile?.achievements?.awards?.length || 0;

  return (
    <div className="mt-10 flex flex-col gap-8 ">
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
          transition: "background 0.3s ease,",
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
