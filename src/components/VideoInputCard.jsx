import React from "react";
import { FiVideo } from "react-icons/fi";
import { useState, useEffect } from "react";
import Loader from "./Loader";

const VideoInputCard = ({ mainVideo, setMainVideo }) => {
  const [video, setVideo] = useState(false);
  const [loader, setLoader] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLoader(<Loader />);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [video]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLoader(false);
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [video]);

  return (
    <div>
      <label htmlFor="video" className="relative cursor-pointer">
        <input
          type="file"
          id="video"
          style={{
            background: "black",
            position: "absolute",
            left: 0,
            width: "12vw",
            height: "23vh",
            opacity: 0,
          }}
          onChange={(e) => {
            // const video = e.target.files[0];
            setMainVideo(e.target.files[0]);
            setVideo(!video);
          }}
          accept="video/*"
        />
        {loader || (
          <div className="w-48 p-5 rounded-lg bg-[#E5ECE7] flex justify-center items-center">
            {mainVideo ? (
              <div className=" h-full w-full">
                <video controls className=" h-40 w-full object-fill rounded-xl">
                  <source
                    src={
                      typeof mainVideo === "string"
                        ? mainVideo
                        : URL.createObjectURL(mainVideo)
                    }
                    type="video/mp4"
                  />
                  Sorry, your browser doesn't support videos.
                </video>
              </div>
            ) : (
              <div className=" flex flex-col justify-center items-center">
                <div className="w-28 h-28 border-dashed border-2 border-[#1C5C2E] rounded-xl flex justify-center items-center">
                  <FiVideo color="#1C5C2E" size={40} />
                </div>
                <p className="text-[gray] text-sm text-center capitalize mt-5">
                  <span className="underline text-[#1C5C2E] font-medium mr-1">
                    Upload
                  </span>
                  or Drag Thumbnail video Here
                </p>
              </div>
            )}
          </div>
        )}
      </label>
    </div>
  );
};

export default React.memo(VideoInputCard);
