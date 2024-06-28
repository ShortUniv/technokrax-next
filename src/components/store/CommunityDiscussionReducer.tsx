

interface CommunityState {
    isLoading: boolean;
    error: string | null;
    communitiesDiscussions: any[]; 
  }
  
  const initialState: CommunityState = {
    isLoading: false,
    error: null,
    communitiesDiscussions: [],
  };
  
  const communityDiscussionReducer = (state = initialState, action: any): CommunityState => {
    switch (action.type) {
      case 'COMMUNITY_DISCUSSION_START_LOADING':
        return {
          ...state,
          isLoading: true,
          error: null,
        };
  
      case 'COMMUNITY_DISCUSSION_END_LOADING':
        return {
          ...state,
          isLoading: false,
        };
     
      case 'FETCH_COMMUNITY_DISCUSSION':
        return {
          ...state,
         communitiesDiscussions: [action.payload]
        };
  
      case 'SET_ERROR':
        return {
          ...state,
          error: action.payload,
        };
  
      case 'CLEAR_ERROR':
        return {
          ...state,
          error: null,
        };
  
  
      default:
        return state;
    }
  };
  
  export default communityDiscussionReducer;
  