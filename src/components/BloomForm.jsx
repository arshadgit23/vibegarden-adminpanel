import React from "react";
import Button from "./Button";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import ImageInputCard from "./ImageInputCard";
import VideoInputCard from "./VideoInputCard";
import Container from "./Container";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import apicall, { ImageUrl } from "../assets/api/axios";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "./SectionTitle";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import { setDisableSidebar } from "../store/reducers/sidebarSlice";
import { useDispatch } from "react-redux";

const BloomForm = ({
  freshBloomData = {},
  updateFunction,
  // mainError,
  // successMessage,
  // submitLoading,
  videoUrl,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(freshBloomData.title || "");
  const [description, setDescription] = useState(
    freshBloomData.description || ""
  );
  const [postedDate, setPostedDate] = useState(
    moment(freshBloomData.postedDate).format("YYYY-MM-DD") || ""
  );
  const [thumbnail, setThumbnail] = useState(
    `${freshBloomData.thumbnail}` || ""
  );
  const [mainVideo, setMainVideo] = useState(freshBloomData.video);
  const [selectedTags, setSelectedTags] = useState(
    freshBloomData?.tags?.map((tag) => ({ label: tag.name, value: tag._id })) ||
      []
  );
  const [submitLoading, setSubmitLoading] = useState(false);
  const [mainError, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (videoUrl) {
      const uploadToAWS = async () => {
        dispatch(setDisableSidebar(true));
        try {
          setSubmitLoading(true);
          await axios.put(videoUrl, mainVideo, {
            headers: {
              "Content-Type": mainVideo.type,
            },
          });
          setSubmitLoading(false);
          setSuccessMessage("Video Updated Successfully");
          setTimeout(() => {
            navigate("/FreshBlooms");
            dispatch(setDisableSidebar(false));
          }, 2000);
        } catch (error) {
          setError(error.message);
          setSubmitLoading(false);
          dispatch(setDisableSidebar(false));
        }
      };
      uploadToAWS();
    }
  }, [videoUrl]);

  // const {
  //   data: allTags,
  //   isLoading: tagsLoading,
  //   error: tagsError,
  // } = useQuery({
  //   queryKey: ["getAllTags"],
  //   queryFn: async () => {
  //     return await apicall(`/tags?type=bloom`);
  //   },
  // });

  useEffect(() => {
    const getAllTags = async () => {
      setTagsLoading(true);
      try {
        const response = await apicall.get(`/tags?type=bloom`);
        setAllTags(response);
        setTagsLoading(false);
      } catch (error) {
        setError(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error.message
        );
      }
    };
    getAllTags();
  }, []);

  const updateBloomVideo = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const updatedBloomVideo = new FormData();
    updatedBloomVideo.append("title", title);
    updatedBloomVideo.append("description", description);
    updatedBloomVideo.append(
      "tags",
      JSON.stringify(selectedTags?.map((tag) => tag.value))
    );
    updatedBloomVideo.append("thumbnail", thumbnail);
    updatedBloomVideo.append("videoType", "bloom");
    if (typeof mainVideo === "object") {
      updatedBloomVideo.append("isVideo", true);
    }
    updatedBloomVideo.append("postedDate", postedDate);
    await updateFunction(updatedBloomVideo);
    if (typeof mainVideo !== "object") {
      setTimeout(() => {
        setSubmitLoading(false);
        setSuccessMessage("Bloom Updated Successfully");
      }, 1000);
      setTimeout(() => {
        navigate("/FreshBlooms");
      }, 2000);
    }
  };
  return (
    <Container
      backButton={true}
      //   isLoading={tagsloading}
      // error={error}
    >
      <SectionTitle>Enter Video Details</SectionTitle>
      <form onSubmit={updateBloomVideo}>
        <div className=" flex p-5">
          <div className=" w-1/2 h-[35vh] flex flex-col justify-around">
            <input
              type="text"
              placeholder="Title"
              className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            <textarea
              placeholder="Description"
              className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>

            {tagsLoading ? (
              <Loader />
            ) : (
              <Select
                isMulti={true}
                options={allTags?.data?.data?.map((tag) => ({
                  label: tag.name,
                  value: tag._id,
                }))}
                className=" rounded-md border border-gray outline-none w-full"
                onChange={setSelectedTags}
                defaultValue={selectedTags}
                placeholder={"Add Tags and Topics..."}
              />
            )}

            <input
              type="date"
              className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
              onChange={(e) => setPostedDate(e.target.value)}
              value={postedDate}
            />
          </div>

          <div className=" w-1/2">
            <div className=" w-full flex items-center gap-5 justify-center ">
              <ImageInputCard
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
              />
              <VideoInputCard
                mainVideo={mainVideo}
                setMainVideo={setMainVideo}
              />
            </div>
          </div>
        </div>

        <div className="md:flex md:space-x-4 mt-5 mb-5 ml-5">
          <Button
            text={submitLoading ? <Loader /> : "Save"}
            bgColor="#359D9E"
            color="#fff"
            borderRadius="10px"
            height="50px"
            width="150px"
            type="submit"
          />
          <Button
            text="Cancel"
            bgColor="white"
            shadow={`1px 2px 9px #00000029`}
            color="#EF3A71"
            width={150}
            borderRadius={10}
            handleClick={() => navigate(-1)}
          />
        </div>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {mainError && <ErrorMessage>{mainError}</ErrorMessage>}
      </form>
    </Container>
  );
};

export default BloomForm;
