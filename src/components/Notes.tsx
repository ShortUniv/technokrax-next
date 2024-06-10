import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { saveNotes } from "../actions/Article";
import moment from "moment";

export const DisplayNote = ({ noteText, createdAt }: any) => {
  function TimeAgo() {
    const time = moment(createdAt);
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
  const user = JSON.parse(localStorage.getItem("profile")!);

  return (
    <div className=" w-[300px] z-10 xl:w-[400px]">
      <div className="flex justify-between  bg-[#EDEDED] px-4 py-2">
        <div className="flex gap-2">
          <LockOutlinedIcon />
          <h3 className="text-[13px] font-normal ">PRIVATE NOTES</h3>
        </div>
        <p className="text-[13px] text-[#242424]">Learn More</p>
      </div>
      <div className="flex gap-2 px-4 py-2  justify-between">
        <div className="flex justify-between gap-2">
          <button>
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={user.user.name.charAt(0)}
              alt={user.user.name.charAt(0).toUpperCase()}
              style={{ backgroundColor: "purple" }}
            />
          </button>
          <div>
            <p className="text-[14px] text-[#242424] ">{user?.user.name}</p>
            <p className="text-[13px] text-[#6B6B6B]">{TimeAgo()}</p>
          </div>
        </div>
        <button className="text-[14px] text-[#6B6B6B]">Delete</button>
      </div>
      <div className="py-2 text-[14px] text-[#242424] mx-4">{noteText}</div>
    </div>
  );
};

const Notes = ({
  notePosition,
  tagId,
  userId,
  setNotes,
  note,
  setSelectedText,
  setSelectedDisplayNoteIndex
}: any) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile")!);
  const [noteText, setNoteText] = useState<any>("");

  const handleNoteSave = (e: any) => {
    e.preventDefault();

    dispatch<any>(
      saveNotes({
        note: noteText,
        top: notePosition.top,
        left: notePosition.left,
        tagId: tagId,
        userId: userId,
      })
    );
    const newNoteIndex = note.length; 
    setNotes((prevNotes: any) => [
      ...prevNotes,
      {
        content: noteText,
        position: { top: notePosition.top, left: 1100 },
        createdAt: Date.now(),
      },
    ]);
    setSelectedDisplayNoteIndex(newNoteIndex);
    setSelectedText("");
  };

  return (
    <div className="[400px] mb-10">
      <div className="flex justify-between  bg-[#EDEDED] px-4 py-2">
        <div className="flex gap-2">
          <LockOutlinedIcon />
          <h3 className="text-[13px] font-normal ">PRIVATE NOTES</h3>
        </div>
        <p className="text-[13px] text-[#242424]">Learn More</p>
      </div>
      <div className="flex gap-2 px-4 py-2">
        <button>
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={user.user.name.charAt(0)}
            alt={user.user.name.charAt(0).toUpperCase()}
            style={{ backgroundColor: "purple" }}
          />
        </button>
        <p className="text-[14px] text-[#242424] py-1">{user?.user.name}</p>
      </div>
      <textarea
        rows={5}
        placeholder="Write note here..."
        value={noteText}
        className="px-4 py-2 border-none focus:outline-none text-[13px] w-[360px] h-[104px] resize-none"
        onChange={(e) => setNoteText(e.target.value)}
      />
      <div className="flex justify-between px-4 py-2">
        <button className="text-[#1A8917] text-[14px]" onClick={handleNoteSave}>
          Save
        </button>
        <button
          className="text-[14px] text-[#6B6B6B]"
          onClick={() => setSelectedText("")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Notes;
