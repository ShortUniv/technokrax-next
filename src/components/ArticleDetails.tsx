// @ts-nocheck
'use client'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArticleByIds } from "@/actions/HomePage";
import { useParams } from "next/navigation";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Helmet } from "react-helmet";

import moment from "moment";
import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FloatingMenu from "./FloatingMenu";
import Notes, { DisplayNote } from "./Notes";
import { saveHighlights, likeArticle } from "@/actions/Article";
import { ClickAwayListener, Tooltip } from "@mui/material";
import ArticleDetailsSkeleton from "./Common/ArticleDetailsSkeleton";
import BrowserInteractionTime from "browser-interaction-time";
import { activeInteractionTime } from "@/actions/Article";
import CommentIcon from "@mui/icons-material/Comment";
import ArticleComments from "./ArticleComments";
import { NavbarComponent } from "./Navbar";
import Footer from "./Footer";
import Chattop from "./ChatModel/Chattop";
import toast from "react-hot-toast";

const ArticleDetails = () => {
  const dispatch = useDispatch();
  const { trendingArticles } = useSelector(
    (state: any) => state.trendingArticles
  );
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);


  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedDisplayNoteIndex, setSelectedDisplayNoteIndex] =
    useState(null);
  const [interactionTime, setInteractionTime] = useState(0);
  const [commentsActive, setCommentsActive] = useState(false);
  const [likes, setLikes] = useState<any>([]);
  const [commentsState, setCommentsState] = useState([]);
  const [chatText, setChatText] = useState<any>("");
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const interactionTimeTracker = new BrowserInteractionTime({
      stopTimerOnTabchange: true,
      idleTimeoutMs: 3000,
      timeIntervalEllapsedCallbacks: [
        {
          callback: (timeInMs) => {
            // console.log(`Time interval elapsed: ${timeInMs} ms`);
          },
          timeInMilliseconds: 5000,
          multiplier: (time) => time + 5000,
        },
      ],
      absoluteTimeEllapsedCallbacks: [
        {
          callback: (timeInMs) => {
            // console.log(`Absolute time elapsed: ${timeInMs} ms`);
          },
          timeInMilliseconds: Date.now() + 10000,
          pending: true,
        },
      ],
      browserTabActiveCallbacks: [
        (timeInMs) => {
          // console.log(`Browser tab active. Interaction time: ${timeInMs} ms`);
        },
      ],
      browserTabInactiveCallbacks: [
        (timeInMs) => {
          // console.log(`Browser tab inactive. Interaction time: ${timeInMs} ms`);
        },
      ],
      idleCallbacks: [
        (timeInMs) => {
          // console.log(`User idle. Interaction time: ${timeInMs} ms`);
        },
      ],
      activeCallbacks: [
        (timeInMs) => {
          // console.log(`User active. Interaction time: ${timeInMs} ms`);
        },
      ],
    });

    interactionTimeTracker.startTimer();
    const updateInteractionTime = () => {
      const timeInMs = interactionTimeTracker.getTimeInMilliseconds();
      const timeInMinutes = Math.floor(timeInMs / (1000 * 60));
      setInteractionTime(timeInMinutes);
    };

    updateInteractionTime();
    const intervalId = setInterval(updateInteractionTime, 1000);

    const sendInteractionTimeToBackend = (interactionTime: any) => {
      console.log("Sending interaction time to backend:", interactionTime);
      dispatch<any>(
        activeInteractionTime({
          interactionTime: interactionTime,
          userId: user?.user?.userId,
          tagId: tagId,
        })
      );
    };

    const cleanup = () => {
      clearInterval(intervalId);
      interactionTimeTracker.destroy();
      const currentInteractionTime =
        interactionTimeTracker.getTimeInMilliseconds() / (1000 * 60);
      sendInteractionTimeToBackend(currentInteractionTime);
    };

    window.addEventListener("beforeunload", cleanup);

    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);

  const [selectedText, setSelectedText] = useState("");
  const [menuSelectedText, setMenuSelectedText] = useState("");
  const [notes, setNotes] = useState([]);
  const [notePosition, setNotePosition] = useState({ top: 0, left: 0 });
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const editor = useEditor({
    editable: false,
    editorProps: {
      attributes: {
        class: "",
      },
    },
    content: trendingArticles?.article?.content || "",

    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
  });

  const { tagId } = useParams<{ id: string | undefined }>();

  useEffect(() => {
    if (tagId) {
      dispatch<any>(getArticleByIds(tagId, user?.user?.userId));
    }
    if (trendingArticles?.article?.content) {
      editor?.commands.setContent(trendingArticles?.article?.content);
      setLikes(trendingArticles?.article?.likes);
      setCommentsState(trendingArticles?.article?.comments);
    }
    window.scrollTo(0, 0);
  }, [trendingArticles?.article?.content, editor, dispatch, tagId]);

  const handleAddNote = () => {
    if (!user?.user?.userId) {
      toast("Please sign in to add note", {
        icon: "🔒",
      });
    } else {
      const { from, to } = editor?.state.selection || { from: 0, to: 0 };
      const text = editor?.state.doc.textBetween(from, to);
      const { tr } = editor?.state;

      if (from && to) {
        const midpoint = (from + to) / 2;

        const rect = editor?.view.coordsAtPos(midpoint);
        if (rect) {
          const topPosition = rect.top + window.scrollY - 10;
          const leftPosition = 1100;
          setNotePosition({ top: topPosition, left: leftPosition });
          if (text !== undefined) {
            setSelectedText(text);
          }

          tr.addMark(
            from,
            to,
            editor?.state.schema.marks.highlight.create({ color: "#C6F2F1" })
          );
          editor?.view.dispatch(tr);
        }
      }
    }
  };

  const handleChatText = () => {
    const selection = window.getSelection();
    // const text = selection?.toString();
    setChatText(selection?.toString());
    setChatOpen(true);
    // setChatBoxOpen(true)
  };

  const handleFloatingMenu = () => {
    console.log("Mouse up event triggered!");

    const { from, to } = editor?.state.selection || { from: 0, to: 0 };
    const text = editor?.state.doc.textBetween(from, to);
    const { tr } = editor?.state;

    if (from && to) {
      const rect = editor?.view.coordsAtPos(from);
      if (rect) {
        const topPosition = rect.top + window.scrollY - 50;
        const leftPosition = rect.left;
        setMenuPosition({ top: topPosition, left: leftPosition });
        if (text !== undefined) {
          setMenuSelectedText(text);
        }

        editor?.view.dispatch(tr);
      }
    }
  };

  const createHighlight = async () => {
    if (!user?.user?.userId) {
      toast("Please sign in to highlight the text", {
        icon: "🔒",
      });
    } else {
      const { from, to } = editor?.state.selection || { from: 0, to: 0 };
      const { tr } = editor?.state;

      if ((from, to)) {
        tr.addMark(
          from,
          to,
          editor?.state.schema.marks.highlight.create({ color: "#C6F2F1" })
        );
        editor?.view.dispatch(tr);
      }

      dispatch<any>(
        saveHighlights({
          start: from,
          end: to,
          userId: user?.user.userId,
          tagId: trendingArticles?.article?.tagId,
        })
      );
    }
  };

  const handleHighlight = () => {
    if (!editor) return;

    const rangesFromDatabase = trendingArticles?.articleDetails?.highlights;

    rangesFromDatabase?.forEach((range: any) => {
      const { startOffset, endOffset } = range;
      const { tr } = editor.state;

      tr.addMark(
        startOffset,
        endOffset,
        editor.state.schema.marks.highlight.create({ color: "#C6F2F1" })
      );
      editor.view.dispatch(tr);
    });
  };

  useEffect(() => {
    handleHighlight();
  }, [trendingArticles?.articleDetails?.highlights]);

  const userId = user?.result?.googleId || user?.user?.userId;
  const hasLikedPost = likes?.find((like: any) => like === userId);

  const handleLike = async () => {
    if (!user?.user?.userId) {
      toast("Please sign in to like the post", {
        icon: "🔒",
      });
    } else {
      dispatch<any>(
        likeArticle({
          tagId: trendingArticles?.article?.tagId,
          userId: user?.user?.userId,
        })
      );
      if (hasLikedPost) {
        setLikes(likes.filter((id: any) => id !== userId));
      } else {
        setLikes([...likes, userId]);
      }
    }
  };

  const Likes = () => {
    const formattedLikes = formatLikesCount(likes?.length);

    if (likes?.length > 0 && trendingArticles?.article?.likes) {
      return likes.includes(user?.user?.userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {formattedLikes}
        </>
      ) : (
        <>
          <ThumbUpOutlined fontSize="small" />
          &nbsp;{formattedLikes}
        </>
      );
    } else {
      return (
        <>
          <ThumbUpOutlined fontSize="small" />
          &nbsp;{formattedLikes}
        </>
      );
    }
  };

  // Function to format likes count
  const formatLikesCount = (count: any) => {
    if (count >= 50) {
      const formattedCount = (count / 1000).toFixed(1); // Convert to K format with one decimal place
      return `${formattedCount}K`;
    }
    return count; // Return the original count if it's less than 1000
  };

  return (
    <>
      <NavbarComponent />
      <ArticleComments
        commentsActive={commentsActive}
        setCommentsActive={setCommentsActive}
        tagId={trendingArticles?.article?.tagId}
        commentsState={commentsState}
        setCommentsState={setCommentsState}
      />
      <Chattop
        text={chatText}
        setChatText={setChatText}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        articleTitle={trendingArticles?.article?.title}
      />

      {!trendingArticles?.article?.content && (
        <div>
          <ArticleDetailsSkeleton />
        </div>
      )}
      {trendingArticles?.article?.content && (
        <div className="text-black overflow-hidden ">
          <div className="mx-[5%] md:mx-[15%] lg:mx-[20%] xl:mx-[24%] 2xl:mx-[28%]">
            <div className="flex  text-[16px] gap-2 mt-6 mb-2 ">
              <p className="flex gap-2 font-normal">
                By
                <span className="font-semibold">
                  {trendingArticles?.article?.name}
                </span>
                |
              </p>
              <div className="font-normal">
                {moment(trendingArticles?.article?.createdAt).format(
                  "MMMM D, YYYY"
                )}
              </div>
            </div>
            <p className=" font-medium mb-10 ">
              {trendingArticles?.article?.duration + "  read"}{" "}
            </p>
            <img
              src={trendingArticles?.article?.selectedFile}
              alt="bannerImg.png"
              // className="  w-[372px] h-[248px] lg:w-[675.56px] xl:h-[380px]"
              className=" w-full sm:h-[453px]"
            />
            <div className=" flex  justify-between  mt-3 ">
              <div className="flex gap-3 sm:gap-6">
                <button
                  className="flex gap-1  items-center"
                  onClick={handleLike}
                >
                  <Likes />
                  <p className="hidden sm:block">Likes</p>
                </button>
                <button
                  onClick={() => {
                    if (!user?.user?.userId) {
                      toast("Please sign in to comment on the post", {
                        icon: "🔒",
                      });
                    } else {
                      setCommentsActive(!commentsActive);
                    }
                  }}
                  className="flex gap-1  items-center"
                >
                  <CommentIcon />
                  <p>{commentsState?.length} </p>
                  <p className="hidden sm:block">
                    {commentsState?.length > 1 ? "Comments" : "Comment"}
                  </p>
                </button>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <button>
                  <EditNoteIcon />
                </button>
                <button>
                  <BookmarkBorderOutlinedIcon />
                </button>
                <button>
                  <IosShareIcon />
                </button>
                <button>
                  <PlayCircleOutlineOutlinedIcon />
                </button>
                <button>
                  <MoreHorizOutlinedIcon />
                </button>
              </div>
            </div>
          </div>

          {trendingArticles?.article?.content && editor && (
            <div>
              <EditorContent editor={editor} onMouseUp={handleFloatingMenu} />

              {selectedText && (
                <div
                  className="absolute bg-white shadow "
                  style={{
                    top: notePosition.top,
                    right: window.innerWidth <= 1280 ? "25px" : "10px",
                  }}
                >
                  <Notes
                    notePosition={notePosition}
                    setSelectedDisplayNoteIndex={setSelectedDisplayNoteIndex}
                    tagId={trendingArticles?.article?.tagId}
                    userId={user?.user?.userId}
                    setNotes={setNotes}
                    note={notes}
                    setSelectedText={setSelectedText}
                  />
                </div>
              )}

              {trendingArticles?.articleDetails?.notes?.map(
                (note: any, index: any) => (
                  <div key={index}>
                    {selectedNoteIndex === index ? (
                      <ClickAwayListener
                        onClickAway={() => setSelectedNoteIndex(null)}
                      >
                        <div
                          className="absolute bg-white shadow z-10"
                          style={{
                            top: note?.startOffset,
                            right: window.innerWidth <= 1280 ? "25px" : "10px",
                          }}
                        >
                          <DisplayNote
                            noteText={note?.content}
                            createdAt={note?.createdAt}
                          />
                        </div>
                      </ClickAwayListener>
                    ) : (
                      <Tooltip title="Note">
                        <span
                          onClick={() => setSelectedNoteIndex(index)}
                          className=" absolute cursor-pointer text-[30px] text-[#6B6B6B]"
                          style={{
                            top: note?.startOffset,
                            right: window.innerWidth <= 1280 ? "25px" : "400px",
                          }}
                        >
                          *
                        </span>
                      </Tooltip>
                    )}
                  </div>
                )
              )}

              {notes?.map((note: any, index: any) => (
                <div key={index}>
                  {selectedDisplayNoteIndex === index ? (
                    <ClickAwayListener
                      onClickAway={() => setSelectedDisplayNoteIndex(null)}
                    >
                      <div
                        className="absolute bg-white shadow z-10"
                        style={{
                          top: note?.position.top,
                          right: window.innerWidth <= 1280 ? "25px" : "10px",
                        }}
                      >
                        <DisplayNote
                          noteText={note?.content}
                          createdAt={note?.createdAt}
                        />
                      </div>
                    </ClickAwayListener>
                  ) : (
                    <Tooltip title="Note">
                      <span
                        onClick={() => setSelectedDisplayNoteIndex(index)}
                        className=" absolute cursor-pointer text-[30px] text-[#6B6B6B]"
                        style={{
                          top: note?.startOffset,
                          right: window.innerWidth <= 1280 ? "25px" : "400px",
                        }}
                      >
                        *
                      </span>
                    </Tooltip>
                  )}
                </div>
              ))}

              {menuSelectedText && (
                <div
                  className="absolute"
                  style={{ top: menuPosition.top, left: menuPosition.left }}
                >
                  <FloatingMenu
                    handleCreateHighlight={createHighlight}
                    handleAddNote={handleAddNote}
                    handleChatText={handleChatText}
                  />
                </div>
              )}
            </div>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default ArticleDetails;
