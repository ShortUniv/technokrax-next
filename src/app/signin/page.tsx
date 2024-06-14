import SignIn from "@/components/Auth/SignIn";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - Technokrax',
  description: "Sign in to your Technokrax account to access personalized learning experiences and AI-driven educational content.",
  openGraph: {
    title: 'Sign In - Technokrax',
    description: "Sign in to your Technokrax account to access personalized learning experiences and AI-driven educational content.",
    images: [
      {
        url: "https://i.postimg.cc/hjqL2PPn/Logo.png",
        width: 800,
        height: 600,
        alt: 'Technokrax Sign In',
      },
    ],
    type: 'website',
    url: 'https://technokrax.com/signin',
    siteName: 'Technokrax'
  },
};

const SignInPage = () => {
  return(
    <>
    <SignIn />
    </>
  )
}

export default SignInPage