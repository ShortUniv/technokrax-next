import CloseIcon from "@mui/icons-material/Close";
import Input from "../Input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveProfileDetails } from "../../actions/Profile";

interface ProfileEditCardState {
  name: string;
  email: string;
  bio: string;
  socials: {
    twitter: string;
    facebook: string;
    linkedin: string;
    github: string;
  };
}

const initialState: ProfileEditCardState = {
  name: "",
  email: "",
  bio: "",
  socials: {
    twitter: "",
    facebook: "",
    linkedin: "",
    github: "",
  },
};

const ProfileEditCard = ({ setEditCard, editCard,profile }: any) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile")!);

  const [profileData, setProfileData] =
    useState<ProfileEditCardState>(initialState);

    useEffect(() => {
      if (profile) {
        setProfileData(prevProfileData => ({
          ...prevProfileData,
          name: profile?.userInfo?.name || "",
          email: profile?.userInfo?.email || "",
          bio: profile?.userInfo?.bio || "",
          socials: {
            twitter: profile?.userInfo?.socials?.twitter || "",
            facebook: profile?.userInfo?.socials?.facebook || "",
            linkedin: profile?.userInfo?.socials?.linkedin || "",
            github: profile?.userInfo?.socials?.github || ""
          }
        }));
      }
    }, [profile]);

    
useEffect(() => {
  console.log("Profile data:", profileData); // Log the profileData state to check if it's being updated correctly
}, [profileData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name.startsWith("socials.")) {
      const socialsField = name.split(".")[1];
      setProfileData((prevState) => ({
        ...prevState,
        socials: {
          ...prevState.socials,
          [socialsField]: value,
        },
      }));
    } else {
      setProfileData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };



  const handleSave = (event: any) => {
    event.stopPropagation();

    dispatch<any>(
      saveProfileDetails({ ...profileData, userId: user?.user?.userId,type:"ProfileDetailsUpdate" })
    );
    setEditCard(false);
  };
  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
        handleSave(e);
    }
};
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"></div>

      <div className="fixed  top-[68px] sm:top-18 flex justify-between w-[90%] sm:w-[70%] lg:w-[50%] p-4 px-8 rounded-tl-[10px] rounded-tr-[10px] border-b border-gray-300 bg-white opacity-100 z-30">
        <h3 className="text-[20px] font-semibold ">Edit Profile</h3>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setEditCard(false);
            console.log(editCard);
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="relative bg-white  shadow-md  w-[90%] sm:w-[70%] lg:w-[50%] h-[70vh] z-20 overflow-y-auto">
        <div className="flex flex-col mt-4 gap-8 px-8 p-4">
          <h3 className="text-[16px] font-medium ">Basics:</h3>
          <Input
          value={profileData.name}
            name="name"
            label="Name"
            half
            autoFocus
            handleChange={handleChange}
            handleKeyDown={handleKeyPress}
          />
          <Input
            value={profileData.email}
            name="email"
            label="Email"
            half
            autoFocus
            handleChange={handleChange}
            handleKeyDown={handleKeyPress}
          />
          <textarea
            value={profileData.bio}
            name="bio"
            cols={30}
            rows={5}
            placeholder="write about yourself..."
            className="border-[1px] focus:outline-none p-2 resize-none"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          ></textarea>
          <h3 className="text-[16px] font-medium ">Socials:</h3>
          <div className="flex">
            <div className="flex min-w-[200px] h-[55px] border-[2px]  justify-center items-center xs:hidden">
              http://twitter.com/
            </div>
            <input
            value={profileData.socials.twitter}
              name="socials.twitter"
              type="text"
              placeholder="twitter"
              className="w-full border-[2px] focus:outline-none p-2 "
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="flex">
            <div className=" min-w-[200px] h-[55px] border-[2px]  justify-center items-center xs:hidden flex">
              http://facebook.com/
            </div>
            <input
            value={profileData.socials.facebook}

              name="socials.facebook"
              type="text"
              placeholder="facebook"
              className="w-full border-[2px] focus:outline-none p-2 "
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="flex">
            <div className="flex min-w-[200px] h-[55px] border-[2px]  justify-center xs:hidden items-center">
              http://linkedin.com/
            </div>
            <input
            value={profileData.socials.linkedin}

              name="socials.linkedin"
              type="text"
              placeholder="linkedin"
              className="w-full border-[2px] focus:outline-none p-2 "
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="flex pb-10">
            <div className="flex min-w-[200px] h-[55px] border-[2px]  justify-center items-center xs:hidden">
              http://github.com/
            </div>
            <input
            value={profileData.socials.github}
            
              name="socials.github"
              type="text"
              placeholder="github"
              className="w-full border-[2px] focus:outline-none p-2 "
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
        <div className="fixed bottom-[57px] flex justify-end w-[90%] sm:w-[70%] lg:w-[50%] p-4 px-8 rounded-bl-[10px] rounded-br-[10px] border-t border-gray-300 bg-white opacity-100 z-30">
          <button
            className="w-[100px] h-[40px] rounded-[10px] bg-gradient-to-r from-[#434343] to-[#000000] text-[#FFFFFF]"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditCard;
