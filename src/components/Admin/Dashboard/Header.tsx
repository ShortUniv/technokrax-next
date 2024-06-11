import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { AdminSidePanelData } from "../../../constants/sampleData";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Image from "next/image";

import Logo from "../../../assets/HeaderLogo.png";
import {
  MenuItem,
  Select,
  TextField,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Dashboard from "./Dashboard";
import  Link  from "next/link";

const TopPanel = () => {
  const mode = "dark";

  const user = JSON.parse(localStorage.getItem("profile")!);

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <>
      <div
        className={`flex items-center w-[100vw] h-[64px] bg-[#FFFFFF] justify-between border-b border-solid border-[rgba(0, 0, 0, 0.12)] overflow-hidden`}
      >
        <div
          className={`${isSidePanelOpen ? "ml-72" : "ml-36"} flex gap-8 relative `}
        >
          <button onClick={toggleSidePanel}>
            <MenuIcon />
          </button>
          <TextField
            label="Search By Article Id, name, Tags"
            variant="outlined"
            fullWidth
            size="small"
            InputProps={{
              sx: {
                width: "500px",
              },
            }}
          />
          <button className="absolute right-2 top-1 ">
            <SearchIcon />
          </button>
        </div>

        <div className="flex gap-8 mr-16 items-center">
          <Select sx={{ width: "150px" }} size="small" defaultValue="en">
            <MenuItem value="en">English</MenuItem>
            <MenuItem>German</MenuItem>
          </Select>

          <IconButton
           
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "transparent" : "#00000014",
            }}
          >
            {mode === "dark" ? (
              <Brightness4Icon
                sx={{
                  fill: "#000000DE",
                }}
              />
            ) : (
              <BrightnessHighIcon />
            )}
          </IconButton>

          <Typography
            fontSize={{
              xs: "12px",
              sm: "14px",
            }}
            variant="subtitle2"
          >
            {user?.user?.name}
          </Typography>
          <Avatar src={user?.avatar} alt={user?.name} />
        </div>
      </div>
      <SidePanel
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
      <Dashboard isSidePanelOpen={isSidePanelOpen} />
    </>
  );
};

const SidePanel = ({ isSidePanelOpen, setIsSidePanelOpen }: any) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full  bg-[#FFFFFF] border-r border-solid border-[rgba(0, 0, 0, 0.12)] z-50  duration-300 ${isSidePanelOpen ? "w-64" : "w-20"}`}
    >
      <div className="h-[64px] flex  justify-center border-b border-solid border-[rgba(0, 0, 0, 0.12)]">
        <div
          className={` ${!isSidePanelOpen && "max-w-20"}flex-shrink-0 flex items-center`}
        >
          <Image className="h-6 w-auto duration-500" src={Logo} alt="Logo" />
          <div
            className={`${!isSidePanelOpen && "scale-0"} duration-300 flex  gap-8`}
          >
            <Link href="/">
              <span className={`text-[#1D2BCA] text-2xl font-semibold ml-2`}>
                Techno
                <span className="text-[#F8990C] text-2xl font-semibold">
                  krax
                </span>
              </span>
            </Link>
            <button
              className="pl-2 mt-1"
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            >
              <KeyboardArrowLeftIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-8 ">
        {AdminSidePanelData.map((data: any,index:number) => (
          <div key={index} className="flex  gap-4 py-3  pl-6 hover:bg-blue-50 cursor-pointer">
            {data.img}
            <p
              className={`${!isSidePanelOpen && "hidden"} origin-left duration-200`}
            >
              {data.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div>
      <TopPanel />
    </div>
  );
};

export default Header;
