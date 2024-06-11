import { useState } from "react";
import { PlayCircleOutline } from "@mui/icons-material"; 
import Image from "next/image";


const Articles = () => {
  const articles = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence",
      description:
        "Explore the latest advancements and future prospects of AI technology.",
      imageUrl: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "April 1, 2024",
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      title: "Introduction to Machine Learning Algorithms",
      description:
        "Learn about the fundamental algorithms used in machine learning and their applications.",
      imageUrl: "https://images.unsplash.com/photo-1611117775350-ac3950990985?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "March 25, 2024",
      likes: 18,
      comments: 3,
    },
    {
      id: 3,
      title: "Data Science for Beginners",
      description:
        "Get started with data science and learn essential concepts, tools, and techniques.",
      imageUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "March 18, 2024",
      likes: 32,
      comments: 7,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div
          key={article.id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <Image
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 object-cover object-center"
            width='192'
            height='192'
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{article.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{article.date}</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {article.likes} Likes
                </span>
                <span className="text-sm text-gray-500">
                  {article.comments} Comments
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Videos = () => {
  const videos = [
    {
      id: 1,
      title: "Introduction to Neural Networks",
      description:
        "Learn the basics of neural networks and how they simulate the human brain.",
      thumbnailUrl: "https://plus.unsplash.com/premium_photo-1678834890201-47674c716347?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      duration: "10:35",
      views: 1234,
      likes: 56,
    },
    {
      id: 2,
      title: "Advanced Machine Learning Techniques",
      description:
        "Explore advanced techniques in machine learning, including deep learning and reinforcement learning.",
      thumbnailUrl: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      duration: "15:20",
      views: 2100,
      likes: 87,
    },
    {
      id: 3,
      title: "Data Visualization with Python",
      description:
        "Learn how to create stunning visualizations of your data using Python libraries like Matplotlib and Seaborn.",
      thumbnailUrl: "https://plus.unsplash.com/premium_photo-1682126325927-0e6399d5d170?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      duration: "12:45",
      views: 1500,
      likes: 72,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className="relative bg-white shadow-md rounded-lg overflow-hidden"
        >
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            width={192}
            height={192}
            className="w-full h-48 object-cover object-center"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircleOutline
              className="text-white h-16 mb-28"
              style={{ fontSize: "50px" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{video.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{video.duration}</span>
                <span className="text-sm text-gray-500">
                  {video.views} Views
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {video.likes} Likes
                </span>
                <button className="text-blue-500 hover:text-blue-700 focus:outline-none focus:text-blue-700 cursor-pointer transition-colors duration-200">
                  Watch now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const News = () => {
  const newsData = [
    {
      title: "Example News 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1661584163462-b226cd58ae2e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Technology",
    },
    {
      title: "Example News 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Science",
    },
    {
      title: "Example News 3",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1689701711439-e54f039f8d97?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Health",
    },
  ];
  return (
    <>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {newsData.map((data,index:number) => (
          <div key={index}className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
            <img
              className="w-full h-48 object-cover object-center"
              src={data.imageUrl}
              alt={data.title}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{data.title}</div>
              <p className="text-gray-700 text-base">{data.description}</p>
            </div>
            <div className="px-6 py-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {data.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const MyContent = () => {
  const [active, setActive] = useState<any>("articles");

  return (
    <div className="mt-16 p-4 flex flex-col gap-8 mb-28">
      <h2 className="text-3xl font-alegreya font-bold">My Posts</h2>
      <div className="flex gap-16 sm:gap-24 xs:gap-10">
        <h3
          className={`font-alegreya text-[23px] font-medium cursor-pointer ${active === "articles" ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
          onClick={() => setActive("articles")}
        >
          Articles
        </h3>

        <h3
          className={`font-alegreya text-[23px] font-medium cursor-pointer ${active === "videos" ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
          onClick={() => setActive("videos")}
        >
          Videos
        </h3>

        <h3
          className={`font-alegreya text-[23px] font-medium cursor-pointer ${active === "news" ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
          onClick={() => setActive("news")}
        >
          News
        </h3>
      </div>
      <div>
        {active === "articles" ? (
          <Articles />
        ) : active === "videos" ? (
          <Videos />
        ) : active === "news" ? (
          <News />
        ) : (
          <div>{/* Default component when none of the tabs are active */}</div>
        )}
      </div>
    </div>
  );
};

export default MyContent;
