"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../assets/HeaderLogo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Avatar, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Notifications from "./Notifications";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SearchBar from "./SearchBar";
import { jwtDecode } from "jwt-decode";
import { navLinks, UserProfileOptions } from "../constants/sampleData";

interface DecodedToken {
  exp: number;
  iat: number;
  [key: string]: any;
}

interface User {
  user: {
    name: string;
  };
  token: string;
}
export const NavbarComponent = () => {
  const notifications = [1, 2, 4, 5];
  const noOfNotifications = notifications?.length;
const [user,setUser] = useState<any>(null)
  const router = useRouter();
  const [notificationActive, setNotificationActive] = useState(false);

  


  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("");

  const [showSearchBar, setShowSearchBar] = useState(false);
  
//   const setLocalStorage = () => {
//   const profile = {
//     user: {
//       name: "Abdul Almas",
//     token: "50f0959be7735106f2ebea8dbf896825df6040b9"
//   }
// }
// localStorage.setItem("profile", JSON.stringify(profile));
// }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const profile = localStorage.getItem("profile");
      if (profile) {
        const parsedProfile = JSON.parse(profile) as User;
        const token = parsedProfile.token;

        if (token) {
          const decodedToken = jwtDecode<DecodedToken>(token);

          if (
            decodedToken &&
            decodedToken.exp &&
            decodedToken.exp * 1000 < new Date().getTime()
          ) {
            handleLogout();
          }
        }

        setUser(parsedProfile);
      } else {
        setUser(null);
      }
    }
  }, [router]);

  const handleLogout = () => {
    router.push("/signin");
    localStorage.removeItem("profile");
    setUser(null);
  };
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const profile = localStorage.getItem("profile");
  //     setUser(profile ? JSON.parse(profile) : null);
  //   }
  // }, [router]);

  // const handleLogout = () => {
  //   router.push("/signin");
  //   setUser(null);
  // };

  return (
    <>
      <div className="bg-[#fff] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a href="/">
              <div className="flex-shrink-0 flex items-center">
                <Image className="h-8 w-auto" src={Logo} alt="Logo" />
                <span className="text-[#1D2BCA] text-lg font-semibold ml-2">
                  Techno
                  <span className="text-[#F8990C] text-lg font-semibold">
                    krax
                  </span>
                </span>
              </div>
            </a>
            <div className="flex items-center">
              <div className="hidden lg:block sm:ml-6">
                <div className="flex space-x-4 lg:max-xl:space-x-2">
                  <a
                    href="/"
                    className="text-[#242831]  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-[#242831] hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold"
                  >
                    Learn
                  </a>
                  <a
                    href="#"
                    className="text-[#242831] hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold"
                  >
                    News
                  </a>
                  <a
                    href="#"
                    className="text-[#242831] content-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold"
                  >
                    Tools
                  </a>
                  <a
                    href="#"
                    className="text-[#242831] hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold"
                  >
                    Community
                  </a>
                  <a
                    href="#"
                    className="text-[#242831] hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold md:text-wrap"
                  >
                    About Us
                  </a>
                </div>
              </div>
            </div>
            {!user ? (
              <div className="sm:flex sm:items-center sm:ml-6">
                <Link href="/signin">
                  <button className="hidden lg:flex ml-4 text-[#1D2BCA] px-4 py-2 text-sm font-medium">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="w-[150px] xs:w-[115px] xs:h-[40px] h-[47px] bg-[#1D2BCA] max-lg:absolute right-14 top-2 text-white rounded-[50px]">
                    Get Started
                  </button>
                </Link>
              </div>
            ) : (
              <div className="lg:flex hidden gap-6 w-[30%] lg:max-xl:gap-2">
                <div className="flex gap-6 items-center lg:max-xl:gap-2">
                  <Tooltip title="Write Article">
                    <Link href="/write">
                      <button className="flex">
                        <AddCircleIcon
                          fontSize="large"
                          className="text-gray-500 font-light"
                          style={{ fontSize: "45px" }}
                        />
                      </button>
                    </Link>
                  </Tooltip>
                  <div className="relative">
                    <Tooltip title="notifications">
                      <button
                        onClick={() =>
                          setNotificationActive(!notificationActive)
                        }
                      >
                        <CircleNotificationsIcon
                          fontSize="small"
                          style={{ fontSize: "45px"}}
                        />
                      </button>
                    </Tooltip>
                    {noOfNotifications > 0 && (
                      <div className="absolute flex top-0 w-5 h-5 bg-red-700 rounded-full text-white items-center justify-center right-0 text-sm">
                        {noOfNotifications}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex lg:gap-6">
                  <Tooltip title="My Profile">
                    <Link href="/profile">
                      <button>
                        <Avatar
                          src={user?.user?.name.charAt(0)}
                          alt={user?.user?.name.charAt(0).toUpperCase()}
                          style={{ backgroundColor: "purple" }}
                        />
                      </button>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Search">
                    <button onClick={() => setShowSearchBar(!showSearchBar)}>
                      <SearchOutlinedIcon
                        fontSize="medium"
                        style={{ fontSize: "35px" }}
                      />
                    </button>
                  </Tooltip>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-gray-700 to-black text-white w-40 rounded-lg transition duration-300 ease-in-out hover:from-black hover:to-gray-700 hidden lg:block"
                >
                  Log Out
                </button>
              </div>
            )}
            <div className="flex gap-2">
              {user && (
                <Tooltip title="Search" className="lg:hidden">
                  <button onClick={() => setShowSearchBar(!showSearchBar)}>
                    <SearchOutlinedIcon
                      fontSize="medium"
                      style={{ fontSize: "30px" }}
                    />
                  </button>
                </Tooltip>
              )}
              <div
                className="flex pl-1 lg:hidden"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? <CloseIcon /> : <MenuIcon />}
              </div>
              <div
                className={`${
                  !toggle ? "hidden" : "flex"
                } p-6 bg-[#FFFFFF] absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-20 rounded-xl shadow-xl`}
              >
                <ul className="list-none flex justify-end items-start flex-col gap-4">
                  {navLinks.map((link) => (
                    <li
                      key={link.id}
                      className={`${
                        active === link.title ? "text-[gray]" : "text-blue"
                      } font-poppins font-medium cursor-pointer text-[16px]`}
                      onClick={() => {
                        setToggle(!toggle);
                        setActive(link.title);
                      }}
                    >
                      <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                  ))}
                  {user && (
                    <>
                      <li>
                        <hr className="border-t border-gray-400 w-[100px]" />
                      </li>
                      {UserProfileOptions.map((link) => (
                        <li
                          key={link.id}
                          className={`${
                            active === link.title ? "text-[gray]" : "text-blue"
                          } font-poppins font-medium cursor-pointer text-[16px]`}
                          onClick={() => {
                            setToggle(!toggle);
                            setActive(link.title);
                          }}
                        >
                          <a href={`/${link.id}`}>{link.title}</a>
                        </li>
                      ))}
                      <button
                        className="flex gap-2 font-semibold"
                        onClick={handleLogout}
                      >
                        Logout
                        <PowerSettingsNewIcon />
                      </button>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {notificationActive && <Notifications />}
        <SearchBar
          SearchBar={showSearchBar}
          setShowSearchBar={setShowSearchBar}
        />
      </div>
    </>
  );
};
