'use client'
import { useState } from "react";
import {Helmet }from "react-helmet";
import Logo from "../../assets/HeaderLogo.png";
import { Checkbox } from "@mui/material";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import  Link  from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { sendOtp, setSignUpData } from "../../actions/Auth";
import Input from "@/components/Input";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const initialState: FormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialState);
  const dispatch = useDispatch();
const router = useRouter();
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // dispatch<any>(signup(formData,navigate))
    dispatch<any>(setSignUpData(formData));
    dispatch<any>(sendOtp({ email: formData.email }, router));
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
        handleSubmit(e);
    }
};

  return (
    <>
    <Helmet>
    <title>Sign Up - TechnoKrax</title>
    <meta
      name="description"
      content="Adventure starts here - Make your learing journey easy and fun!"
    />
  </Helmet>
    <div className="flex">
      <div className="w-[50%] h-[100vh] p-[6rem] bg-[#F5F5F9] hidden lg:block">
        <img
          src="https://demos.themeselection.com/sneat-mui-react-nextjs-admin-template/demo-1/images/pages/girl-with-laptop-light.png"
          alt=""
        />
      </div>
      <div className="mx-auto mt-[3rem]  w-[80%] sm:w-[60%] lg:w-[30%] lg:mx-[10%]">
        <div className="flex-shrink-0 flex items-center">
          <Image className="h-8 w-auto" src={Logo} alt="Logo" />
          <span className="text-[#1D2BCA] text-3xl font-semibold ml-2 ">
            Techno
            <span className="text-[#F8990C] text-3xl font-semibold">krax</span>
          </span>
        </div>
        <h3 className="text-[20px] text-[#32475CDE] mt-10 mb-2 font-semibold lg:max-xl:mt-7">
          Adventure starts here 🚀
        </h3>
        <p className="text-[16px] text-[#32475C99] font-normal mb-6 flex-wrap">
          Make your learing journey easy and fun!
        </p>
        <div className="flex flex-col gap-3 xl:gap-4">
          <Input
            label="Username"
            name="name"
            autoFocus
            half
            handleChange={handleChange}
            handleKeyDown={handleKeyPress}
          />

          <Input
            label="Email"
            type="email"
            handleChange={handleChange}
            handleKeyDown={handleKeyPress}
            name="email"
          />
          <Input
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
            handleChange={handleChange}
            handleKeyDown={handleKeyPress}
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            handleChange={handleChange}
            handleKeyDown={handleKeyPress}
          />

          <div className="flex justify-between">
            <div className="flex">
              <Checkbox style={{ marginTop: "-7px", marginLeft: "-10px" }} />
              <p className="text-[#32475C99]">
                I agree to{" "}
                <span className="text-[#696CFF]">privacy policy & terms</span>
              </p>
            </div>
          </div>
          <Button
            className="bg-gradient-to-r from-[#434343] to-[#000000] text-[#FFFFFF]"
            style={{ color: "white" }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <p className="text-[#32475C99] text-[14px] text-center">
            Already have an account?
            <Link href="/signin">
              <span className="text-[#696CFF] font-medium cursor-pointer">
                {" "}
                Sign in instead
              </span>
            </Link>
          </p>
          <div className="flex items-center">
            <hr className="flex-grow border-t border-gray-400" />
            <span className="px-3 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>
        </div>
        <div className="flex gap-4 justify-center mt-3">
          <FacebookRoundedIcon />
          <XIcon />
          <GitHubIcon />
          <GoogleIcon />
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;
