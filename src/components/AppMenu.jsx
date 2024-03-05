import React, { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import Button from "./Button";

const AppMenu = ({ getFilterTerm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const setFilterTermHandler = (value) => {
    getFilterTerm(value);
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} style={{ float: "right" }}>
        <BiFilterAlt color="#1C5C2E" size={20} />
      </button>

      {isOpen && (
        <div className="w-[132px] h-[92px] cursor-pointer bg-[#FFFFFF] shadow-lg rounded-lg absolute right-5 flex flex-col justify-center pl-2">
          <ul>
            <li onClick={() => setFilterTermHandler("tool")}>Tools</li>
            <li onClick={() => setFilterTermHandler("groundwork")}>
              Ground work
            </li>
            <li onClick={() => setFilterTermHandler("bloom")}>Bloom</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AppMenu;
