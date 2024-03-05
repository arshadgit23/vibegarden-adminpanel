import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChat } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
// import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import chat_icon from "../assets/icons/chat-icon.svg";
import bell_icon from "../assets/icons/bell-icon.svg";
import profile from "../assets/images/profileImg.png";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/userSlice";
import { ImageUrl } from "../assets/api/axios";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  // <TooltipComponent content={title} position="BottomCenter">

  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded p-4 ml-4 hover:bg-light-gray bg-[#E5ECE7]"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-4 w-4 -right-0 -top-0"
    />
    {icon}
  </button>
  // </TooltipComponent>
);

const Navbar = ({ setToken }) => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  const user = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);
  const [notification, setNotification] = useState(false);
  const [chat, setChat] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  const navigate = useNavigate();
  const todayDate = new Date();
  const options = { month: "long", day: "numeric", year: "2-digit" };
  const formattedDate = todayDate.toLocaleDateString("en-US", options);

  return (
    <div className="flex justify-between items-center py-3 px-8 relative h-24 ">
      {/* <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      /> */}

      <div>
        <h2 className="text-[#1c5c2e] text-[24px] mt-2 capitalize ">
          Welcome {user.lastName}
        </h2>
        <p className=" text-[#707070] text-sm">{formattedDate}</p>
      </div>

      {/* <input
        type="text"
        placeholder="Search here"
        className="rounded bg-[#E5ECE7] md:w-[32rem] w-[90%]  h-[50px] font-[14px] focus:outline-none px-5 "
        // style={{ width: "50%",}}
      /> */}

      <div className="flex items-center flex-wrap sm:flex-nowrap justify-around">
        {/* <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
        /> */}

        {/* <NavButton
          // title="Chat"
          dotColor="#EF3A71"
          customFunc={() => navigate("/chat")}
          color={currentColor}
          icon={<img src={chat_icon} width="20px" height="20px" />}
        /> */}

        {/* <NavButton
          // title="Notification"
          // dotColor="rgb(254, 201, 15)"
          customFunc={() => setNotification(!notification)}
          color={currentColor}
          icon={<img src={bell_icon} width="20px" height="20px" />}
        /> */}

        {/* <TooltipComponent content="Profile" position="BottomCenter"> */}
        <div
          className=" relative flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray "
          onClick={() => setOpenProfile(!openProfile)}
        >
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray ">
            <img
              className="rounded w-12 h-12 ml-4"
              src={`${ImageUrl}${user?.photo}`}
              alt="user-profile"
            />
            <p>
              <span className="text-[#1c5c2e] ml-1 text-14 capitalize ">
                {user?.firstName + " " + user?.lastName}
              </span>
              <br />
              <span className="text-gray-400 capitalize ">{user?.role}</span>
            </p>
          </div>
        </div>

        {/* </TooltipComponent> */}

        {/* {isClicked.cart && <Cart />} */}
        {/* {chat && <Chat />} */}

        {notification && (
          <Notification
            setNotification={setNotification}
            notification={notification}
          />
        )}

        {openProfile && (
          <UserProfile
            setOpenProfile={setOpenProfile}
            openProfile={openProfile}
            setToken={setToken}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
