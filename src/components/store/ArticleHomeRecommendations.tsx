const articleHomeRecommendationReducer = (
  state: any = {
    isLoading: true,
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
        forYouRecommendedArticles: action.payload.forYouArticles,
        userBasedRecommendedArticles: action.payload.userBasedArticles,
      };
      case "UPDATE_FOR_YOU_ARTICLES_STATE":
      return {
        ...state,
        forYouRecommendedArticles: [...state.forYouRecommendedArticles, ...action.payload.forYouArticles],
      };
      case "UPDATE_USER_BASED_ARTICLE_STATE":
      return {
        ...state,
        userBasedRecommendedArticles: [...state.userBasedRecommendedArticles, ...action.payload.userBasedArticles],
      };

    default:
      return state;
  }
};

export default articleHomeRecommendationReducer