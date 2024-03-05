import React from "react";

const ErrorMessage = ({ children }) => {
  return (
    <p className=" text-red-500 capitalize text-center text-xl font-bold my-2">
      {children}
    </p>
  );
};

export default ErrorMessage;
