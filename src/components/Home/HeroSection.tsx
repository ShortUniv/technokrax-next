'use client'
import RobotImage from "../..//assets/RobotImgNew.png";
// import HomePageEllipse from "../../assets/HomePageEllipse.png";
 import HomePageEllipse from "../../assets/HomeEllipseHero.png";
 import Image from "next/image";


const HeroSection = () => {
  return (
    <div className="relative z-10 bg-[#FFFFFF] w-full  overflow-hidden h-auto ">
      <Image
        src={HomePageEllipse}
        className="absolute  top-[0px] left-[0px] z-0"
        alt="ellipse"
      />
      <div className="flex flex-col sm:max-lg:mt-56 sm:max-lg:items-center ">
        <h1 className="font-arefRuqaa z-30 xs:text-[40px] text-[#1D2BCA] text-[50px] md:text-[80px] mt-[450px] sm:mt-60 mx-auto  sm:ml-20 cursor-pointer  flex gap-4">
          Igniting
          <span className="font-arefRuqaa text-[#F8990C] xs:text-[40px] text-[50px] md:text-[80px] ">
            Passion
          </span>
        </h1>
        <p className="font-sans z-30 text-[#000000] text-[15px] mt-6 sm:text-[20px] sm:w-[564px] mx-4 sm:ml-20   leading-relaxed sm:max-lg:text-[15px] sm:max-lg:ml-0 sm:max-lg:text-center  text-wrap">
        Learning is fun when you learn the right way. Our platform combines AI-driven personalization to ensure that every learning journey is both fun and uniquely tailored to meet individual needs and preferences. So join us in revolutionizing the way we learn.
        </p>
        <div className="flex sm:ml-20  justify-center md:justify-start gap-4 mt-10  sm:max-lg:ml-0">
          <button className="w-[150px] xs:w-[130px] h-[47px]  bg-[#1D2BCA] text-white rounded-[50px] cursor-pointer">
            Join Us
          </button>
          <button className="w-[150px] xs:w-[130px] h-[47px] bg-transparent text-[#1D2BCA] rounded-[50px] border-2 border-[#1D2BCA] cursor-pointer">
            See Preview
          </button>
        </div>
      </div>
      <Image
        src={RobotImage}
        alt="RobotImage"
        // className="absolute top-16 right-[00px] w-[606px] h-[568px] max-w-full sm:max-lg:left-[-120px] lg:max-xl:left-[450px] sm:mx-52" />
        className="absolute  sm:block top-16  right-10 sm:w-[606px] sm:h-[568px] z-20" />
    </div>
  );
};

export default HeroSection;
