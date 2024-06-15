import { NavbarComponent } from "@/components/Navbar";
import about from "../../assets/About.jpg"
import impact from "../../assets/impact.jpg";
import robo from "../../assets/Robo.png";
import techno from "../../assets/technologo.png";
import know from "../../assets/Knowledge.svg";
import emp from "../../assets/Empowerment.svg";
import inno from "../../assets/Innovation.svg";
import Footer from "@/components/Footer";
import Image from "next/image";
const About = () => {
  return (
    <>
      <NavbarComponent />
      <div className="relative w-full h-[40vh] overflow-hidden">
        <Image
          className="absolute top-[-5vh] w-full h-[80vh] object-cover brightness-50"
          src={about}
          alt="imghere"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-bold">ABOUT US</h1>
        </div>
      </div>
      <div>
        <h1 className="text-[#1c2bc9] text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-bold text-center mt-8">
            Who We Are
        </h1>
        <div className="flex ml-8 mr-8 xm:ml-32 xm:mr-32 mt-8 gap-12 lg:h-screen">
            <div className=" h-screen hidden lg:block">
              <Image className="rounded-md shadow-lg  shadow-[#8993f6]" src={robo} alt="" />
            </div>
            <div className="md:w-[90%] w-full flex flex-col justify-center item-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-bold">What is Technokrax</h1>
              <p className="text-sm sm:text-base md:text-lg mt-5 flex flex-wrap">
            Technokrax in literal sense means igniting passion. We are creating a platform where people can learn what they love and help them find their passion and ignite them.This is our way of revolutionizing education, where it is open to learn anything  not depended on pre designed courses but people can learn from anywhere they want. This is our way of revolutionizing education, where it is open to 
              </p>
            </div>
        </div>

      </div>




      <div>
      <h1 className="text-[#1c2bc9] text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-bold text-center mt-8">
      Our Mission
      </h1>
        <div className="flex ml-8 mr-8 xm:ml-32 xm:mr-32 mt-8 gap-12 items-center ">      
            <div className="w-full lg:w-[55%] ">
              <h1 className="text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl  font-bold">Mission</h1>
              <p className="text-sm sm:text-lg mt-5 mb-5 text-center flex flex-wrap">
              To provide high quality free tech education for everyone, everywhere
              </p>
              <div className="flex gap-5 flex-col sm:flex-row">
              <div
  className="  border-[1px] border-[#c9c9c9] bg-[#fcfcfc]  text-black"
>
  <h1 className="text-base md:text-lg font-semibold text-center pt-2 pb-2">Free Courses</h1>
  <p className="flex flex-wrap text-center p-2  lg:text-lg md:text-base sm:text-sm">
  Learning is fun when you learn the right way. Easy way to learn is learning and having fun.
  </p>
  </div>
              <div
  className=" border-[1px] border-[#c9c9c9] bg-[#fcfcfc]  text-black"
>
  <h1 className="text-lg font-semibold flex flex-wrap p-2 text-center pt-2 pb-2">Real Time Progress Tracker</h1>
  <p className="flex flex-wrap text-center p-2 lg:text-lg md:text-base sm:text-sm">
  Learning is fun when you learn the right way. Easy way to learn is learning and having fun.
  </p>
  </div>
              <div
  className=" border-[1px] border-[#c9c9c9] bg-[#fcfcfc]  text-black"
>
  <h1 className="text-lg font-semibold text-center pt-2 pb-2">AI Assistant</h1>
  <p className="flex flex-wrap text-center p-2 lg:text-lg md:text-base sm:text-sm">
  Learning is fun when you learn the right way. Easy way to learn is learning and having fun.
  </p>
  </div>   
              </div>
            </div>
            <div className=" h-screen hidden lg:block ">
              <Image className="rounded-md w-full h-[80%] shadow-lg  shadow-[#8993f6]" src={techno} alt="" />
            </div>
        </div>
      </div>




      <div className="bg-[#f5f6ff] pb-16">
        <h1 className="text-[#1c2bc9] pt-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-bold text-center mt-8">Our Values</h1>
        <p className="mt-10 mb-10 text-gray-500 lg:text-2xl md:text-xl sm:text-lg text-base flex justify-center">Our value is to guide tech enthusiastics to learn effectively and efficiently.</p>
        <div className="flex justify-center gap-6 pl-8 pr-8 flex-col sm:flex-row">
        <div className=" border-black border-[1px] rounded-lg">
            <div className="flex justify-center mt-4 ">
            <img src={know}  alt="" />
            </div>
            <div className="flex justify-center  ">

            <h1 className="text-2xl font-bold mt-5 mb-2">Knowledge</h1>
            </div>
            <div className=" mb-5 text-gray-500 lg:text-2xl md:text-xl sm:text-lg text-base flex justify-center pl-4 pr-4">
            We are expert in the field onf online education and are rigorous in delivering high quality learning materials, services and experiences that deliver the best learning outcome. 
            </div>
          </div>
        <div className=" border-black border-[1px] rounded-lg">
            <div className="flex justify-center mt-4 ">
            <img src={emp}  alt="" />
            </div>
            <div className="flex justify-center  ">

            <h1 className="text-2xl font-bold mt-5 mb-2">Empowerment</h1>
            </div>
            <div className=" mb-5 text-gray-500 lg:text-2xl md:text-xl sm:text-lg text-base flex justify-center pl-4 pr-4">
            We are expert in the field onf online education and are rigorous in delivering high quality learning materials, services and experiences that deliver the best learning outcome. </div>
          </div>
        <div className=" border-black border-[1px] rounded-lg">
            <div className="flex justify-center mt-4 ">
            <Image src={inno}  alt="" />
            </div>
            <div className="flex justify-center  ">

            <h1 className="text-2xl font-bold mt-5 mb-2">Innovation</h1>
            </div>
            <div className=" mb-5 text-gray-500 lg:text-2xl md:text-xl sm:text-lg text-base flex justify-center pl-4 pr-4">
            We are expert in the field onf online education and are rigorous in delivering high quality learning materials, services and experiences that deliver the best learning outcome.  </div>
          </div>
       
        </div>
      </div>
      <div className="relative w-full h-[40vh] overflow-hidden">
        <Image
          className="absolute top-[-5vh] w-full h-[80vh] object-cover brightness-50"
          src={impact}
          alt="imghere"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col pl-16 pr-16">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-bold ">Our Impact</h1>
          <p className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl  font-normal ">Technokrax is a leading online e learning platform that has helped individuals from different parts of the world to learn tech courses effectively by providing learning resources and materials used by thousands of learners. </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
