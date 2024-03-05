import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
// import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import logo from "../assets/images/logo.png";
import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const { sidebarDisabled } = useSelector((state) => {
    return state?.sidebar;
  });

  if (sidebarDisabled) {
    window.onbeforeunload = () => true;
  } else {
    window.onbeforeunload = undefined;
  }

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2 fill-blue-500";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-[#1c5c2e] dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div
      className=" h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10"
      style={{ backgroundColor: "#E5ECE7" }}
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/home"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              {/* <SiShopware /> */}
              <img src={logo} alt="logo" />
            </Link>
            {/* <TooltipComponent content="Menu" position="BottomCenter"> */}
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden bg-[]"
            >
              <MdOutlineCancel />
            </button>
            {/* </TooltipComponent> */}
          </div>
          <div
            className={
              sidebarDisabled ? "pointer-events-none opacity-60 mt-10" : "mt-10"
            }
          >
            {/* <div className="mt-10"> */}
            {links.map((item, index) => (
              <div key={index}>
                <p className=" m-3 mt-2 uppercase">{item.title}</p>
                {item.links.map((link, index) => (
                  <NavLink
                    to={`/${link.linkName}`}
                    key={index}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    // className={
                    //   `{isActive ? activeLink : normalLink}`
                    // }
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <span className=" h-8 w-8">{link.icon}</span>
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
