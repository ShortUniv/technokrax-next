import * as api from "../api/index";
import toast from "react-hot-toast";

export const getCommunityDiscussion =
  (communityDiscussionData: any) => async (dispatch: any) => {
    try {
      const { data } = await api.getCommunityDiscussionApi(
        communityDiscussionData
      );
      console.log(data)
      if (!data.success) {
        throw new Error(data.message);
      }
      dispatch({ type: "FETCH_COMMUNITY_DISCUSSION", payload: data.result });
    } catch (error) {
      console.log(error);
    }
  };

export const createCommunityDiscussion =
  (communityDiscussionData: any, setIsCreated: any) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: "COMMUNITY_START_LOADING" });

      const { data } = await api.createCommunityDiscussionApi(
        communityDiscussionData
      );
      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success("Discussion created successfully!");
      setIsCreated(true);

      dispatch({ type: "CLEAR_ERROR" });
      dispatch({ type: "COMMUNITY_END_LOADING" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "CLEAR_ERROR" });
      dispatch({ type: "COMMUNITY_END_LOADING" });
      toast.error("Error creating discussion");
    }
  };


  export const addDiscussionComment =  (discussionCommentData:any) => async () => {
try {
  const {data} = await api.addDiscussionCommentApi(discussionCommentData)
} catch (error) {
  
}
  }