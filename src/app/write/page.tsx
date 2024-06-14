
import Document from "@/components/WriteArticle/WriteArticle";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Write an Article - Technokrax',
  description: "Create and share your own articles on Technokrax. Share your knowledge and insights with a community of learners.",
  openGraph: {
    title: 'Write an Article - Technokrax',
    description: "Create and share your own articles on Technokrax. Share your knowledge and insights with a community of learners.",
    images: [
      {
        url: "https://i.ibb.co/Pmm6Mkx/Header-Logo.png",
        width: 800,
        height: 600,
        alt: 'Technokrax Writing',
      },
    ],
    type: 'website',
    url: 'https://technokrax.com/write',
    siteName: 'Technokrax'
  },
};

const WriteArticlePage = () => {
  return (
    <>
      <Document />
    </>
  );
};

export default WriteArticlePage;
