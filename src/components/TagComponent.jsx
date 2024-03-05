import React from "react";

const TagComponent = ({ tagName }) => {
  return (
    <p className="bg-[#75997E]/50 text-[12px] text-[#1C5C2E] py-1 px-2 rounded-xl capitalize">
      {tagName}
    </p>
  );
};

export default TagComponent;
