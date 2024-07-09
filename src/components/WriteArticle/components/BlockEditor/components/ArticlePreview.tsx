//@ts-nocheck

import React, { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { MuiChipsInput } from "mui-chips-input";
import { MenuItem, Select } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { createArticle } from "@/actions/HomePage";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ArticlePreview = ({ publish, setPublish }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [image, setImage] = useState<any>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState<any>("");
  const [subtext, setSubtext] = useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const user = JSON.parse(localStorage.getItem("profile")!);

  useEffect(() => {
    const content = editor?.getHTML();

    if (content) {
      // Parse the HTML content to extract the first node
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      // const firstNode = doc.body.firstChild;
      const firstImage = doc.body.querySelector("img");
      const firstH1 = doc.body.querySelector("h1");
      if (firstH1) {
        setTitle(firstH1.textContent);
        const remainingContent = firstH1.nextSibling?.textContent || "";
        const trimmedContent = remainingContent.trim();
        const subtextLength = Math.min(trimmedContent.length, 140);
        const newSubtext = trimmedContent.slice(0, subtextLength);
        setSubtext(newSubtext + "....");
      } else {
        const fullText = doc.body.textContent || "";
        const trimmedContent = fullText.trim();
        const subtextLength = Math.min(trimmedContent.length, 140);
        const newSubtext = trimmedContent.slice(0, subtextLength);
        setSubtext(newSubtext);
      }

      if (firstImage) {
        const imageUrl = firstImage.src;
        setImage(imageUrl);
        firstImage?.parentNode?.removeChild(firstImage);
      }
    }
  }, []);

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
          // Update your articleData with the imageUrl
          setImage(imageUrl);
          console.log("url:", imageUrl); // Log the imageUrl to verify
        }
      } catch (error) {
        // Handle error appropriately, e.g., show error message to user
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleAdd = (tag: any) => {
    setTags(tag);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleSubTextChange = (event: any) => {
    setSubtext(event.target.value);
  };

  function calculateReadingTime(content: any) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    return readingTimeMinutes;
  }
  const estimatedReadingTime = calculateReadingTime(editor?.getHTML());
  const readingTime = `${estimatedReadingTime}min${estimatedReadingTime !== 1 ? "s" : ""}`;

  const clear = () => {
    setTitle("");
    setSubtext("");
    setImage("");
    setTags([]);
    setSelectedCategory("");
  };

  // const generateTagId = () => {
  //   const type = "articles";
  //   const category = selectedCategory;
  //       const duration = readingTime;
  //   const formattedDate = new Date()
  //     .toISOString()
  //     .slice(0, 10)
  //     .replace(/-/g, "");
  //   const uniqueNumber = uuidv4();

  //   return `${type}-${category}-${duration}-${formattedDate}-${uniqueNumber}`;
  // };

  const generateTagId = (title) => {
    const formattedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
      const timestamp = Date.now().toString(36);
      const randomChars = Math.random().toString(36).substring(2, 10);

    return `${formattedTitle}-${timestamp}-${randomChars}`;
  };

  const tagId = generateTagId(title);

  const handlePublish = () => {
    const content = editor?.getHTML();

    const contentType = "article";

    dispatch<any>(
      createArticle(
        {
          content: content,
          tagId: tagId,
          title: title,
          description: subtext,
          duration: readingTime,
          category: selectedCategory,
          contentType: contentType,
          name: user?.user?.name,
          createdBy: user?.user?.userId,
          tags: tags,
          selectedFile: image,
        },
        router
      )
    );
    clear();
  };
  return (
    <div className="flex flex-col lg:flex-row  lg:max-xl:gap-0 justify-center xl:gap-20 mx-auto">
      <div className="flex flex-col gap-6 my-20 mx-auto xs:w-[280px] w-[330px] sm:w-[440px]">
        <h3 className="text-[19px] font-medium text-[#000000C2]">
          Content Preview
        </h3>
        <div
          className=" flex  flex-col xs:w-[290px]  w-[330px] h-[150px] sm:w-[440px] sm:h-[200px] bg-[rgba(0,0,0,0.05)] relative  justify-center items-center"
          aria-placeholder="Preview Image"
        >
          {image ? (
            <>
              <Image
                src={image}
                alt=""
                className="relative w-[440px] h-[200px]"
                width={440}
                height={200}
              />
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
            <div>
              <p className="text-[14px] text-[rgba(0,0,0,0.50)] text-center flex-wrap flex justify-center align-center pt-6 sm:pt-14 mx-auto">
                Include a high-quality image in your article <br />
                to make it more inviting to readers.
              </p>
              <div className="flex gap-1 text-center  w-[150px] mx-auto p-2 bg-[rgba(0,0,0,0.30)] rounded-md mt-4 cursor-pointer ">
                <FileUploadIcon />
                <p onClick={handleUploadClick} className="text-nowrap">
                  Upload Image
                </p>
              </div>
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
          placeholder="Write a title here"
          value={title}
          onChange={handleTitleChange}
        />

        <textarea
          // rows={3}
          className=" focus:outline-none border-b-[2px] max-w-[440px] flex-wrap resize-none text-[#0000008A]"
          placeholder="Write a sub-title here"
          value={subtext}
          style={{}}
          onChange={handleSubTextChange}
        />

        <p className="text-[16px] text-[#0000008A]">
          <span>Note: </span>Changes here will affect how your article appears
          in public <br />
          places like Technokrax’s homepage and in subscribers’ inboxes — not
          the <br />
          contents of the article itself.
        </p>
      </div>
      <div className="flex flex-col gap-6 my-2 lg:my-32 mx-auto xs:w-[280px] w-[330px] sm:w-[440px]">
        <h3 className="text-[19px] text-[#000000C2]">
          Publishing to: <span className="font-medium">{user?.user?.name}</span>
        </h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="category-select" className="text-sm text-[#0000008A]">
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
            Add or change topics (up to 5) so readers know what your article is
            about
          </p>
          <MuiChipsInput
            style={{ margin: "10px 0" }}
            value={tags}
            onChange={handleAdd}
            size="small"
            placeholder="Add tags..."
            // label="Add Tags"
            // variant="outlined"
          />
        </div>
        <p className="text-[16px] text-[#000000AD]">
          Learn more about what happens to your post when you publish.
        </p>
        <button
          className="text-[16px] text-[#FFFFFF] px-3 py-2  rounded-3xl w-[100px] bg-[#1A8917] hover:bg-green-800"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
      <button
        onClick={() => setPublish(!publish)}
        className="absolute right-10 sm:right-28 top-32 hover:bg-[rgba(0,0,0,0.05)] rounded-full p-2"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default ArticlePreview;
