//@ts-nocheck
import React, { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Plugin } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";

const TiptapEditor = ({
  content,
  setContent,
}: {
  content: string;
  setContent: (content: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bold: false, italic: false }),
      TextStyle,
      Bold,
      Italic,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      ListItem,
      CodeBlock,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          style: "max-width: 100%; max-height: 378px; display: block;",
        },
      }),
      Link.configure({
        openOnClick: true,
        autolink: false,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });


  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && editor) {
          editor
            .chain()
            .focus()
            .setImage({ src: reader.result as string })
            .run();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addLink = () => {
    const { selection } = editor.state;

    if (!selection.empty) {
      const url = prompt("Enter the URL");
      if (url && editor) {
        editor.chain().focus().setLink({ href: url }).run();
      }
    } else {
      editor.chain().focus().unsetLink().run();
    }
  };
  if (!editor) {
    return null;
  }

  return (
    <div className="border p-4 rounded">
      <div className="flex flex-wrap gap-2 mb-4 border-b pb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
        >
          Underline
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-2 py-1 rounded ${
            editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""
          }`}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-2 py-1 rounded ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
          }`}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`px-2 py-1 rounded ${
            editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : ""
          }`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("bulletList") ? "bg-gray-300" : ""
          }`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("codeBlock") ? "bg-gray-300" : ""
          }`}
        >
          Code Block
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-2 py-1 rounded bg-gray-200"
        >
          Upload Image
        </button>
        <button onClick={addLink} className="px-2 py-1 rounded bg-gray-200">
          Add Link
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={addImage}
        style={{ display: "none" }}
      />
      <div className="bg-white p-2 border rounded">
        <EditorContent editor={editor} />
      </div>
      <style jsx global>{`
        .ProseMirror a {
          color: blue;
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TiptapEditor;
