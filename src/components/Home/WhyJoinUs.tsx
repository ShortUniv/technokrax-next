'use client'
import JoinUsImg from "../../assets/JoinUs2.png";
import Image from "next/image";

const WhyJoinUs = () => {
  return (
    <div className="membership-section flex flex-col items-center justify-center relative overflow-hidden">
      <div className="text-center z-20 pt-10 lg:pt-16 items-center">
        <h2 className="font-quintessential text-2xl">Why Join Us</h2>
        <p className="text-[#242831] text-[44px] leading-[53px] font-semibold pt-2 pb-10 font-petrona">
          Welcome to Technokrax
        </p>
        <Image src={JoinUsImg} alt="image" className="relative z-20 xs:w-[80%] w-[60%] lg:w-[90%] mx-auto" />
      </div>
      <h2
        className="absolute inset-0 flex items-center justify-center text-center text-[14vw]   xl:text-[14vw] text-[#FFFFFF] opacity-20 top-48"
        style={{
          textShadow:
            "2px 2px 0 #1D2BCA, -2px 2px 0 #1D2BCA, 2px -2px 0 #1D2BCA, -2px -2px 0 #1D2BCA",
        }}
      >
        TECHNOKRAX
      </h2>
    </div>
  );
};

export default WhyJoinUs;
