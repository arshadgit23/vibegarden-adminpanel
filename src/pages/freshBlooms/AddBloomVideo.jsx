import React, { useState } from "react";
import { Button } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import apicall, { ImageUrl } from "../../assets/api/axios";
import Select from "react-select";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import axios from "axios";
import ImageCard from "../../components/ImageInputCard";
import VideoCard from "../../components/VideoInputCard";
import Container from "../../components/Container";
import { setDisableSidebar } from "../../store/reducers/sidebarSlice";
import { useDispatch } from "react-redux";

const AddBloomVideo = ({ bloomData, isLoading, error }) => {
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState("");
  const [mainVideo, setMainVideo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagsloading, setTagsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [mainError, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tags = selectedTags.map((tag) => tag.value);
    const bloomData = new FormData();
    bloomData.append("title", title);
    bloomData.append("description", description);
    bloomData.append("tags", JSON.stringify(tags));
    bloomData.append("thumbnail", thumbnail);
    bloomData.append("videoType", "bloom");
    bloomData.append("isVideo", true);
    if (mainVideo && thumbnail) {
      dispatch(setDisableSidebar(true));
      try {
        setError("");
        setSuccessMessage("");
        setSubmitLoading(true);
        const response = await apicall.post("/videos", bloomData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setVideoUrl(response.data.data.url);
        dispatch(setDisableSidebar(false));
      } catch (error) {
        setError(error.response.data.message);
        setSubmitLoading(false);
        dispatch(setDisableSidebar(false));
      }
    } else {
      setError("Required fields are missing");
      dispatch(setDisableSidebar(false));
    }
  };

  useEffect(() => {
    if (videoUrl) {
      const uploadToAWS = async () => {
        dispatch(setDisableSidebar(true));
        try {
          await axios.put(videoUrl, mainVideo, {
            headers: {
              "Content-Type": mainVideo.type,
            },
          });
          setSubmitLoading(false);
          setSuccessMessage("Video Added Successfully");
          setTimeout(() => {
            navigate("/FreshBlooms");
            dispatch(setDisableSidebar(false));
          }, 800);
        } catch (error) {
          setError(error.message);
          setSubmitLoading(false);
          dispatch(setDisableSidebar(false));
        }
      };
      uploadToAWS();
    }
  }, [videoUrl]);

  useEffect(() => {
    const getBloomTags = async () => {
      try {
        setTagsLoading(true);
        const response = await apicall.get(`/tags?type=bloom`);
        setTags(response.data.data);
        setTagsLoading(false);
      } catch (error) {
        const errorMessage = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        setError(errorMessage);
        setTagsLoading(false);
      }
    };
    getBloomTags();
  }, []);

  const data = tags.map((tag) => ({
    value: tag._id,
    label: tag.name,
  }));

  return (
    <Container
      backButton={true}
      isLoading={isLoading}
      // error={id ? mainError : false}
    >
      <h1 className="font-medium text-[#1C5C2E] text-[24px] m-5 mt-5">
        Enter Video Details
      </h1>
      <form onSubmit={handleSubmit}>
        <div className=" flex p-5">
          <div className=" w-1/2 flex flex-col justify-around">
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

            {tagsloading ? (
              <Loader />
            ) : (
              <Select
                isMulti={true}
                options={data}
                className=" rounded-md border border-gray outline-none w-full"
                onChange={setSelectedTags}
                defaultValue={selectedTags}
                placeholder={"Add Tags..."}
              />
            )}
          </div>
          <div className=" w-1/2">
            <div className=" w-full flex items-center gap-5 justify-center ">
              <ImageCard thumbnail={thumbnail} setThumbnail={setThumbnail} />
              <VideoCard mainVideo={mainVideo} setMainVideo={setMainVideo} />
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

export default AddBloomVideo;
