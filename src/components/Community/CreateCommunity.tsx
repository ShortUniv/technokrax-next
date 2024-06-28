"use client";
import React, { useState,useEffect, useRef } from "react";
import { NavbarComponent } from "../Navbar";
import Footer from "../Footer";
import communityImagePlaceHolder from "../../assets/communityImagePlaceHolder.png";
import Image from "next/image";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import { MuiChipsInput } from "mui-chips-input";
import { createCommunity } from "@/actions/Community";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { Category } from "@mui/icons-material";


const CreateCommunity = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [created,setIsCreated] = useState<any>(false)
  const [description, setDescription] = useState('');
 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [image, setImage] = useState<any>('');
  // const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState([]);
  const {community,error,isLoading} = useSelector((state:any) => state.communities)
  
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);

  useEffect(() => {
    // Clear form fields when `created` becomes true
    if (created) {
      setName('');
      setDescription('');
      setSelectedCategory('');
      setImage('');
      setTags([]);
    }
  }, [created]); 

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const uploadToImgBB = async (imageData: any) => {
    try {
      const formData = new FormData();
      formData.append("image", imageData);
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=6658c40a365aea022ec363dd205f77f6",
        formData
      );
      return res.data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleAdd = (tag: any) => {
    setTags(tag);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadToImgBB(file);
        if (imageUrl) {
          setImage(imageUrl);
          console.log("url:", imageUrl);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch<any>(createCommunity({
        name: name,
        description: description,
        createdBy: user?.user?.userId,
        tags: tags,
        communityImage: image,
        category: selectedCategory
      }, setIsCreated));
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };
     

  return (
    <>
      <NavbarComponent />
      <div className="mt-6 mx-[8%] ">
        <h1 className="font-semibold text-[40px] font-sans mb-6">
          Create New Community
        </h1>
        {!image ? (
          <div className="w-full border border-gray-200 rounded-lg h-[321.75px] flex justify-center items-center">
            <div className="flex flex-col items-center gap-3">
              <Image src={communityImagePlaceHolder} alt="image" />
              <button
                className="border border-gray-200 p-2 rounded-xl transition duration-300 ease-in-out transform hover:bg-gray-200 hover:scale-105"
                onClick={handleUploadClick}
              >
                Add Community Image
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="relative flex justify-center items-center w-full h-[321.75px] rounded-lg">
              <Image src={image} alt="" layout="fill" className="rounded-lg"/>

              <div className="p-2 rounded-lg bg-black  opacity-50 absolute right-50 top-42">
                <button className="text-[#FFFFFF]" onClick={handleUploadClick}>
                  Change Image
                </button>
              </div>
            </div>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-6">
          <div className="flex flex-col">
            <label
              htmlFor="communityName"
              className="text-[24px] font-semibold font-sans"
            >
              Community Name
            </label>
            <input
              type="text"
              name="communityName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Write a name"
              className="w-full border-b-2 border-gray-400 p-1 text-lg focus:outline-none focus:border-blue-200"
              required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-[24px] font-semibold font-sans"
            >
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Give it a description"
              className="w-full resize-none border-b-2 border-gray-400 p-1 text-lg focus:outline-none focus:border-blue-200"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-[24px] font-semibold font-sans"
            >
              Category
            </label>
            <Select
              size="small"
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <MenuItem value="Artificial Intelligence">
                Artificial Intelligence
              </MenuItem>
              <MenuItem value="Machine Learning">Machine Learning</MenuItem>
              <MenuItem value="Data Science">Data Science</MenuItem>
              <MenuItem value="DSA">DSA</MenuItem>
              <MenuItem value="Algorithms">Algorithms</MenuItem>
              <MenuItem value="Web Development">Web Development</MenuItem>
              <MenuItem value="Blockchain">Blockchain</MenuItem>
              <MenuItem value="Programming">Programming</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Software Development">
                Software Development
              </MenuItem>
              <MenuItem value="React">React</MenuItem>
              <MenuItem value="API">API</MenuItem>
              <MenuItem value="Database">Database</MenuItem>
              <MenuItem value="NLPs">NLPs</MenuItem>
              <MenuItem value="Deep Learning">Deep Learning</MenuItem>
              <MenuItem value="React Native">React Native</MenuItem>
              <MenuItem value="AI/ML">AI/ML</MenuItem>
              <MenuItem value="Javascript">Javascript</MenuItem>
              <MenuItem value="Coding">Coding</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
              <MenuItem value="Ethereum">Ethereum</MenuItem>
              <MenuItem value="Solana">Solana</MenuItem>
              <MenuItem value="Bitcoin">Bitcoin</MenuItem>
              <MenuItem value="Smart Contracts">Smart Contracts</MenuItem>
              Select Category
            </Select>

            <div className="flex flex-col mt-4">
            <p className="text-[16px] text-[#000000AD] ">
          Add tags to let people know what your community is about.
        </p>
            <MuiChipsInput
            style={{ margin: "10px 0", }}
            value={tags}
            onChange={handleAdd}
            size="small"
            placeholder="Add tags..."
            // label="Add Tags"
            // variant="outlined"
            />
            </div>
          </div>
          <div className="flex justify-center my-16">
            <button
              type="submit"
              className="bg-[#1D2BCA] w-[115px] py-2 text-white rounded-3xl flex items-center justify-center  transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span className="ml-2">Creating...</span>
                </>
              ) : created ? (
                <>
                  <CheckCircleIcon />
                  <span className="ml-2">Created</span>
                </>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateCommunity;
