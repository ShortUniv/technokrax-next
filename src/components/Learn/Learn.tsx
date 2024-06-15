'use client'
import React, { useState, useEffect } from "react";
import { NavbarComponent } from "../Navbar";
import Chattop from "../ChatModel/Chattop";
import * as api from "@/api/index";
import { useDispatch } from "react-redux";
import ReferSlides from "../ReferSlides"
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
  const [articles, setArticles] = useState([]);
  const [totalarticles, setTotalarticles] = useState([]);
  const [referarticles, setReferarticles] = useState<Article[]>([]);
  const [chunks, setChunks] = useState<Article[][]>([]);
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [refercount, setRefercount] = useState<number>(0);
  const [totalrefer, setTotalrefer] = useState<number>(100);
  const [totalarticle, setTotalarticle] = useState<number>(100);
  
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
//console.log(refercount)
  const getreferArticle = async () => {
    if(currentPage*10<refercount || refercount==0){
    try {
      const { data } = await api.getreferarticle(currentPage,10);
      setReferarticles(data.articles);
      //console.log(data);
      getArticle(20)
      if(refercount===0){setRefercount(Math.ceil(data.total / 30));}
     //console.log(refercount)
      //console.log(data);
    } catch (err) {
      //console.log(err);
    }}
    else{
      setReferarticles([])
      getArticle(30);
    }
  };
  //console.log(totalPages);
  const getArticle = async (limit:number) => {
    try {
      const { data } = await api.getAllarticle(currentPage,limit);
      setArticles(data.articles);
      console.log(data);
      // if(refercount===0)
      setTotalPages(Math.ceil(data.total / 30));
      
      //console.log("1.32323");
      //console.log(data);
    } catch (err) {
      //console.log(err);
    }
  };
//console.log(articles)
//console.log(referarticles)
  // const getArticle = async () => {
  //   dispatch<any>(getarticle(selectedCategory));
  // };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    window.scrollTo({ top: 0, behavior: "auto" });
    setCurrentPage(page);
    //setChunks(chunkArray(articles.slice((page - 1) * 30, page * 30), 3));
    //console.log(chunks);
    //console.log(page);
  };

  const handlepopup = () => {
    setOpenarticle(!openarticle);
  };
  useEffect(() => {
    getreferArticle();

  }, [currentPage]);
  useEffect(() => {
    
    setChunks(
      chunkArray(totalarticles.slice(0,  30), 3)
    );
  }, [totalarticles]);
  function shuffleArray(array:any) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
useEffect(()=>{
  if(articles && referarticles)
  setTotalarticles(shuffleArray([...articles,...referarticles]));
console.log("totalPages:"+totalPages);
console.log("refercount:"+refercount);
  setTotalPages(totalPages+refercount  )
},[articles])
//console.log(totalarticles)
//console.log(chunks)
console.log(openarticle)
  return (
    <>
      <NavbarComponent />
      <div className="pt-5 flex p-auto ml-20 mr-20">
        <hr className="mt-5 max-sm:hidden bg-blue-600 h-px border-0 w-[10%]" />
        <div className="text-xl sm:text-3xl pl-4 pr-4">LEARN</div>
        <hr className="mt-5 bg-blue-600 h-px border-0 w-[80%]" />
      </div>

      <div className=" mt-10 rounded-lg  ">
        {chunks &&
          chunks.map((chunk, index) => (
            <ReferSlides
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

export default Learn;
