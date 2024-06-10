'use client'
const Discover = () => {
  return (
    <div className="flex flex-col justify-center mx-[5%] xs:mx-[2%] overflow-hidden mt-24 items-center">
      <h2 className="text-[48px] font-semibold leading-[56px] text-center mb-10 font-petrona">
        Discover What Matters
      </h2>
      <p className="text-center mb-8">
      Got something you’re curious about or want to learn something new? Jump in and explore!
      </p>
      <input
        placeholder="What are you learning today?"
        className=" text-center w-[95%] h-[80px] bg-[#FAFAFA] border-[1px] border-[#00000040] rounded-[8px] mb-10 ]"
      ></input>
      <div className=" grid grid-cols-2    gap-[18px] sm:gap-[30px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <a
          href="#"
          className="w-[160px] xs:w-[140px] xs:h-[50px] sm:w-[230px] h-[29px]  flex justify-center items-center rounded-[50px] bg-[#F5FBFF]  border-[1px] border-[#24283180] text-center"
        >
          Artificial Intelligence
        </a>
        <a
          href="#"
          className="w-[160px] sm:w-[230px] h-[29px] xs:w-[140px] xs:h-[50px] flex justify-center items-center rounded-[50px] bg-[#F5FBFF]  border-[1px] border-[#24283180] text-center"
        >
          Robotics
        </a>
        <a
          href="#"
          className="w-[160px] xs:w-[140px] xs:h-[50px] sm:w-[230px] flex justify-center items-center h-[29px] rounded-[50px] bg-[#F5FBFF]  border-[1px] border-[#24283180] text-center"
        >
          Web Development
        </a>
        <a
          href="#"
          className="w-[160px]  xs:w-[140px] xs:h-[50px] sm:w-[230px] flex justify-center items-center h-[29px] rounded-[50px] bg-[#F5FBFF]  border-[1px] border-[#24283180] text-center"
        >
          Data Science
        </a>
        <a
          href="#"
          className="w-[160px] xs:w-[140px] xs:h-[50px] sm:w-[230px] flex justify-center items-center h-[29px] rounded-[50px] bg-[#F5FBFF]  border-[1px] border-[#24283180] text-center"
        >
          Artificial Intelligence
        </a>
        <a
          href="#"
          className="w-[160px] xs:w-[140px] xs:h-[50px] sm:w-[230px] flex justify-center items-center h-[29px] rounded-[50px] bg-[#F5FBFF]  border-[1px] border-[#24283180] text-center"
        >
          Robotics
        </a>
        <a
          href="#"
          className="w-[160px] xs:w-[140px] xs:h-[50px] sm:w-[230px] flex justify-center items-center h-[29px] rounded-[50px] bg-[#F5FBFF]  border-[1px] border-[#24283180] text-center"
        >
          Web Development
        </a>
        <a
          href="#"
          className="w-[160px] xs:w-[140px] xs:h-[50px] sm:w-[230px] flex justify-center items-center h-[29px] rounded-[50px] bg-[#F5FBFF]  border-[1px] border-[#24283180] text-center"
        >
          Data Science
        </a>
      </div>
    </div>
  );
};

export default Discover;
