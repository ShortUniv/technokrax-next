'use client'
import React, { useState, useRef, useEffect } from "react";
import { MuiChipsInput } from "mui-chips-input";
import { MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { NavbarComponent } from "./Navbar";
import { referArticle } from "../actions/HomePage";

const Refer = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<any>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState<any>("");
  const [link, setLink] = useState<any>("");
  const [subtext, setSubtext] = useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);
  const [errors, setErrors] = useState("");
  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };
  const handleLinkChange = (event: any) => {
    setLink(event.target.value);
  };

  const handleSubTextChange = (event: any) => {
    setSubtext(event.target.value);
  };
  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };
  const handleAdd = (tag: any) => {
    setTags(tag);
  };
  const clear = () => {
    setTitle("");
    setSubtext("");
    setLink("");
    setImage("");
    setTags([]);
    setSelectedCategory("");
    setErrors("");
  };

  const generateTagId = (title: any) => {
    const formattedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const timestamp = Date.now().toString(36);
    const randomChars = Math.random().toString(36).substring(2, 10);

    return `${formattedTitle}-${timestamp}-${randomChars}`;
  };
  const tagId = generateTagId(title);

  const handlePublish = async () => {
    const contentType = "referArticle";
    console.log("referTag:", tagId);
    const formData = {
      tagId: tagId,
      title: title,
      description: subtext,
      link: link,
      category: selectedCategory,
      contentType: contentType,
      name: user?.user?.name,
      createdBy: user?.user?.userId,
      tags: tags,
      selectedFile: image,
    };

    if (!title) {
      setErrors("Please fill title.");
      setTimeout(() => {
        setErrors("");
      }, 1000);
      return;
    }
    if (!subtext) {
      setErrors("Please fill Sub-title.");
      setTimeout(() => {
        setErrors("");
      }, 1000);
      return;
    }
    if (!link) {
      setErrors("Please add Refer Link.");
      setTimeout(() => {
        setErrors("");
      }, 1000);
      return;
    }

    dispatch<any>(referArticle({ ...formData, type: "publish" }));
    clear();
  };
  const handleDraft = async () => {
    const contentType = "article";
    const formData = {
      tagId: tagId,
      title: title,
      description: subtext,
      link: link,
      category: selectedCategory,
      contentType: contentType,
      name: user?.user?.name,
      createdBy: user?.user?.userId,
      tags: tags,
      selectedFile: image,
    };
    if (!title && !subtext && !link && !image) {
      setErrors("All Fields Are Empty.");
      setTimeout(() => {
        setErrors("");
      }, 1000);
      return;
    }
    dispatch<any>(referArticle({ ...formData, type: "draft" }));
  };
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col lg:flex-row  lg:max-xl:gap-0 justify-center xl:gap-20 mx-auto">
        <div className="flex flex-col gap-6 my-20 mx-auto w-[330px] sm:w-[440px]">
          <h1 className="text-4xl font-medium text-[#000000]">Refer Article</h1>
          <input
            type="text"
            className=" focus:outline-none sm:text-3xl border-b-[2px] mt-4  font-semibold"
            placeholder="Write a title here"
            value={title}
            onChange={handleTitleChange}
          />

          <textarea
            className=" focus:outline-none border-b-[2px] max-w-[440px] flex-wrap resize-none text-[#0000008A]"
            placeholder="Write a sub-title here"
            value={subtext}
            onChange={handleSubTextChange}
          />

          <div
            className="flex justify-center items-center flex-col w-[330px] h-[150px] sm:w-[440px] sm:h-[200px] bg-[rgba(0,0,0,0.05)] relative"
            aria-placeholder="Preview Image"
          >
            {image ? (
              <>
                <img src={image} alt="" className="w-[440px] h-[200px]" />
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="p-2 rounded-lg bg-black opacity-50">
                    <button
                      className="text-white"
                      onClick={handleUploadClick}
                    >
                      Change Preview Image
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div
                className="flex justify-center items-center w-full h-full"
                onClick={handleUploadClick}
              >
                <button className="text-sm border-2 border-black rounded-full px-6 py-2 shadow-md hover:shadow-lg hover:bg-black hover:text-white transition-all duration-300">
                  Add Image
                </button>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <input
            type="text"
            className=" focus:outline-none border-b-[2px] mt-4  font-semibold"
            placeholder="Refer Link"
            value={link}
            onChange={handleLinkChange}
          />

          <a
            className="text-blue-600 font-normal underline  underline-offset-1 "
            href={link}
            target="_blank"
          >
            {link}
          </a>
        </div>
        <div className="flex flex-col gap-6 my-2 lg:my-32 mx-auto w-[330px] sm:w-[440px]">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="category-select"
              className="text-sm text-[#0000008A]"
            >
              Select Category
            </label>
            <Select
              size="small"
              value={selectedCategory}
              onChange={handleCategoryChange}
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
              <MenuItem value="Etherium">Etherium</MenuItem>
              <MenuItem value="Solana">Solana</MenuItem>
              <MenuItem value="Bitcoin">Bitcoin</MenuItem>
              <MenuItem value="Smart Contracts">Smart Contracts</MenuItem>
              Select Category
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[16px] text-[#000000E6]">
              Add or change topics (up to 5) so readers know what your article
              is about
            </p>
            <MuiChipsInput
              style={{ margin: "10px 0" }}
              value={tags}
              onChange={handleAdd}
              size="small"
              placeholder="Add tags..."
            />
          </div>
          <p className="text-[16px] text-[#000000AD]">
            Learn more about what happens to your post when you publish.
          </p>
          <p className="text-red-500 h-4">{errors}</p>
          <div className="flex gap-6">
            <button
              className="text-[16px] text-[#FFFFFF] px-3 py-2  rounded-3xl w-[100px] bg-blue-600 hover:bg-blue-800"
              onClick={handlePublish}
            >
              Publish
            </button>
            <button
              className="text-blue-600 text-lg hover:text-blue-800 "
              onClick={handleDraft}
            >
              save as draft
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Refer;
