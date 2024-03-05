import React from "react";
import { FaMobileAlt, FaDesktop } from "react-icons/fa";
import Button from "./Button";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";

const ButtonsHeader = ({
  addButton,
  addButtonLink,
  addButtonText,
  backButton,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end items-center h-16">
      {/* <div className="flex gap-2">
        <div className="  cursor-pointer w-16 h-16 bg-[#E5ECE7] rounded-lg flex flex-col justify-center items-center">
          <FaMobileAlt size={24} color="#75997E" />
          <span className="text-[#75997E] text-sm ">App</span>
        </div>
        <div className=" cursor-pointer w-16 h-16 bg-[#E5ECE7] rounded-lg flex flex-col justify-center items-center ">
          <FaDesktop size={24} color="#75997E" />
          <span className="text-[#75997E] text-sm ">Web</span>
        </div>
      </div> */}
      <div>
        {backButton && <BackButton />}
        {addButton && (
          <Button
            text={addButtonText}
            bgColor="#359D9E"
            color="#fff"
            borderRadius="10px"
            height="50px"
            width="150px"
            handleClick={() => navigate(`${addButtonLink}`)}
          />
        )}
      </div>
    </div>
  );
};

export default ButtonsHeader;
