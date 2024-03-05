import React from "react";

const SuccessMessage = ({ children }) => {
  return (
    <p className=" text-green capitalize text-center text-xl font-bold my-2">
      {children}
    </p>
  );
};

export default SuccessMessage;
