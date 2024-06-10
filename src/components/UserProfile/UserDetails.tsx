import { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import ProfileEditCard from "./ProfileEditCard";
import { useSelector } from "react-redux";
import ProfileImageEditor from "./ProfileImageEditor";

const UserDetails = () => {
  const [editCard, setEditCard] = useState<any>(false);
  const [imgCard, setImgCard] = useState<any>(false);
  const { profile } = useSelector((state: any) => state.profile);



  return (
    <>
      {editCard && (
        <ProfileEditCard setEditCard={setEditCard} editCard={editCard} profile={profile}/>
      )}
      {imgCard && (
        <ProfileImageEditor setImgCard={setImgCard} imgCard={imgCard} />
      )}

      <div className="flex flex-col mt-8">
        <h1 className="font-alegreya text-5xl font-medium mb-4 text-gray-900">
          My Profile
        </h1>
        <div className="flex flex-col lg:flex-row bg-gray-100 px-6 md:px-10 py-4 lg:py-20 gap-6 items-center rounded-xl">
          <div className="flex flex-col items-center">
            <div
              className="w-40 h-40 bg-gray-300 rounded-full cursor-pointer overflow-hidden"
              onClick={() => setImgCard(!imgCard)}
            >
              <img
              src={profile?.userInfo?.photo || "https://i.ibb.co/3m3Lx5B/dummy-avatar.jpg"}
                className="w-full h-full object-cover"
                alt="Profile Photo"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <a
                href={`https://www.instagram.com/${profile?.userInfo?.socials?.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="text-gray-600" />
              </a>
              <a
                href={`https://github.com/${profile?.userInfo?.socials?.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="text-gray-600" />
              </a>
              <a
                href={`https://www.linkedin.com/in/${profile?.userInfo?.socials?.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="text-gray-600" />
              </a>
              <a
                href={`https://twitter.com/${profile?.userInfo?.socials?.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon className="text-gray-600" />
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold mt-10 text-gray-800">
              {profile?.userInfo?.name || "Your Name"}
            </h2>
            <h3 className="text-2xl font-light mt-2 text-gray-600">
              {profile?.userInfo?.email || "Your email"}
            </h3>
            <p className="text-lg text-gray-700 mt-4">
              {profile?.userInfo?.bio ||
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
            </p>
            <button className="w-32 h-12 rounded-md bg-gradient-to-r from-gray-800 to-gray-700 text-white mt-6 hover:from-gray-700 hover:to-gray-600">
              Follow
            </button>
          </div>
          <button
            onClick={() => setEditCard(!editCard)}
            className="text-gray-600"
          >
            <EditIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
