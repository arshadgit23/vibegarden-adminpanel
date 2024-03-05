import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { ImageUrl } from "../assets/api/axios";

const UserProfile = ({ setOpenProfile, openProfile, setToken }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const user = useSelector((state) => state.user);

  return (
    <div className="nav-item absolute right-1 mt-4 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 shadow-lg border border-cyan-700">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          Admin Profile
        </p>

        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
          handleClick={() => setOpenProfile(!openProfile)}
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={`${ImageUrl}${user?.photo}`}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200 capitalize">
            {user?.firstName + " " + user?.lastName}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400 capitalize">
            {user?.role}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {user?.email}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            onClick={() => {
              navigate(item.action);
              setOpenProfile(!openProfile);
            }}
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          handleClick={() => {
            localStorage.clear();
            setToken("");
            dispatch(logout());
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default UserProfile;
