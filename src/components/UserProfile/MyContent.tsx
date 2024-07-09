
'use client'
import { useState } from "react";
import { PlayCircleOutline, ThumbUpAlt, Chat, Visibility } from "@mui/icons-material";
import Image from "next/image";
import { useSelector } from "react-redux";
import moment from "moment";
import { truncateText } from "@/utils/helperFunction";
import { useRouter } from "next/navigation";




const Articles = () => {
  const { profile } = useSelector((state:any) => state.profile);
const router = useRouter();
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {profile?.creation?.articles.map((article:any) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

const ArticleCard = ({ article }:any) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transform transition-transform cursor-pointer">
    <div className="relative h-60">
      <Image
        src={article.selectedFile}
        alt={article.title}
        layout="fill"
        objectFit="cover"
        className="object-center"
      />
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
      <p className="text-gray-600 mb-4">{truncateText(article.description,150)}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{moment(article.date).format("MMMM D, YYYY")}</p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Visibility className="text-gray-500" />
            <span className="text-sm text-gray-500">{article.views.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ThumbUpAlt className="text-gray-500" />
            <span className="text-sm text-gray-500">{article.likes.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Chat className="text-gray-500" />
            <span className="text-sm text-gray-500">{article.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Videos = () => {
  const { profile } = useSelector((state:any) => state.profile);
  const videos = profile?.creation?.videos || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video:any) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

const VideoCard = ({ video }:any) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    <div className="relative h-80">
      <Image
        src={video.thumbnailUrl}
        alt={video.title}
        layout="fill"
        objectFit="cover"
        className="object-center"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity opacity-0 hover:opacity-100">
        <PlayCircleOutline className="text-white h-16 mb-28" style={{ fontSize: "50px" }} />
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
      <p className="text-gray-600 mb-4">{video.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">{video.duration}</span>
          <Visibility className="text-gray-500" />
          <span className="text-sm text-gray-500">{video.views}</span>
        </div>
        <ThumbUpAlt className="text-gray-500" />
        <span className="text-sm text-gray-500">{video.likes}</span>
      </div>
    </div>
  </div>
);

const News = () => {
  const { profile } = useSelector((state:any) => state.profile);
  const newsData = profile?.creation?.news || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {newsData.map((data:any, index:any) => (
        <NewsCard key={index} data={data} />
      ))}
    </div>
  );
};

const NewsCard = ({ data }:any) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    <Image
      src={data.imageUrl}
      alt={data.title}
      width={600}
      height={400}
      className="object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
      <p className="text-gray-600 mb-4">{data.description}</p>
      <div className="flex justify-between items-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {data.category}
        </span>
      </div>
    </div>
  </div>
);

const MyContent = () => {
  const [active, setActive] = useState("articles");
  const { profile } = useSelector((state:any) => state.profile);

  const ContentMessage = ({ contentType, createLink }:any) => (
    <div className="flex items-center justify-center h-60">
      <div className="text-center">
        <p className="text-lg text-gray-500 mb-4">
          {`You have not created any ${contentType}. Click `}
          <a href={createLink} className="text-blue-500 hover:underline">here</a>
          {` to create one.`}
        </p>
      </div>
    </div>
  );

  return (
    <div className="mt-16 p-4">
      <h2 className="text-3xl font-bold mb-8">My Posts</h2>
      <div className="flex gap-8">
        <h3
          className={`cursor-pointer text-lg font-semibold ${active === "articles" ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
          onClick={() => setActive("articles")}
        >
          Articles
        </h3>
        <h3
          className={`cursor-pointer text-lg font-semibold ${active === "videos" ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
          onClick={() => setActive("videos")}
        >
          Videos
        </h3>
        <h3
          className={`cursor-pointer text-lg font-semibold ${active === "news" ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
          onClick={() => setActive("news")}
        >
          News
        </h3>
      </div>
      <div className="mt-8">
        {active === "articles" && (profile?.creation?.articles.length !== 0 ? <Articles /> : <ContentMessage contentType="articles" createLink="/write"/>)}
        {active === "videos" && (profile?.creation?.videos.length !== 0 ? <Videos /> : <ContentMessage contentType="videos" createLink="/write"/>)}
        {active === "news" && (profile?.creation?.news.length !== 0 ? <News /> : <ContentMessage contentType="news" createLink="/write"/>)}
      </div>
    </div>
  );
};

export default MyContent;
