"use client";
import React, { useState, useEffect } from "react";
import { NavbarComponent } from "../Navbar";
import Chattop from "../ChatModel/Chattop";

import * as api from "@/api/index";
import Slides from "../Slides";
import Topup from "../Topup";
import Pagination from "../Pagination";
const chunkArray = (array: any, chunkSize: number) => {
  const chunks: any = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
interface Article {
  _id: string;
  articleType: string;
  datetime: string;
  image: string;
  link: string;
  source: string;
  time: string;
  title: string;
  __v: number;
}
const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("latest");
  const [chatText, setChatText] = useState<string>("");
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [openarticle, setOpenarticle] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [chunks, setChunks] = useState<Article[][]>([]);
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const categories: string[] = [
    "latest",
    "business",
    "sport",
    "technology",
    "entertainment",
    "science",
  ];

  const getCategoryClasses = (category: string): string => {
    const selectedClasses = "text-black underline";
    const defaultClasses = "text-gray-500";

    return category === selectedCategory ? selectedClasses : defaultClasses;
  };

  const getArticle = async () => {
    try {
      const { data } = await api.getArticleApi(`${selectedCategory}`);
      setArticles(data);
      console.log(data);
      setTotalPages(Math.ceil(data.length / 30));
      setChunks(
        chunkArray(data.slice((currentPage - 1) * 30, currentPage * 30), 3)
      );
      console.log("1.32323");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    window.scrollTo({ top: 0, behavior: "auto" });
    setCurrentPage(page);
    setChunks(chunkArray(articles.slice((page - 1) * 30, page * 30), 3));
    console.log(chunks);
    console.log(page);
  };

  const handlepopup = () => {
    setOpenarticle(!openarticle);
  };
  useEffect(() => {
    getArticle();
  }, [selectedCategory]);
  return (
    <>
      <NavbarComponent />
      <div className="pt-5 flex p-auto ml-20 mr-20">
        <hr className="mt-5 max-sm:hidden bg-blue-600 h-px border-0 w-[10%]" />
        <div className="text-xl sm:text-3xl pl-4 pr-4">NEWS</div>
        <hr className="mt-5 bg-blue-600 h-px border-0 w-[80%]" />
      </div>
      <div className="md:ml-40 md:mr-20 ml-20 mr-5">
        <div className="flex flex-wrap gap-x-12 gap-y-4 ">
          {categories.map((category) => (
            <button
              key={category}
              className={`text-xl cursor-pointer ${getCategoryClasses(
                category
              )}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.slice(0, 1).toUpperCase() +
                category.slice(1, category.length)}
            </button>
          ))}
        </div>
      </div>
      <div className=" mt-10 rounded-lg  ">
        {chunks &&
          chunks.map((chunk, index) => (
            <Slides
              chunk={chunk}
              key={index}
              handlepopup={handlepopup}
              content={content}
              setContent={setContent}
            />
          ))}
      </div>
      {openarticle && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 ">
          <Topup
            handlepopup={handlepopup}
            setOpenarticle={setOpenarticle}
            openarticle={openarticle}
            content={content}
            setContent={setContent}
          />
        </div>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Chattop
        text={chatText}
        setChatText={setChatText}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        articleTitle="Default Article Title" // Provide a default or dummy title
      />
    </>
  );
};

export default News;
