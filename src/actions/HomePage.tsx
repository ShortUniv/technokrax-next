//@ts-nocheck
import * as api from "../api/index";
import { toast } from "react-hot-toast";

export const getTrendingArticles =
  (skipCount: any) => async (dispatch: any) => {
    try {
      dispatch({ type: "START_LOADING" });
      const { data } = await api.getTrendingArticlesApi(skipCount);
      dispatch({ type: "FETCH_TRENDING_ARTICLES", payload: data });
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };
export const getForYouArticles = (userId: any) => async (dispatch: any) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.getForYouArticlesApi(userId);

    dispatch({ type: "RECOMMEDED_HOME_PAGE_ARTICLES", payload: data.result });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};
export const getSliderArticles =
  (articleSliderData: any, setIsBeingFetched: any) => async (dispatch: any) => {
    setIsBeingFetched(true);
    try {
      // dispatch({ type: "START_LOADING" });
      const { data } = await api.getSliderArticlesApi(articleSliderData);
      if (data.type === "forYouArticles") {
        dispatch({
          type: "UPDATE_FOR_YOU_ARTICLES_STATE",
          payload: data.result,
        });
      } else if (data.type === "trendingArticles") {
        dispatch({
          type: "UPDATE_TRENDING_ARTICLE_STATE",
          payload: data.result,
        });
      } else if (data.type === "userBasedArticles") {
        dispatch({
          type: "UPDATE_USER_BASED_ARTICLE_STATE",
          payload: data.result,
        });
      } else {
        console.log("Invalid type");
      }

      setIsBeingFetched(false);
      // dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };
export const getArticleByIds =
  (tagId: string, userId: string) => async (dispatch: any) => {
    try {
      dispatch({ type: "START_LOADING" });
      const { data } = await api.getArticleByIdApi(tagId, userId);

      dispatch({ type: "FETCH_ARTICLE_BY_ID", payload: data.result });
      dispatch({ type: "END_LOADING" });
      return data.result;
    } catch (error) {
      console.log(error);
    }
  };

export const getArticleById = async (
  tagId: string | undefined,
  userId: string
) => {
  try {
    const { data } = await api.getArticleByIdApi(tagId, userId);

    return data.result;
  } catch (error) {
    console.log(error);
  }
};

export const createArticle =
  (content: any, router: any) => async (dispatch: any) => {
    const toastId = toast.loading("Loading...");

    try {
      const { data } = await api.createArticleApi(content);

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch({ type: "FETCH_TRENDING_ARTICLES", payload: data.result });
      toast.success("Article successfully sent for review");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("error creating article");
    }
    toast.dismiss(toastId);
  };

export const getToken = () => async () => {
  try {
    await api.getTokenApi();
  } catch (error) {
    console.log(error);
  }
};


//will look later 

export const referArticle = (content: any) => async (dispatch: any) => {
  try {
    const { data } = await api.referArticleApi(content);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export const getarticle = (category: any) => async (dispatch: any) => {
  try {
    const { data } = await api.getArticleApi(`${category}`);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};