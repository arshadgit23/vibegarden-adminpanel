import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  height,
  outLine,
  shadow,
  border,
  fontSize,
  position,
  left,
  right,
  path,
  handleClick,
  margin,
  type = "button",
}) => {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
    
      type={type}
      onClick={() => (handleClick ? handleClick() : false)}
      style={{
        backgroundColor: bgColor,
        color,
        borderRadius,
        width,
        textDecoration: outLine,
        height,
        border,
        boxShadow: shadow,
        fontSize: fontSize,
        position,
        left,
        right,
        margin
      }}
      className={` text-${size} p-3 w-${width} flex items-center gap-2 justify-center shadow-${bgColor} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon && icon}
      {text && text}
    </button>
  );
};

export default Button;
