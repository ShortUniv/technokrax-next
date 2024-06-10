/* eslint-disable */

export interface ArticleState {
  isLoading: boolean;
  trendingArticles:{

    title: string;
    imgUrl: string;
    likes: string;
    views: string;
    appreciate: string;
    trendinessScore: string;
   }[]
}

const trendingArticlesReducer = (state: any = { isLoading: true, trendingArticles: [] }, action: any) => {
  switch (action.type) {

    case "LOGOUT":
      return{
        ...state,
        trendingArticles: [],
      }
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "FETCH_TRENDING_ARTICLES":
      return{
        ...state,
        trendingArticles: action.payload,
      }
    case "FETCH_ARTICLE_BY_ID":
      return{
        ...state,
        trendingArticles: action.payload,
      }

      case "UPDATE_TRENDING_ARTICLE_STATE":
        return {
          ...state,
          trendingArticles: [...state.trendingArticles, ...action.payload.trendingArticles],
        };
   
    default:
      return state;
  }
};

export default trendingArticlesReducer;
