//@ts-nocheck
'use client'
import React, { useState, useEffect } from "react";
import { NavbarComponent } from "../Navbar";
import Chattop from "../ChatModel/Chattop";
import { getarticle } from "@/actions/HomePage";
import * as api from "@/api/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReferSlides from "../ReferSlides";
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

interface RootState {
  trendingArticles: {
    trendingArticles: Record<string, TrendingArticlesState>;
    isLoading: boolean;
  };
}

interface TrendingArticlesState {
  isLoading: boolean;
  title: string;
  imgUrl: string;
  likes: {
    high: string;
    low: string;
  };
  views: {
    high: string;
    low: string;
  };
  appreciate: {
    high: string;
    low: string;
  };
  trendinessScore: string;
  tagId: string;
}

const Learn: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>("latest");
  const [chatText, setChatText] = useState<string>("");
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [openarticle, setOpenarticle] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [referarticles, setReferarticles] = useState<Article[]>([]);
  const [chunks, setChunks] = useState<Article[]>([]);
  const [content, setContent] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [refercount, setRefercount] = useState<number>(0);
  const [totalrefer, setTotalrefer] = useState<number>(100);
  const [totalarticle, setTotalarticle] = useState<number>(100);
  const [selectedOption, setSelectedOption] = useState<string>("article");

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

  const getreferArticle = async () => {
    try {
      const { data: first } = await api.getreferarticle(3 * currentPage - 2, 6);
      setReferarticles(first.articles);
      console.log(first.articles);
      // getArticle(20);
      if (refercount === 0) {
        setRefercount(Math.ceil(first.total / 30));
        console.log(first.total);
      }
      const { data: sec } = await api.getreferarticle(1.5 * currentPage, 12);
      console.log(sec.articles);
      setReferarticles([...first.articles, ...sec.articles]);
    } catch (err) {
      console.error(err);
    }
  };

  const getArticle = async () => {
    try {
      const { data: first } = await api.getAllarticle(3 * currentPage - 2, 6);
      console.log(first.articles);
      setArticles(first.articles);
      if (totalPages === 0) {
        setTotalPages(Math.ceil(first.total / 30));
      }
      const { data: sec } = await api.getAllarticle(1.5 * currentPage, 12);
      setArticles([...first.articles, ...sec.articles]);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    window.scrollTo({ top: 0, behavior: "auto" });
    setCurrentPage(page);

    console.log(page);
  };

  const handlepopup = () => {
    setOpenarticle(!openarticle);
  };

  useEffect(() => {
    if (selectedOption === "referarticle") {
      getreferArticle();
    } else {
      getArticle();
    }
  }, [currentPage, selectedOption]);

  useEffect(() => {
    // setChunks(
    //   chunkArray(
    //     selectedOption === "referarticle" ? referarticles : articles,
    //     3
    //   )
    // );
    selectedOption === "referarticle"
      ? setChunks(referarticles)
      : setChunks(articles);
  }, [articles, referarticles, selectedOption]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setCurrentPage(1); // Reset to first page on option change
  };

  return (
    <>
      <NavbarComponent />
      <div className="pt-5 flex p-auto ml-20 mr-20 ">
        <hr className="mt-5 max-sm:hidden bg-blue-600 h-px border-0 w-[10%]" />
        <div className="flex text-xl sm:text-3xl pl-4 pr-4">
          <div className="text-blue-600">Learn </div>
          <div className=" sm:text-3xl">
            <select
              className="text-xl sm:text-2xl text-[#f7990c] cursor-pointer"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="referarticle">Refer Articles</option>
              <option value="article">Articles</option>
            </select>
          </div>
        </div>
        <hr className="mt-5 bg-blue-600 h-px border-0 w-[80%]" />
      </div>

      <div className="mt-16 flex flex-wrap rounded-lg xm:pl-10 xm:pr-10 items-center justify-center lg:ml-20 lg:mr-20">
        {chunks.map((chunk, index) => (
          <ReferSlides
            chunk={chunk}
            key={index}
            handlepopup={handlepopup}
            selectedOption={selectedOption}
            content={content}
            setContent={setContent}
          />
        ))}
      </div>
      {openarticle && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90">
          <Topup
            handlepopup={handlepopup}
            setOpenarticle={setOpenarticle}
            openarticle={openarticle}
            content={content}
            setContent={setContent}
          />
        </div>
      )}
      {selectedOption === "referarticle" ? (
        <Pagination
          totalPages={refercount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      <Chattop
        text={chatText}
        setChatText={setChatText}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        articleTitle="Default Article Title"
      />
    </>
  );
};

export default Learn;
