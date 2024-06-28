import axios from "axios";

const API = axios.create({
   baseURL: "https://kpp1td2yze.execute-api.us-west-2.amazonaws.com/dev/nodejs-aws-lambda/server"
  // baseURL: "http://localhost:5001/nodejs-aws-lambda/server",
});

API.interceptors.request.use((req) => {
  if (typeof window !== "undefined" && window.localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(window.localStorage.getItem("profile")!).token
    }`;
  }
  return req;
});

export const getTrendingArticlesApi = (skipCount: any) =>
  API.get("/api/articles/trending", { params: skipCount });
export const getForYouArticlesApi = (userId: any) =>
  API.get(`/api/articles/forYouArticles`, { params: userId });
export const getSliderArticlesApi = (articleSliderData: any) =>
  API.get(`/api/articles/sliderArticles`, { params: articleSliderData });

export const getTokenApi = () => API.get("/api/articles/token");
export const createArticleApi = (content: any) =>
  API.post("/api/articles/create", content);
export const getArticleByIdApi = (tagId: string | undefined, userId: string) =>
  API.get(`/api/articles/getArticleById/${tagId}/${userId}`);
export const saveHighlightsApi = (highlightsData: any) =>
  API.post("/api/articles/saveHighlights", highlightsData);
export const saveNotesApi = (noteData: any) =>
  API.post("/api/articles/saveNotes", noteData);

export const signIn = (FormData: any) => API.post("api/users/signin", FormData);
export const signUp = (FormData: any) =>
  API.post("/api/users/signup", FormData);

export const getPasswordResetTokenApi = (email: any) =>
  API.post("/api/users/reset-password-token", email);
export const resetPasswordApi = (UpdatePasswordData: any) =>
  API.post("/api/users/reset-password", UpdatePasswordData);

export const sendOtpApi = (email: string) =>
  API.post("/api/users/sendOtp", email);
export const setUserPreferencesApi = (preferences: any) =>
  API.post("/api/profile/setPreferences", preferences);

export const activeInteractionTimeApi = (interactionTimeData: any) =>
  API.post("/api/articles/activeInteractionTime", interactionTimeData);
export const saveProfileDetailsApi = (profileDetails: any) =>
  API.post("/api/profile/saveProfileDetails", profileDetails);
export const getProfileApi = (userId: any) =>
  API.get(`/api/profile/getProfile/${userId}`);
export const saveProfileImageApi = (image: any) =>
  API.post("/api/profile/saveProfileImage", image);
export const followUserApi = (userData: any) =>
  API.post("/api/profile/followUser", userData);
export const unfollowUserApi = (userData: any) =>
  API.post("/api/profile/unFollowUser", userData);

export const likeArticleApi = (id: any) =>
  API.put(`api/articles/likeArticle`, id);
export const saveCommentApi = (comment: any) =>
  API.post(`api/articles/saveComment`, comment);

export const createCommunityApi = (communityData: any) =>
  API.post("/api/community/createCommunity", communityData);
export const getCommunitiesApi = () => API.get("/api/community/getCommunities");

export const joinCommunityApi = (userId:any) => API.post("/api/community/joinCommunity",userId)
export const getCommunityApi = (communityId:any) => API.get(`/api/community/getCommunity`,{params:communityId})

export const createCommunityDiscussionApi = (communityDiscussionData:any) => API.post("/api/community/createCommunityDiscussion",communityDiscussionData)
export const getCommunityDiscussionApi = (communityDiscussionData:any) => API.get("/api/community/getCommunityDiscussion",{params:communityDiscussionData})
export const addDiscussionCommentApi = (discussionCommentData:any) => API.post("api/community/addDiscussionComment",discussionCommentData)
//will look later

export const referArticleApi = (content: any) =>
  API.post("/api/articles/createrefer", content);
export const getArticleApi = (category: string, page: any, limit: any) =>
  API.get(`/api/articles/getnews/${category}?page=${page}&limit=${limit}`);
export const getreferarticle = (page: any, limit: any) =>
  API.get(`/api/articles/getreferarticle?page=${page}&limit=${limit}`);
export const getAllarticle = (page: any, limit: any) =>
  API.get(`/api/articles/getallarticle?page=${page}&limit=${limit}`);
