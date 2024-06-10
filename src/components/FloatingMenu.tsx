import EditIcon from "@mui/icons-material/Edit";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import TwitterIcon from "@mui/icons-material/Twitter";
import NoteIcon from "@mui/icons-material/Note";
import tut from "../assets/tut2.svg"
import Image from "next/image";


const FloatingMenu = ({ handleCreateHighlight, handleAddNote, handleChatText }: any) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" flex bg-gradient-to-r from-[#434343] to-[#000000] gap-3 w-[220px] h-[40px] rounded-[5px] justify-center items-center">
        <button onClick={handleCreateHighlight}>
          <EditIcon style={{ color: "#FFFFFF" }} />
        </button>
        <button className="" onClick={handleChatText}>
          {/* chatbot */}
          <Image
            src={tut}
            className="w-8 h-8 mt-2"
            alt="React logo"
          />
        </button>
        <button>
          <ModeCommentIcon style={{ color: "#FFFFFF" }} />
        </button>
        <button>
          <TwitterIcon style={{ color: "#FFFFFF" }} />
        </button>
        <div
          style={{
            borderLeft: "1px solid gray",
            height: "35px",
            margin: "0 6px",
          }}
        ></div>
        <button onClick={handleAddNote}>
          <NoteIcon style={{ color: "#FFFFFF" }} />
        </button>
      </div>
      <div
        className="w-0 h-0
  border-l-[5px] border-l-transparent
  border-t-[10px] border-black
  border-r-[5px] border-r-transparent"
      ></div>
    </div>
  );
};

export default FloatingMenu;
