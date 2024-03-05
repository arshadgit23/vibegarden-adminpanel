import React from "react";
import { FiImage } from "react-icons/fi";
import { ImageUrl } from "../assets/api/axios";

const ImageInputCard = ({ thumbnail, setThumbnail }) => {
  return (
    <div>
      <label htmlFor="thumbnail" className="relative cursor-pointer">
        <input
          type="file"
          id="thumbnail"
          style={{
            background: "black",
            position: "absolute",
            left: 0,
            width: "12vw",
            height: "23vh",
            opacity: 0,
          }}
          onChange={(e) => setThumbnail(e.target.files[0])}
          accept="image/*"
        />
        <div className="w-48 rounded-lg p-5 bg-[#E5ECE7] flex items-center justify-center">
          {thumbnail ? (
            <img
              src={
                typeof thumbnail === "string"
                  ? `${ImageUrl}${thumbnail}`
                  : URL.createObjectURL(thumbnail)
              }
              width={120}
              alt="video-thumbnail"
              className=" w-full h-40 object-contain"
            />
          ) : (
            <div className=" flex flex-col justify-center items-center">
              <div className="w-28 h-28 border-dashed border-2 border-[#1C5C2E] rounded-lg flex flex-col justify-center items-center">
                <FiImage color="#1C5C2E" size={40} />
              </div>
              <p className="text-[gray] text-[14px] text-center mt-5">
                <span className="underline text-[#1C5C2E] font-medium mr-1">
                  Upload
                </span>
                or Drag Thumbnail Image Here
              </p>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default ImageInputCard;
