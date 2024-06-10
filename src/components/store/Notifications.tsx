
export interface notificationState{
    userId: string;
  message: string;
  type: string;
  metadata?: any;
  createdAt: Date;
  read: boolean;
}


const profileReducer = (state: any = { isLoading: true, notifications: [] }, action: any) => {
    switch (action.type) {
  
  
      case "START_LOADING":
        return { ...state, isLoading: true };
      case "END_LOADING":
        return { ...state, isLoading: false };
    case "FETCH_NOTIFICATIONS":
        return {
            ...state,
            notifications: action.payload,
        }
     
      default:
        return state;
    }
  };
  
  export default profileReducer;

  