/* eslint-disable */

export interface AuthState {
  isLoading: boolean;
  AuthData: {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }[];
}

const authReducer = (
  state: AuthState = { isLoading: false, AuthData: [] },
  action: any
) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return action?.data || state
      case "LOGOUT":
        localStorage.clear();
        return []; 
    case "AUTH_START_LOADING":
      return { ...state, isLoading: true };
    case "AUTH_END_LOADING":
      return { ...state, isLoading: false };
    case "SET_SIGNUP_DATA":
      return {
        ...state,
        authData: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
