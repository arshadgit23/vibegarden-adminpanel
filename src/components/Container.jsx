import React from "react";
import ButtonsHeader from "./ButtonsHeader";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const Container = ({
  children,
  backButton,
  addButton,
  addButtonLink,
  addButtonText,
  isLoading,
  error,
}) => {
  return (
    <div className=" bg-lime-50 h-[calc(100vh-6rem)] px-5 py-2 flex flex-col justify-between">
      <ButtonsHeader
        backButton={backButton}
        addButton={addButton}
        addButtonLink={addButtonLink}
        addButtonText={addButtonText}
      />
      <div className=" bg-white h-[calc(100%-5rem)] rounded-lg shadow-2xl py-5 px-8 overflow-auto">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Container;
