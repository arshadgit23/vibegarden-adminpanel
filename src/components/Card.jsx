import React from "react";

import { useStateContext } from "../contexts/ContextProvider";

const Card = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  height
}) => {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <div
      style={{ backgroundColor: bgColor, color, borderRadius , width, height}}
      className={` text-${size} p-3 w-${width} h-${height} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </div>
  );
};

export default Card;
