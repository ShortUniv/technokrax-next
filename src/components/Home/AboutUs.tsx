'use client'
import AboutUsImg from "../../assets/AboutUsText.png";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="flex flex-col bg-[#EBECFF] justify-center xs:px-[12px] px-[30px] lg:px-[150px] sm:px-[100px] overflow-hidden mt-24 items-center">
      <h2 className="text-[48px] font-semibold leading-[56px] text-center mb-10 mt-24 font-petrona">
        About Us
      </h2>
      <p className="text-[20px] font-normal leading-[24px] text-center mb-10 ">
      Welcome to Technokrax, where passion ignites and innovation thrives. Born from the creative minds at RevoltronX, our mission is to pioneer the future of technology and education. With this vision at heart, we've crafted a platform dedicated to revolutionizing learning. Every line of code, every feature – they're all infused with our dedication to harnessing the transformative power of education.
At Technokrax, we understand that everyone is unique – from their learning style to their passions and pace. That's why we've meticulously tailored every aspect of this platform to resonate with you, offering personalized learning experiences and unwavering support every step of the way. We're here to celebrate your distinctiveness and spark the flames of passion within you.
      </p>
      <button className="w-[150px] h-[47px] bg-[#1D2BCA] text-[#FFFFFF] rounded-[50px] mb-8">
        See more
      </button>

      <Image
        src={AboutUsImg}
        alt="img"
        className=" mb-40"
      />
    </div>
  );
};

export default AboutUs;
