import SignUp from "@/components/Auth/SignUp";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Technokrax',
  description: "Create your Technokrax account to access personalized learning experiences and AI-driven educational content.",
  openGraph: {
    title: 'Sign Up - Technokrax',
    description: "Create your Technokrax account to access personalized learning experiences and AI-driven educational content.",
    images: [
      {
        url: "https://i.ibb.co/Pmm6Mkx/Header-Logo.png",
        width: 800,
        height: 600,
        alt: 'Technokrax Sign Up',
      },
    ],
    type: 'website',
    url: 'https://technokrax.com/signup',
    siteName: 'Technokrax'
  },
};

const SignUpPage = () => {
  return (
    <>
      <SignUp />
    </>
  );
};

export default SignUpPage;
