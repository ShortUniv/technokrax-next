import * as api from "../api/index";
import { toast } from "react-hot-toast";
import { setCookie } from 'nookies';

export const signin =
  (formData: any, router: any) => async (dispatch: any) => {
    const toastId = toast.loading("Loading...");

    try {
      const { data } = await api.signIn(formData);
      console.log("SIGNIN API RESPONSE............", data);
      if (!data.success) {
        throw new Error(data.message);
      }
     

      const user = data.result;

      // Set user data in a cookie named 'userToken'
      setCookie(null, 'userToken', JSON.stringify(user), {
        maxAge: 3600 * 24 * 7, // One week expiry
        path: '/',
      });


      dispatch({ type: "AUTH", payload: data.result });
      toast.success("Login was Successful");
      router.push("/");
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log("SIGNIN API ERROR............", error);
      toast.error("Sign-in Failed");
      router.push("/signin");
    }

    toast.dismiss(toastId);
  };

export const signup =
  (formData: any, router: any) => async (dispatch: any) => {
    console.log("f:", formData);
    const toastId = toast.loading("Loading...");
    try {
      const { data } = await api.signUp(formData);
      console.log("SIGNUP API RESPONSE............", data);

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch({ type: "AUTH", payload: data.result });
      toast.success("Signup Successful");
      router.push("/set-preferences");
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      router.push("/signup");
    }

    toast.dismiss(toastId);
  };

export const setSignUpData = (FormData: any) => async (dispatch: any) => {
  try {
    dispatch({ type: "SET_SIGNUP_DATA", payload: FormData });
  } catch (error) {
    console.log(error);
  }
};

export const sendOtp = (email: any, router: any) => async (dispatch: any) => {
  const toastId = toast.loading("Loading...");
  try {
    dispatch({ type: "START_LOADING" });

    const { data } = await api.sendOtpApi(email);
    console.log("SENDOTP API RESPONSE............", data);

    if (!data.success) {
      throw new Error(data.message);
    }

    toast.success("OTP Sent Successfully");
    router.push("/verify-email");
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("SENDOTP API ERROR............", error);
    toast.error("Could Not Send OTP");
  }

  toast.dismiss(toastId);
};

export const getPasswordResetToken =
  (email: any, setEmailSent: any) => async (dispatch: any) => {
    // const toastId = toast.loading("Loading...");

    dispatch({ type: "AUTH_START_LOADING" });
    try {
      const { data } = await api.getPasswordResetTokenApi(email);

      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
      dispatch({ type: "AUTH_END_LOADING" });
    }
    dispatch({ type: "AUTH_END_LOADING" });
  };

export const resetPassword =
  (UpdatePasswordData: any, router: any) => async (dispatch: any) => {
    dispatch({ type: "AUTH_START_LOADING" });
    try {
      const { data } = await api.resetPasswordApi(UpdatePasswordData);

      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success("Password has been reset successfully");
      router.push("/signin");
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
      dispatch({ type: "AUTH_END_LOADING" });
    }
    dispatch({ type: "AUTH_END_LOADING" });
  };
