import * as api from "../api/index";

export const saveHighlights = (highlightData: any) => async () => {
  try {
    const { data } = await api.saveHighlightsApi(highlightData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const saveNotes = (noteData: any) => async () => {
  try {
    const { data } = await api.saveNotesApi(noteData);
    console.log(data);
  } catch (error) {
    console.log(error);

  }
};

export const activeInteractionTime = (interactionTimeData: any) => async () => {
  console.log(interactionTimeData)
  try {
    await api.activeInteractionTimeApi(interactionTimeData);
  } catch (error) {
    console.log(error);

  }
};

export const likeArticle = (id: any) => async () => {
  try {
    await api.likeArticleApi(id);
  } catch (error) {
    console.log(error);
  }
};

export const saveComment = (comment: any) => async () => {
  try {
    const { data } = await api.saveCommentApi(comment);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const addViewToArticle = (viewData:any) => async () => {
  try {
    const {data} = await api.addViewToArticleApi(viewData);
    console.log(data.success)
  } catch (error) {
    console.log(error);
    
  }
} 