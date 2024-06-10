
import React from 'react';
import { Metadata } from 'next';
import ArticleDetails from '@/components/ArticleDetails';
import { getArticleById } from '@/actions/HomePage';

type ArticleDetailsPageProps = {
  params: {
    tagId: string;
  };
};

export const generateMetadata = async ({ params }: ArticleDetailsPageProps): Promise<Metadata> => {
  const { tagId } = params;
  const article = await getArticleById(tagId, '1234');

  const metadata: Metadata = {
     title: article?.article?.title,
    description: article?.article?.description,
    openGraph:{
      title: article?.article?.title,
      description: article?.article?.description,
      url: `https://technokrax.com/articles/${article?.article?.tagId}`,
      images: [
        {
          url: article?.article?.selectedFile,
          width: 1200,
          height:675,
        }
      ],
      type: "article",
      

    }
    
  };

  return metadata;
};

const ArticleDetailsPage = async ({ params }: ArticleDetailsPageProps) => {
  const { tagId } = params;
  const article = await getArticleById(tagId, '1234');
  console.log(tagId)

  return (
    <ArticleDetails  article={article}/>
  );
};

export default ArticleDetailsPage;
