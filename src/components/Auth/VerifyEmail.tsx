'use client'
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signup } from "@/actions/Auth";
import { useRouter } from "next/navigation";

interface RootState {
  authData: {
    authData: AuthState;
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
    if (!authData) {
      router.push("/signup");
    }
  }, [authData, router]);

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
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-gray-100">
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-6 lg:p-10 bg-white rounded-lg shadow-lg">
          <h1 className="text-gray-800 font-bold text-2xl lg:text-3xl mb-4">
            Verify Email
          </h1>
          <p className="text-gray-600 text-lg lg:text-xl mb-6">
            A verification code has been sent to you. Enter the code below.
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder=""
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(0, 0, 0, 0.1)",
                  }}
                  className="w-10 lg:w-14 border-2 border-gray-300 bg-gray-50 rounded-md text-gray-900 aspect-square text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-md mt-6 font-semibold text-white ${
                otp.length < 6
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={otp.length < 6}
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link href="/signup">
              <p className="text-blue-500 hover:text-blue-600 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-500 hover:text-blue-600 gap-x-2"
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
