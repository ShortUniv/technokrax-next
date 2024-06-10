import FooterLogo from "../assets/FooterLogo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <>
    <div className="bg-[#1B53B7]">

      <div className=" flex flex-col sm:flex-row  gap-10 md:gap-20  lg:gap-32 pl-10 lg:pl-20 pt-20  overflow-hidden">

        
        <div className="flex gap-10 md:gap-20 lg:gap-32">
        <div className="flex flex-col text-[#FFFFFF] gap-2">
          <h3 className="text-[24px] font-semibold ">Important Links</h3>
          <p>Learn</p>
          <p>News</p>
          <p>Tools</p>
          <p>Community</p>
          <p>About Us</p>
        </div>
        <div className="flex flex-col text-[#FFFFFF] gap-2">
          <h3 className="text-[24px] font-semibold">Important Links</h3>
          <p>Learn</p>
          <p>News</p>
          <p>Tools</p>
          <p>Community</p>
          <p>About Us</p>
        </div>
        </div>

        
        <div className="flex flex-col text-[#FFFFFF] gap-2">
          <h3 className="text-[24px] font-semibold ">Contact Us</h3>
          <p>contact@technokrax</p>
        </div>
        
      </div>
      <div className=" flex pl-20 pt-12 gap-4 pb-20">
      <Image src={FooterLogo} alt="logo" width='41' height="48" />


        <p className="text-[32px] text-[#FFFFFF] font-medium">Technokrax</p>
      </div>
    </div>
    </>
  );
};

export default Footer;
