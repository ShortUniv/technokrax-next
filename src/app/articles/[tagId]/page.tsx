import React from "react";
import { Metadata } from "next";
import ArticleDetails from "@/components/ArticleDetails";
import { getArticleById } from "@/actions/HomePage";
import { cookies } from "next/headers";


export const generateMetadata = async ({ params }: any) => {
  const { tagId } = params;
  const cookieStore = cookies();
  const userTokenCookie = cookieStore.get("userToken");
  let userId = null;
  if (userTokenCookie) {
    try {
      const userTokenValue = JSON.parse(userTokenCookie.value);
      userId = userTokenValue.user?.userId || null;
    } catch (e) {
      console.error("Error parsing user token cookie:", e);
    }
  }
  const article = await getArticleById(tagId, userId);

  const metadata: Metadata = {
    title: article?.article?.title,
    description: article?.article?.description,
    openGraph: {
      title: article?.article?.title,
      description: article?.article?.description,
      url: `https://technokrax.com/articles/${article?.article?.tagId}`,
      images: [
        {
          url: article?.article?.selectedFile,
          width: 1200,
          height: 675,
        },
      ],
      type: "article",
    },
  };

  return metadata;
};

const ArticleDetailsPage = () => {
  return <ArticleDetails />;
};

export default ArticleDetailsPage;
