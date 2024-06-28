

interface CommunityState {
  isLoading: boolean;
  error: string | null;
  communities: any[]; 
}

const initialState: CommunityState = {
  isLoading: false,
  error: null,
  communities: [],
};

const communityReducer = (state = initialState, action: any): CommunityState => {
  switch (action.type) {
    case 'COMMUNITY_START_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'COMMUNITY_END_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case 'FETCH_COMMUNITIES':
      return {
        ...state,
       communities: action.payload
      };
    case 'FETCH_COMMUNITY':
      return {
        ...state,
       communities: [action.payload]
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

    // Additional cases for handling community-related actions if needed

    default:
      return state;
  }
};

export default communityReducer;
