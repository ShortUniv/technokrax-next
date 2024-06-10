
export interface profileState{
    isLoading:boolean;
    profile: {
        userId?: string;
        userInfo: {
          name: string;
          email: string;
          photo: string;
          contact: number;
          bio: string;
          socials: 
          {twitter:string;
            facebook: string;
            linkedin: string;
            github: string;
            };
        };
        userDetails: {
          dateJoined: Date;
          lastLogin: string;
          password: string;
        };
        userPreferences: {
          provided: string[];
          inferred: string[];
        };
        myLearning: {
          articles: {
            contentId: string;
            contentTitle: string;
            contentImg: string;
            firstDateViewed: Date;
            lastDateViewed: Date;
            timeSpent: string;
            completionStatus: string;
          }[];
          news: {
            contentId: string;
            contentTitle: string;
            contentImg: string;
            firstDateViewed: Date;
            lastDateViewed: Date;
            timeSpent: string;
            completionStatus: string;
          }[];
          videos: {
            contentId: string;
            contentTitle: string;
            contentImg: string;
            firstDateViewed: Date;
            lastDateViewed: Date;
            timeSpent: string;
            completionStatus: string;
          }[];
        };
        bookMarks: {
          articles: {
            contentId: string;
            contentTitle: string;
            contentImg: string;
          }[];
          images: {
            contentId: string;
            contentTitle: string;
            contentImg: string;
          }[];
          videos: {
            contentId: string;
            contentTitle: string;
            contentImg: string;
          }[];
          news: {
            contentId: string;
            contentTitle: string;
            contentImg: string;
          }[];
          tools: {
            contentId: string;
            contentTitle: string;
            contentImg: string;
          }[];
        };
        achievements: {
          certificates: string[];
          badges: {
            badgeId: string;
            badgeUrl: string;
          }[];
          awards: string[];
        };
        relation: {
          communities: {
            communityId: string;
            communityName: string;
            dateJoined: Date;
            lastInteracted: string;
            upcomingEvents: string[];
          }[];
          mentors: {}[];
          partner: {}[];
          fellows: {}[];
          friends: {}[];
        };
        creation: {
          articles: {
            articleId: string;
            topic: string;
            dateCreated: Date;
            views: number;
            likes: number;
          }[];
          videos: {
            videoId: string;
            topic: string;
            dateCreated: Date;
            views: number;
            likes: number;
          }[];
          images: {
            imageId: string;
            topic: string;
            dateCreated: Date;
            views: number;
            likes: number;
          }[];
        };
    }
}


const profileReducer = (state: any = { isLoading: true, profile: [] }, action: any) => {
    switch (action.type) {
  
  
      case "START_LOADING":
        return { ...state, isLoading: true };
      case "END_LOADING":
        return { ...state, isLoading: false };
    case "SAVE_PROFILE_DETAILS":
        return {
            ...state,
            profile: action.payload,
        }
     
      default:
        return state;
    }
  };
  
  export default profileReducer;

  