// import { Node, mergeAttributes } from '@tiptap/core';
import Heading from '@tiptap/extension-heading';

// export const Title = Heading.extend({
//   name: 'title',
//   group: 'block',
//   parseHTML() {
//     return [
//       {
//         tag: 'h1:first-child',
//       },
//     ];
//   },
//   renderHTML({ HTMLAttributes }) {
//     return ['h1', mergeAttributes(HTMLAttributes), 0];
//   },
// }).configure({ levels: [1] });

// export default Title;


// import { Node, mergeAttributes } from '@tiptap/core';

// export const Title = Node.create({
//   name: 'title',
//   group: 'block',
//   content: 'inline*',
//   defining: true,
//   parseHTML() {
//     return [
//       {
//         tag: 'h1:first-child',
//       },
//     ];
//   },
//   renderHTML({ HTMLAttributes }) {
//     return ['h1', mergeAttributes(HTMLAttributes), 0];
//   },
//   addAttributes() {
//     return {
//       level: {
//         default: 1,
//       },
//     };
//   },
// });


export const Title = Heading.extend({
    name: "title",
    group: "title",
    parseHTML: () => [{ tag: "h1:first-child" }],
  }).configure({ levels: [1] });
  

export default Title;
