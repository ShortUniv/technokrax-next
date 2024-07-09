'use client'

import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MyLearning:any = () => {
    const articles = [
        {
          id: 1,
          title: "The Importance of Artificial Intelligence in Modern Society",
          description: "Explore the significance of AI in today's world and its impact on various industries.",
          progress: 50,
          tags: ["AI", "Technology", "Society"],
          imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          url: "#"
        },
        {
          id: 2,
          title: "Machine Learning Fundamentals: A Beginner's Guide",
          description: "Learn the basics of machine learning and its applications in real-world scenarios.",
          progress: 25,
          tags: ["Machine Learning", "Data Science"],
          imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          url: "#"
        },
        {
          id: 3,
          title: "The Future of Work: How Automation is Changing Employment",
          description: "Discover the evolving landscape of work due to automation and the rise of AI-driven technologies.",
          progress: 75,
          tags: ["Automation", "Future", "Employment"],
          imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          url: "#"
        },
        {
            id: 4,
            title: "Deep Learning: A Comprehensive Guide",
            description: "Dive deep into the world of deep learning and explore its applications in various domains.",
            progress: 40,
            tags: ["Deep Learning", "Neural Networks"],
            imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            url: "#"
          },
          {
            id: 5,
            title: "Natural Language Processing Basics",
            description: "Learn the fundamentals of natural language processing and its importance in modern technology.",
            progress: 60,
            tags: ["NLP", "Machine Learning"],
            imageUrl: "https://images.unsplash.com/photo-1485796826113-174aa68fd81b?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            url: "#"
          },
          {
            id: 6,
            title: "Computer Vision: Introduction and Applications",
            description: "Discover the basics of computer vision and explore its wide range of applications in various industries.",
            progress: 80,
            tags: ["Computer Vision", "Image Processing"],
            imageUrl: "https://images.unsplash.com/photo-1455894127589-22f75500213a?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            url: "#"
          }
        
      ];
      const CustomPrevArrow = ({currentSlide,slideCount,...props}:any) => (
        <button {...props}>
          <ArrowBackIosNewIcon style={{ fontSize: "24px", color: "black" }} />{" "}
        </button>
      );
    
      const CustomNextArrow = ({currentSlide,slideCount,...props}:any) => (
        <button {...props}>
          <ArrowForwardIosIcon style={{ fontSize: "24px", color: "black" }} />{" "}
        </button>
      );
      const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3, 
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
          {
            breakpoint: 1280, 
            settings: {
              slidesToShow: 3, 
            },
          },
          {
            breakpoint: 768, 
            settings: {
              slidesToShow: 2, 
            },
          },
          {
            breakpoint: 640, 
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };

  return (

<>
    <div className="my-learning p-4 mt-16">
      <h2 className="text-3xl font-bold mb-4 font-alegreya">My Learning</h2>
      <Slider {...settings}>
        {articles.map((article) => (
          <div key={article.id} className="w-[434.34px] h-[424px] bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition-transform my-4 cursor-pointer">
            <Image src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover object-center" width='192'
            height='192'/>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{article.description}</p>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="h-2 w-20 bg-gray-200 rounded-full mr-2">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${article.progress}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{article.progress}% Complete</span>
                </div>
                <div>
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mr-2">{tag}</span>
                  ))}
                </div>
              </div>
              <a href={article.url} className="text-blue-500 hover:underline">Continue Reading</a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    <button
        className="flex justify-center mx-auto mt-10"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background 0.3s ease,",
          width: "200px",
          alignItems: "center",
        }}
      >
        View All
      </button>
    </>
  );
};

export default MyLearning;
