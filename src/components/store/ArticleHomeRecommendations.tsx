const articleHomeRecommendationReducer = (
  state: any = {
    isLoading: true,
    forYouSecondQuerySkipCount:0,
    userBasedSecondQuerySkipCount:0,
    forYouRecommendedArticles: [],
    userBasedRecommendedArticles: [],
  },
  action: any
) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "RECOMMEDED_HOME_PAGE_ARTICLES":
      return {
        ...state,
        forYouRecommendedArticles: action.payload.forYouArticles.articles,
        userBasedRecommendedArticles: action.payload.userBasedArticles.articles,
        forYouSecondQuerySkipCount: action.payload.forYouArticles.forYouSecondQuerySkipCount,
        userBasedSecondQuerySkipCount: action.payload.userBasedArticles.userBasedSecondQuerySkipCount,
      };
      case "UPDATE_FOR_YOU_ARTICLES_STATE":
      return {
        ...state,
        forYouRecommendedArticles: [...state.forYouRecommendedArticles, ...action.payload.forYouArticles.articles],
        forYouSecondQuerySkipCount: action.payload.forYouArticles.forYouSecondQuerySkipCount

      };
      case "UPDATE_USER_BASED_ARTICLE_STATE":
      return {
        ...state,
        userBasedRecommendedArticles: [...state.userBasedRecommendedArticles, ...action.payload.userBasedArticles.articles],
        userBasedSecondQuerySkipCount: action.payload.forYouArticles.userBasedSecondQuerySkipCount,


      };

    default:
      return state;
  }
};

export default articleHomeRecommendationReducer