'use client'
import { useState,useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import { saveComment } from "@/actions/Article";
import { useDispatch } from "react-redux";
import moment from "moment";


interface User {
  user: {
    userId: string;
    name: string;
  };
}

const ArticleComments = ({
  commentsActive,
  setCommentsActive,
  tagId,
  commentsState,
  setCommentsState,
}: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);
  const [comments, setComments] = useState<any>("");
  const dispatch = useDispatch();

  const saveComments = () => {
    dispatch<any>(
      saveComment({
        comment: comments,
        userId: user?.user?.userId,
        name: user?.user?.name,
        tagId: tagId,
      })
    );
    setCommentsState((prev: any) => [
      ...prev,
      {
        userId: user?.user?.userId,
        name: user?.user?.name,
        comment: comments,
        commentedAt: Date.now(),
      },
    ]);
    setComments("");
  };

  function TimeAgo(commentedAt: any) {
    const time = moment(commentedAt);
    const differenceInMinutes = moment().diff(time, "minutes");

    if (differenceInMinutes < 1) {
      return <span>just now</span>;
    } else if (differenceInMinutes < 60) {
      return (
        <span>
          about {differenceInMinutes} minute
          {differenceInMinutes !== 1 ? "s" : ""} ago
        </span>
      );
    } else if (differenceInMinutes < 1440) {
      const hours = Math.floor(differenceInMinutes / 60);
      return (
        <span>
          about {hours} hour{hours !== 1 ? "s" : ""} ago
        </span>
      );
    } else {
      const days = Math.floor(differenceInMinutes / 1440);
      return (
        <span>
          about {days} day{days !== 1 ? "s" : ""} ago
        </span>
      );
    }
  }

  return (
    <>
      <div className="relative">
        <div
          className={`fixed inset-0 bg-black opacity-10 z-10 ${commentsActive ? "" : "hidden"}`}
        ></div>
        <div
          className={`fixed top-0 right-0 ${commentsActive ? "" : "translate-x-full"} transition-transform duration-700 ease-in-out z-20 w-[80%] sm:w-[50%] lg:w-[40%] xl:w-[27%] h-full bg-[#FFFFFF] shadow-lg p-6 overflow-y-scroll`}
        >
          <div className="flex justify-between">
            <h2 className="text-[20px] text-[#242424] font-semibold">
              {" "}
              Comments ({commentsState?.length})
            </h2>
            <button>
              <CloseIcon
                fontSize="large"
                className="text-[#6B6B6B] hover:text-gray-800"
                onClick={() => {
                  setCommentsActive(!commentsActive);
                }}
              />
            </button>
          </div>

          <div
            className=" h-[250px]   rounded-md"
            style={{ boxShadow: "rgba(0,0,0,0.12) 0 2px 8px" }}
          >
            <div className="flex gap-3 px-4 py-4 mt-6">
              <button>
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src={user?.user?.name.charAt(0)}
                  alt={user?.user?.name.charAt(0).toUpperCase()}
                  style={{ backgroundColor: "purple" }}
                />
              </button>
              <p className="text-[14px] text-[#242424] py-1">
                {user?.user.name}
              </p>
            </div>
            <textarea
              rows={5}
              placeholder="Write your comment..."
              className="px-4 py-2 border-none focus:outline-none text-[13px] w-full h-[104px] resize-none"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />

            <div className="flex justify-between px-4 py-2">
              <button
                className="bg-[#1A8917] py-2 px-3 text-white  rounded-xl text-[14px] hover:bg-green-800"
                onClick={saveComments}
              >
                Comment
              </button>
              <button
                className="text-[14px] text-[#6B6B6B]"
                onClick={() => setComments("")}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-[16px] text-[#242424] font-medium uppercase">
              {" "}
              Top Comments
            </h3>
            <hr className="h-[2px] bg-[#6B6B6B]  opacity-20 my-2" />
            {commentsState?.map((data: any,index:number) => (
              <div key={index} className="mt-4">
                <div className="flex gap-8">
                  <button>
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={data.name.charAt(0)}
                      alt={data.name.charAt(0).toUpperCase()}
                      style={{ backgroundColor: "purple" }}
                    />
                  </button>
                  <div>
                    <div>
                      <p className="text-[14px] text-[#242424] ">{data.name}</p>
                      <p className="text-[13px] text-[#6B6B6B]">
                        {TimeAgo(data.commentedAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-[14px] text-[#242424] font-medium mt-6">
                  {data.comment}
                </p>
                <hr className="h-[2px] bg-[#6B6B6B]  opacity-10 my-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleComments;
