import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2">
      <Button
        icon={<BsArrowLeft color="#0069FF" size={25} />}
        text="Back"
        color="#0069FF"
        borderRadius="10px"
        height="20px"
        handleClick={() => navigate(-1)}
      />
    </div>
  );
};

export default BackButton;
