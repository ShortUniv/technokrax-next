'use client'
import { useState } from "react";
import Logo from "../../assets/HeaderLogo.png";
import Input from "@/components/Input";
import { Checkbox } from "@mui/material";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import  Link  from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signin } from "@/actions/Auth";
import Image from "next/image";



interface FormData {
  email: string;
  password: string;
}

const initialState: FormData = {
  email: "",
  password: "",
};
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialState);
  const dispatch = useDispatch();
const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch<any>(
      signin({ email: formData.email, password: formData.password }, router)
    );
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
        handleSubmit(e);
    }
};

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  return (

    <>
    <div className="flex">
      <div className="w-[50%] h-[100vh] p-[6rem] bg-[#F5F5F9] hidden lg:block">
        <img
          src="https://demos.themeselection.com/sneat-mui-react-nextjs-admin-template/demo-1/images/pages/boy-with-rocket-light.png"
          alt=""
        />
      </div>
      <div className="mx-auto mt-[5rem] lg:mt-[1rem] xl:mt-[6rem] w-[80%] sm:w-[60%] lg:w-[30%]">
        <div className="flex-shrink-0 flex items-center">
          <Image className="h-8 w-auto" src={Logo} alt="Logo" />
          <span className="text-[#1D2BCA] text-3xl font-semibold ml-2 ">
            Techno
            <span className="text-[#F8990C] text-3xl font-semibold">krax</span>
          </span>
        </div>
        <h3 className="text-[20px] text-[#32475CDE] mt-10 mb-2 font-semibold">
          Welcome to Technokrax! 👏
        </h3>
        <p className="text-[16px] text-[#32475C99] font-normal mb-6">
          Please sign-in to your account and start the adventure
        </p>
        <div className="flex flex-col gap-6">
          <Input
            label="Email"
            name="email"
            half
            autoFocus
            handleChange={handleChange}
            handleKeyDown={handleKeyPress}

          />
          <Input
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
            handleChange={handleChange}
            handleKeyDown={handleKeyPress}
          />

          <div className="flex justify-between">
            <div className="flex">
              <Checkbox style={{ marginTop: "-7px", marginLeft: "-10px" }} />
              <p className="text-[#32475C99] ">Remember Me</p>
            </div>
            <Link href="/forgot-password">
            <p className="text-[#696CFF]">Forgot Password?</p>
            </Link>
          </div>
          <Button
            className="bg-gradient-to-r from-[#434343] to-[#000000] text-[#FFFFFF]"
            style={{ color: "white" }}
            type="submit"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <p className="text-[#32475C99] text-[14px] text-center">
            New on our platform?{" "}
            <Link href="/signup">
              <span className="text-[#696CFF] font-medium cursor-pointer">
                {" "}
                Create an account
              </span>
            </Link>
          </p>
          <div className="flex items-center">
            <hr className="flex-grow border-t border-gray-400" />
            <span className="px-3 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>
        </div>
        <div className="flex gap-4 justify-center mt-2 lg:mt-10">
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

export default SignIn;
