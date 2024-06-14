'use client'
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import  Link  from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp,signup } from "@/actions/Auth";
import { useRouter } from "next/navigation";

interface RootState {
  authData: {
    authData: Record<string, AuthState>;
    isLoading: boolean;
  };
}

interface AuthState {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { authData, isLoading } = useSelector(
    (state: RootState) => state.authData
  );
  const dispatch = useDispatch();
const router = useRouter();
  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!authData) {
      router.push("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e: any) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = authData;

    dispatch<any>(
      signup(
        {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          otp: otp,
        },
        router
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {isLoading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-200 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link href="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch<any>(sendOtp(authData.email, router))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
