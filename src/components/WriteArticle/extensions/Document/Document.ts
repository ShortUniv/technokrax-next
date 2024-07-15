import { Document as TiptapDocument } from "@tiptap/extension-document";

export const Document = TiptapDocument.extend({
  // content: "(block|columns)+",
  content: "title block+",
});

export default Document;
