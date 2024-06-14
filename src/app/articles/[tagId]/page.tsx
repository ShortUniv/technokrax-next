
// import React from 'react';
// import { Metadata } from 'next';
// import ArticleDetails from '@/components/ArticleDetails';
// import { getArticleById } from '@/actions/HomePage';
// import getUserId from '@/utils/helperFunction';
// import { parseCookies } from 'nookies';

// import { cookies } from 'next/headers';
// type ArticleDetailsPageProps = {
//   params: {
//     tagId: string;
//   };
// };

// export const generateMetadata = async ({ params }: ArticleDetailsPageProps): Promise<Metadata> => {
//   const { tagId } = params;

//   const cookieStore = cookies();
//   const userTokenCookie = cookieStore.get('userToken');
//   let userId = null;
//   if (userTokenCookie) {
//     try {
//       const userTokenValue = JSON.parse(userTokenCookie.value);
//       userId = userTokenValue.user?.userId || null;
//       } catch (e) {
//         console.error('Error parsing user token cookie:', e);
//         }
//         }
        
//         console.log(tagId);
//         console.log(userId);
//         const article = await getArticleById(tagId,userId);
//          console.log(article)
  

//   const metadata: Metadata = {
//      title: article?.article?.title,
//     description: article?.article?.description,
//     openGraph:{
//       title: article?.article?.title,
//       description: article?.article?.description,
//       url: `https://technokrax.com/articles/${article?.article?.tagId}`,
//       images: [
//         {
//           url: article?.article?.selectedFile,
//           width: 1200,
//           height:675,
//         }
//       ],
//       type: "article",
      

//     }
    
//   };

//   return metadata;
// };



// const ArticleDetailsPage = async ({ params }: ArticleDetailsPageProps) => {
//   const { tagId } = params;
//   console.log(tagId)


//   return (
//     <ArticleDetails  article={article}/>
//   );
// };

// export default ArticleDetailsPage;


import React from 'react';
import { Metadata } from 'next';
import ArticleDetails from '@/components/ArticleDetails';
import { getArticleById } from '@/actions/HomePage';
import { cookies } from 'next/headers';

type ArticleDetailsPageProps = {
  params: {
    tagId: string;
  };
  article: any; // Adjust the type according to your article structure
};

export  const generateMetadata = async ({params}: ArticleDetailsPageProps) => {
  const { tagId } = params;
  const cookieStore = cookies();
  const userTokenCookie = cookieStore.get('userToken');
  let userId = null;
  if (userTokenCookie) {
    try {
      const userTokenValue = JSON.parse(userTokenCookie.value);
      userId = userTokenValue.user?.userId || null;
      } catch (e) {
        console.error('Error parsing user token cookie:', e); 
        }
        }
      const article = await getArticleById(tagId,userId);
    
  
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
      type: 'article',
    },
  };

  return metadata;
};

const ArticleDetailsPage = async ({ params }: ArticleDetailsPageProps) => {
  const { tagId } = params;
  const cookieStore = cookies();
  const userTokenCookie = cookieStore.get('userToken');
  let userId = null;
  if (userTokenCookie) {
    try {
      const userTokenValue = JSON.parse(userTokenCookie.value);
      userId = userTokenValue.user?.userId || null;
    } catch (e) {
      console.error('Error parsing user token cookie:', e); 
    }
  }
    
  console.log(tagId)
  console.log(userId);
  const article = await getArticleById(tagId, userId);
  console.log(article);

  // generateMetadata(article)

  return <ArticleDetails  />;
};

export default ArticleDetailsPage;
