import * as api from "../api/index";
import toast from "react-hot-toast";

export const joinCommunity =
  (
    userId: any,
    setJoinedCommunities: any,
    communityId: any,
    setLoadingCommunities: any
  ) =>
  async (dispatch: any) => {
    try {
      setLoadingCommunities((prev: any) => ({ ...prev, [communityId]: true }));

      const { data } = await api.joinCommunityApi(userId);

      if (!data.success) {
        throw new Error(data.message);
      }
      if (data.message === "User joined community successfully") {
        setJoinedCommunities((prev: any) => ({ ...prev, [communityId]: true }));
      } else if (data.message === "User removed successfully") {
        setJoinedCommunities((prev: any) => {
          const updated = { ...prev };
          delete updated[communityId];
          return updated;
        });
      }

      setLoadingCommunities((prev: any) => ({ ...prev, [communityId]: false }));
    } catch (error) {
      console.log(error);
    }
  };

export const createCommunity =
  (communityData: any, setIsCreated: any) => async (dispatch: any) => {
    try {
      dispatch({ type: "COMMUNITY_START_LOADING" });

      const { data } = await api.createCommunityApi(communityData);
      console.log(data);
      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success("Community created successfully!");
      setIsCreated(true);
      dispatch({ type: "CLEAR_ERROR" });
      dispatch({ type: "COMMUNITY_END_LOADING" });
    } catch (error: any) {
      console.log(error);
      dispatch({ type: "SET_ERROR", payload: error.response.data.message });
      dispatch({ type: "COMMUNITY_END_LOADING" });
      setIsCreated(false);
      toast.error("Error creating community");
    }
  };

export const getCommunities = () => async (dispatch: any) => {
  try {
    const { data } = await api.getCommunitiesApi();
    console.log(data);
    dispatch({ type: "FETCH_COMMUNITIES", payload: data.result });
  } catch (error) {
    console.log(error);
  }
};

export const getCommunity = (communityId: any) => async (dispatch: any) => {

  try {
    const { data } = await api.getCommunityApi(communityId);
    if (!data.success) {
      throw new Error(data.message);
    }
    dispatch({ type: "FETCH_COMMUNITY", payload: data.result });
  } catch (error) {
    console.log(error);
  }
};
