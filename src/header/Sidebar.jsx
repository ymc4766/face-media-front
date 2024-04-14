import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import {
  RiGithubFill,
  RiHome2Line,
  RiLoginCircleLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import Logout from "../userScreens/Logout";
import { useState } from "react";

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state?.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Small Screen Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 z-50 p-4 bg-gray-100">
        {isSidebarOpen ? (
          <RiMenuFoldLine className="text-3xl" onClick={toggleSidebar} />
        ) : (
          <RiMenuUnfoldLine className="text-3xl" onClick={toggleSidebar} />
        )}
      </div>

      {/* Large Screen Sidebar */}
      <div
        className={`hidden md:flex flex-col items-center min-w-12 sm:w-16 md:w-[100px] sticky top-0 left-0 h-screen py-8 overflow-y-auto border-r bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 ${
          isSidebarOpen ? "w-full" : "w-0"
        }`}
      >
        <div className=" h-full flex flex-col gap-3">
          <Link
            to="/"
            className="flex  justify-center p-2 rounded-full hover:bg-slate-600"
          >
            <RiGithubFill className="h-8 text-slate-200 w-8" />
          </Link>
          <Link
            to="/"
            className="flex  justify-center rounded-full p-2 hover:bg-slate-600"
          >
            <RiHome2Line size={23} className="h-8 text-slate-50" />
          </Link>
          <Link
            to="/"
            className="flex  justify-center rounded-full p-2 hover:bg-slate-600"
          >
            <AiFillHeart size={23} className="h-8 text-slate-50" />
          </Link>{" "}
          <Link
            to="/"
            className="flex  justify-center rounded-full p-2 hover:bg-slate-600"
          >
            <RiHome2Line size={23} className="h-8 text-slate-50" />
          </Link>
          {!userInfo && (
            <Link
              to="/"
              className="flex  justify-center rounded-full p-2 hover:bg-slate-600"
            >
              <RiLoginCircleLine size={29} className="h-8 text-orange-600" />
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <Logout />
        </div>
      </div>

      {/* Small Screen Sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 z-30 p-4 bg-gray-100 overflow-y-auto border-r bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 ${
          isSidebarOpen ? "w-full" : "w-0"
        }`}
      >
        <div className=" h-full flex flex-col gap-3">
          <Link
            to="/"
            className="flex  justify-center p-2 rounded-full hover:bg-slate-600"
          >
            <img className="h-8" src="./assets/github.svg" alt="github logo" />
          </Link>
          <Link
            to="/"
            className="flex  justify-center rounded-full p-2 hover:bg-slate-600"
          >
            <RiHome2Line size={23} className="h-8 text-slate-50" />
          </Link>
          <Link
            to="/"
            className="flex  justify-center rounded-full p-2 hover:bg-slate-600"
          >
            <AiFillHeart size={23} className="h-8 text-slate-50" />
          </Link>{" "}
          <Link
            to="/"
            className="flex  justify-center rounded-full p-2 hover:bg-slate-600"
          >
            <RiHome2Line size={23} className="h-8 text-slate-50" />
          </Link>
          {!userInfo && (
            <Link
              to="/"
              className="flex  justify-center rounded-full p-2 hover:bg-slate-600"
            >
              <RiLoginCircleLine size={29} className="h-8 text-orange-600" />
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
