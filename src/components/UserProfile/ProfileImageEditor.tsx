//@ts-nocheck
'use client'

import { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { saveProfileImage } from "../../actions/Profile";
import axios from "axios";
import Image from "next/image";

const ProfileImageEditor = ({ setImgCard, imgCard }: any) => {
  const [image, setImage] = useState("");
  const [allowZoomOut, setAllowZoomOut] = useState(false);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [borderRadius, setBorderRadius] = useState(0);
  const [preview, setPreview] = useState(null);
  const [width, setWidth] = useState(250);
  const [height, setHeight] = useState(250);
  const [editor, setEditor] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile")!);

  const handlePositionChange = (position: any) => {
    setPosition(position);
  };

  const uploadToImgBB = async (imageData: any) => {
    try {
      const formData = new FormData();
      formData.append("image", imageData);
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=6658c40a365aea022ec363dd205f77f6",
        formData
      );
      console.log(res.data.data.url); // Log the URL to verify
      return res.data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error appropriately, e.g., show error message to user
      return null;
    }
  };

  const handleNewImage = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadToImgBB(file);
        if (imageUrl) {
          setImage(imageUrl);
          console.log("img:", imageUrl);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSave = () => {
    // const img = editor.getImageScaledToCanvas().toDataURL();
    const img = image;
    const rect = editor.getCroppingRect();
    setPreview({
      img,
      rect,
      scale: 1, // Example value, you can replace with state variables if needed
      width: "100px", // Example value, you can replace with state variables if needed
      height: 250, // Example value, you can replace with state variables if needed
      borderRadius: 0, // Example value, you can replace with state variables if needed
    });
  };

  const handleSaveImage = () => {
    // const img = editor.getImageScaledToCanvas().toDataURL();
    const img = image;
    dispatch<any>(saveProfileImage({ image: img, userId: user?.user?.userId, type:"updateProfileImage" }));
    setImgCard(false);
  };
  const handleScale = (e: any) => {
    setScale(parseFloat(e.target.value));
  };

  const rotateLeft = (e: any) => {
    e.preventDefault();
    setRotate(rotate - 90);
  };

  const rotateRight = (e: any) => {
    e.preventDefault();
    setRotate(rotate + 90);
  };

  const handleXPosition = (e: any) => {
    const x = parseFloat(e.target.value);
    setPosition({ ...position, x });
  };

  const handleYPosition = (e: any) => {
    const y = parseFloat(e.target.value);
    setPosition({ ...position, y });
  };

  const setEditorRef = (editor: any) => {
    setEditor(editor);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 overflow-hidden">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10 "></div>
      <div className="fixed top-[120px] sm:top-[50px] flex justify-between  items-center w-[90%] sm:w-[75%] lg:w-[50%] xl:w-[40%] p-4 px-8 rounded-tl-[10px] rounded-tr-[10px] border-b border-gray-300 bg-white opacity-100 z-30 ">
        <h3 className="text-[20px] font-semibold ">Edit Profile Image</h3>
        <button onClick={() => setImgCard(!imgCard)}>
          <CloseIcon />
        </button>
      </div>
      <div className="relative scroll-x flex items-center w-[90%] sm:w-[75%] lg:w-[50%] xl:w-[40%] h-[70%] sm:h-[75%]  p-4 justify-center px-8 border-b border-gray-300 bg-white  opacity-100 z-10 overflow-y-auto  scrollable-container overflow-x-hidden">
        <div className="flex flex-col ">
          <div className=" w-full flex items-center justify-center">

          <AvatarEditor
            className="border-[5px] flex border-dashed  max-w-[240px] max-h-[240px] sm:max-w-[280px] sm:max-h-[280px] lg:max-w-[350px] lg:max-h-[350px]"
            ref={setEditorRef}
            
            scale={parseFloat(scale)}
            width={width}
            height={height}
            border={50}
            color={[255, 255, 255]}
            position={position}
            onPositionChange={handlePositionChange}
            rotate={parseFloat(rotate)}
            borderRadius={150}
            image={image}
            />
            </div>
          <div className="flex flex-col gap-2 sm:flex-row mt-4">
            <input type="file" onChange={handleNewImage} />
            Zoom:{" "}
            <input
              name="scale"
              type="range"
              onChange={handleScale}
              min={allowZoomOut ? "0.1" : "1"}
              max="2"
              step="0.01"
              defaultValue="1"
              style={{ marginLeft: "10px" }}
              className="w-28"
            />
          </div>
          <div className="flex mt-4 gap-2 sm:justify-between items-center">
            <div>
              <input
                type="button"
                className="hidden sm:block"
                onClick={handleSave}
                value="Preview"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "background 0.3s ease",
                }}
              />
            </div>
            <div className="flex gap-2 items-center">
              Rotate:
              <button
                type="button"
                onClick={rotateLeft}
                className="w-[100px] h-[40px] bg-blue-500 rounded-[10px] text-white"
              >
                Left
              </button>
              <button
                onClick={rotateRight}
                className="w-[100px] h-[40px] bg-blue-500 rounded-[10px] text-white"
              >
                Right
              </button>
            </div>
          </div>
          {!!preview && (
            <Image
              src={preview.img}
              style={{
                borderRadius: `${
                  Math.min(preview.height, preview.width) +
                  10 * (preview.borderRadius / 2 / 100)
                }px`,
              }}
              alt="img"
            />
          )}
        </div>
      </div>
      <div className="fixed bottom-[120px] sm:bottom-[50px] flex justify-end w-[90%] sm:w-[75%] lg:w-[50%] xl:w-[40%] p-4 px-8 rounded-bl-[10px] rounded-br-[10px] border-t border-gray-300 bg-white opacity-100 z-30">
        <button
          className="w-[100px] h-[40px] rounded-[10px] bg-gradient-to-r from-[#434343] to-[#000000] text-[#FFFFFF]"
          onClick={handleSaveImage}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileImageEditor;
