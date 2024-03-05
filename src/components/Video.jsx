import React, { useEffect } from "react";
import { ImageUrl } from "../assets/api/axios";
import videoIcon from "../assets/icons/video-icon.svg";
import { useState } from "react";
import { useRef } from "react";

const Video = ({ data, className }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlaying(!playing);
    videoRef.current.play();
  };

  const handlePaused = () => {
    videoRef.current.pause();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [data]);

  return (
    <div className={className}>
      {/* <div className="relative w-full h-[35vh]"> */}
      {/* <div className="relative"> */}
      <video
        poster={`${ImageUrl}${data?.thumbnail}`}
        controls={playing}
        className=" w-full h-full object-fill rounded-md"
        // className="w-full h-40 object-contain"
        ref={videoRef}
      >
        <source src={data?.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!playing && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          onClick={handlePlay}
        >
          <img
            src={videoIcon}
            className="absolute w-12 h-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      )}
    </div>
  );
};

export default Video;
