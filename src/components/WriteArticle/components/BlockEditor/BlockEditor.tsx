//@ts-nocheck
// import { WebSocketStatus } from '@hocuspocus/provider'
import { EditorContent, PureEditorContent } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";

import { LinkMenu } from "../../components/menus";

import { useBlockEditor } from "../../hooks/useBlockEditor";

// import "../../styles/index.css";

import { Sidebar } from "../../components/Sidebar";
// import { Loader } from '../../components/ui/Loader'
// import { EditorContext } from '../../context/EditorContext'
import ImageBlockMenu from "../../extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "../../extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "../../extensions/Table/menus";
import { TiptapProps } from "./types";
import { EditorHeader } from "./components/EditorHeader";
import { TextMenu } from "../menus/TextMenu";
import { ContentItemMenu } from "../menus/ContentItemMenu";
import ArticlePreview from "./components/ArticlePreview";
import { NavbarComponent } from "@/components/Navbar";

export const BlockEditor = ({ ydoc, provider }: TiptapProps) => {
  const [publish, setPublish] = useState<any>(false);

  const [content, setContent] = useState<string>("");
  const menuContainerRef = useRef(null);
  const editorRef = useRef<PureEditorContent | null>(null);

  const { editor, users, characterCount, collabState, leftSidebar } =
    useBlockEditor({ ydoc, provider });

  const displayedUsers = users.slice(0, 3);

  if (!editor) {
    return null;
  }

  return (
    <>
      <NavbarComponent />
      {publish ? (
        <ArticlePreview publish={publish} setPublish={setPublish} />
      ) : (
        <div>
          <div
            className="flex h-[100vh]    text-black bg-white border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800"
            ref={menuContainerRef}
          >
            <Sidebar
              isOpen={leftSidebar.isOpen}
              onClose={leftSidebar.close}
              editor={editor}
            />
            <div className="relative flex flex-col flex-1 h-full overflow-hidden">
              <EditorHeader
                characters={characterCount.characters()}
                collabState={collabState}
                users={displayedUsers}
                words={characterCount.words()}
                isSidebarOpen={leftSidebar.isOpen}
                toggleSidebar={leftSidebar.toggle}
                content={content}
                publish={publish}
                setPublish={setPublish}
              />
              <EditorContent
                editor={editor}
                ref={editorRef}
                className="flex-1 overflow-y-auto h-[100vh]"
              />

              <ContentItemMenu editor={editor} />
              <LinkMenu editor={editor} appendTo={menuContainerRef} />
              <TextMenu editor={editor} />
              <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
              <TableRowMenu editor={editor} appendTo={menuContainerRef} />
              <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
              <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlockEditor;
