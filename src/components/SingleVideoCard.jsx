import React from "react";
import { ImageUrl } from "../assets/api/axios";
import videoIcon from "../assets/icons/video-icon.svg";
import { useNavigate } from "react-router-dom";
import Video from "./Video";
import TagComponent from "./TagComponent";

const SingleVideoCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      key={data._id}
      className=" shadow-xl w-60 rounded-xl cursor-pointer p-3"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/FreshBlooms/${data._id}`);
      }}
    >
      {/* <img
    src={`${ImageUrl}${data.thumbnail}`}
    className=" h-40 w-full object-contain"
  /> */}

      {/* <div className=" relative w-full h-40 ">
        <video
          poster={`${ImageUrl}${data.thumbnail}`}
          //   controls={true}
          className=" w-full h-40 object-fill rounded-t-xl"
        >
          <source src={data.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <img
          src={videoIcon}
          className="absolute w-12 h-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div> */}
      <div className=" w-full h-40">
        <Video data={data} className="relative w-full h-[20vh]" />
      </div>
      <div className=" py-2 ">
        <div className="flex justify-between mb-2">
          <p className=" text-md capitalize">{data.title}</p>
          <p className="text-md text-[#75997E] capitalize">{data.videoType}</p>
        </div>
        <p className="text-sm text-black/50">
          {data?.description.length < 20
            ? data?.description
            : data?.description.substring(0, 120) + " ..."}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {data.tags.map((tag) => (
            <TagComponent key={tag._id} tagName={tag.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleVideoCard;
