'use client'
import { useState,useEffect } from "react";
import Logo from "../../assets/HeaderLogo.png";
import AddIcon from "@mui/icons-material/Add";
import { PreferencesData } from "@/constants/sampleData";
import { Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { setUserPreferences } from "@/actions/Profile";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const SingleTopic = ({ topic, updatePreferences }: any) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    updatePreferences(topic);
  };

  return (
    <button
      value={topic}
      className={`w-auto h-10 rounded-full p-4 flex justify-center items-center m-2 ${
        isSelected ? " border border-emerald-500" : "bg-gray-300"
      }`}
      onClick={handleClick}
    >
      {topic}
      {isSelected ? <DoneIcon /> : <AddIcon />}
    </button>
  );
};

const Preferences = () => {
  const [preferences, setPreferences] = useState<any>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("profile")!);
      setUser(storedUser);
    }
  }, []);

  const updatePreferences = (topic: any) => {
    if (!preferences.includes(topic)) {
      setPreferences([...preferences, topic]);
    } else {
      setPreferences(preferences.filter((item: any) => item !== topic));
    }
  };

  const handleContinue = () => {
    dispatch<any>(
      setUserPreferences(
        { preferences: preferences, userId: user.user.userId,type:"setPreferences" },
        router
      )
    );
  };

  return (
    <div className="flex flex-col items-center mt-4 ">
      <div className="flex-shrink-0 flex items-center">
        <Image className="h-8 w-auto" src={Logo} alt="Logo" />
        <span className="text-[#1D2BCA] text-3xl font-semibold ml-2 ">
          Techno
          <span className="text-[#F8990C] text-3xl font-semibold">krax</span>
        </span>
      </div>
      <h1 className="text-[35px] font-semibold mt-[3%]  p-2 text-center">
        What are you interested in?
      </h1>
      <p className="text-[16px] font-medium mt-2 text-gray-800">
        Choose three or more
      </p>
      <div className="flex  max-w-[95%] sm:w-[70%]  lg:w-[60%] flex-wrap mt-[2%] ">
        {PreferencesData.map((data) => (
          <SingleTopic
            key={data.id}
            topic={data.topic}
            updatePreferences={updatePreferences}
          />
        ))}
      </div>
      <Button
        className="bg-gradient-to-r from-[#434343] to-[#000000] text-[#FFFFFF] w-[200px] mt-10 mb-2"
        style={{ color: "white", marginTop: "30px" }}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
};

export default Preferences;
