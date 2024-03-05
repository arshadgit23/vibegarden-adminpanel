import React from "react";
import { Button } from "../../components";
import SuccessMessage from "../../components/SuccessMessage";
import ErrorMessage from "../../components/ErrorMessage";
import ImageInputCard from "../../components/ImageInputCard";
import VideoInputCard from "../../components/VideoInputCard";
import Container from "../../components/Container";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import apicall from "../../assets/api/axios";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle";
import axios from "axios";
import { useEffect, useRef } from "react";
import { FiVideo, FiLink } from "react-icons/fi";
import { ImageUrl } from "../../assets/api/axios";
import Modal from "react-overlays/Modal";
import AppMenu from "../../components/AppMenu";
import cancelIcon from "../../assets/cancel.png";
import { HiPlusCircle } from "react-icons/hi";
import { setDisableSidebar } from "../../store/reducers/sidebarSlice";
import { useDispatch } from "react-redux";

const GroundworkForm = ({
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
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState("");
  const categoryRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [videosId, setVideosId] = useState(
    freshBloomData?.relatedContent || []
  );
  const [loading, setLoading] = useState(false);
  const resourceDescription = useRef(null);
  const resourceTitle = useRef(null);
  const resourceLink = useRef(null);
  const [teacher, setTeachers] = useState([]);
  // const [teachersId, setTeachersId] = useState([]);
  const [teacherToggle, setTeacherToggle] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const [resourceTitleState, setResourceTitleState] = useState(
    freshBloomData?.additionalResources?.title || ""
  );
  const [resourceLinkState, setResourceLinkState] = useState(
    freshBloomData?.additionalResources?.link || ""
  );
  const [resourceDescriptionState, setResourceDescriptionState] = useState(
    freshBloomData?.additionalResources?.description || ""
  );
  const [videoType, setVideoType] = useState("");
  const [teacherNotes, setTeacherNotes] = useState([]);
  const [editTeacher, setEditTeacher] = useState("");
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");
  const [displayUrl, setDisplayUrl] = useState("");
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [teacherNotesLoader, setTeacherNotesLoader] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const dispatch = useDispatch();

  const previousTeachersId = freshBloomData?.teachers?.map(
    (teacher) => teacher?.teacherId?._id
  );

  useEffect(() => {
    const data = freshBloomData?.relatedContent?.map((item) => {
      return item._id;
    });
    setVideosId(data);
  }, []);

  useEffect(() => {
    let updatedTeacherNotes = [...teacherNotes];
    freshBloomData?.teachers?.map((teacher) => {
      if (previousTeachersId?.includes(teacher?.teacherId?._id)) {
        // setTeacherNotes([
        //   ...teacherNotes,
        //   {
        //     notes: teacher?.notes,
        //     url: teacher?.url,
        //     displayUrl: teacher?.displayUrl,
        //     teacherId: teacher?.teacherId?._id,
        //   },
        // ]);
        updatedTeacherNotes.push({
          notes: teacher?.notes,
          url: teacher?.url,
          displayUrl: teacher?.displayUrl,
          teacherId: teacher?.teacherId?._id,
        });
        setTeacherNotes(updatedTeacherNotes);
      }
      if (!selectedTeachers.includes(teacher?.teacherId?._id)) {
        setSelectedTeachers(previousTeachersId);
      } else {
        setTeacherNotes([...teacherNotes]);
      }
    });
  }, []);

  const addTeacherNotesAndLinks = () => {
    setTeacherNotesLoader(true);
    const updatedTeacherNotes = teacherNotes.map((item, ind) => {
      if (editTeacher._id == item.teacherId) {
        return {
          ...item,
          notes,
          url,
          displayUrl,
        };
      }
      return item;
    });
    setTeacherNotes(updatedTeacherNotes);

    setNotes("");
    setUrl("");
    setDisplayUrl("");
    setTimeout(() => {
      setTeacherNotesLoader(false);
      setShowNotesModal(false);
    }, 1000);
  };

  useEffect(() => {
    const existingNote = teacherNotes.find(
      (item) => item.teacherId === teacherId
    );
    if (teacherToggle && !existingNote) {
      setTeacherNotes([...teacherNotes, { notes, url, displayUrl, teacherId }]);
    } else if (!teacherId) {
      setTeacherNotes((prev) => [...prev]);
    } else {
      setTeacherNotes((prev) => {
        const list = [...prev];
        const filteredList = list.filter(
          (item) => item.teacherId !== teacherId
        );
        return filteredList;
      });
    }
  }, [teacherToggle, teacherId]);

  const getFilterTerm = (data) => {
    setVideoType(data);
  };

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      try {
        let params = {};
        if (videoType) {
          params = {
            videoType,
          };
        }
        const response = await apicall.get(`/videos/admin/all`, {
          params: params,
        });
        setVideos(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error.message
        );
        setLoading(false);
      }
    };

    getVideos();
  }, [videoType]);

  useEffect(() => {
    const getTeachers = async () => {
      const response = await apicall.get("/users?role=teacher");
      setTeachers(response.data.data);
    };
    getTeachers();

    const getCategories = async () => {
      try {
        const response = await apicall.get("/categories?type=tools");
        if (response.status === 200) {
          setCategories(response.data.data);
        }
      } catch (error) {
        setError(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error.message
        );
      }
    };
    getCategories();
  }, []);

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
            navigate("/GroundworkVideos");
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
  //     return await apicall(`/tags?type=groundwork`);
  //   },
  // });

  useEffect(() => {
    const getAllTags = async () => {
      setTagsLoading(true);
      try {
        const response = await apicall.get(`/tags?type=groundwork`);
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
  const updateToolVideo = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const updatedToolVideo = new FormData();
    updatedToolVideo.append("title", title);
    updatedToolVideo.append("description", description);
    updatedToolVideo.append(
      "tags",
      JSON.stringify(selectedTags?.map((tag) => tag.value))
    );
    updatedToolVideo.append(
      "additionalResources",
      JSON.stringify({
        title: resourceTitle.current.value,
        description: resourceDescription.current.value,
        link: resourceLink.current.value,
      })
    );
    updatedToolVideo.append("thumbnail", thumbnail);
    updatedToolVideo.append("videoType", "groundwork");
    // updatedToolVideo.append("isVideo", true);
    if (typeof mainVideo === "object") {
      updatedToolVideo.append("isVideo", true);
    }
    updatedToolVideo.append("relatedContent", JSON.stringify(videosId));
    updatedToolVideo.append("teachers", JSON.stringify(teacherNotes));
    // updatedToolVideo.append("teachers", JSON.stringify(teachersId));
    updateFunction(updatedToolVideo);
    setTimeout(() => {
      navigate("/GroundworkVideos");
      setSubmitLoading(false);
    }, 3000);
  };

  const renderBackdrop = (props) => <div className="backdrop2" {...props} />;

  const selectVideoHandler = (id) => {
    setVideosId((prev) => {
      if (prev.includes(id)) {
        return prev.filter((videoId) => videoId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const insertVideoHandler = (e) => {
    setShowModal(false);
  };

  const handleCheckbox = (e) => {
    const id = e.target.value;
    setTeacherToggle(e.target.checked);
    if (e.target.checked) {
      setSelectedTeachers([...selectedTeachers, id]);
    } else {
      setSelectedTeachers(
        selectedTeachers.filter((selectedId) => selectedId !== id)
      );
    }
    setTeacherId(id);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: " 50%",
    transform: "translate(-50%, -50%)",
    minWidth: "65vw",
  };

  const modalHelper = (
    <Modal
      style={modalStyle}
      className="modal overflow-auto p-3 "
      show={showModal}
      onHide={() => setShowModal(false)}
      renderBackdrop={renderBackdrop}
    >
      <div>
        <AppMenu getFilterTerm={getFilterTerm} />
        <div className="md:flex flex-row justify-between">
          <div className="flex m-2">
            {/* <BackButton /> */}
            <p className="text-2xl  font-semibold leading-tight mt-[5px]">
              Add Video for related content:
            </p>
          </div>
          {/* <div className='m-5'>
              <select id="small" onChange={e => {}} class="block p-2 mb-6 w-full text-md  text-[white] bg-[#1C5C2E] rounded-lg outline-none">
                  <option className='bg-[white] text-[black] py-4 rounded-lg' value="tool" selected>Tools</option>
                  <option className='bg-[white] text-[black] rounded-lg' value="groundwork" >Groundwork</option>
                  <option className='bg-[white] text-[black] rounded-lg' value="bloom">Bloom</option>
              </select>
          </div> */}
        </div>
        <div class="md:grid grid-cols-4 gap-2 overflow-y-auto">
          {videos
            ?.filter((video) => video._id !== freshBloomData?._id)
            ?.map((val, ind) => {
              return (
                <div
                  id={val?._id}
                  onClick={() => selectVideoHandler(val?._id)}
                  key={ind}
                  className={`p-3 cursor-pointer bg-[white] shadow-lg shadow-[#00000029]-500/50 w-auto h-[300px] rounded-[20px] m-5 ${
                    videosId.includes(val?._id) && "relative"
                  }`}
                >
                  {videosId.includes(val?._id) && (
                    <img
                      className="absolute top-[-8px] right-[-13px] bg-#359D9E h-[35px] w-[35px]"
                      src={cancelIcon}
                    />
                  )}
                  <div>
                    <img
                      className="w-[100%] h-[20vh]"
                      src={`${ImageUrl}${val?.thumbnail}`}
                    />
                  </div>
                  <div className="flex justify-between mt-[5px] m-[5px]">
                    <p className="text-[14px]">{val?.title}</p>
                    <p className="text-[14px] text-[#75997E] capitalize">
                      {val?.videoType}
                    </p>
                  </div>
                  <p className="text-[11px] m-[5px]">
                    {val?.description.length < 20
                      ? val?.description
                      : val?.description.substring(0, 70) + " ..."}
                  </p>
                  <div className="flex">
                    {val?.tags?.map((tag) => (
                      <p
                        key={tag?._id}
                        className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]"
                      >
                        {tag?.name}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className="md:flex justify-end px-4 mt-5"
          onClick={insertVideoHandler}
        >
          <Button
            text="Insert Videos"
            bgColor="#359D9E"
            color="#fff"
            borderRadius={10}
            width={150}
            height={50}
          />
        </div>
      </div>
    </Modal>
  );

  const showNotesModalHandler = (teacher) => {
    setShowNotesModal(true);
    setEditTeacher(teacher);
    freshBloomData?.teachers?.map((prevTeacher) => {
      if (prevTeacher?.teacherId?._id == teacher._id) {
        setNotes(prevTeacher?.notes);
        setUrl(prevTeacher?.url);
        setDisplayUrl(prevTeacher?.displayUrl);
      }
    });
  };

  return (
    <>
      {modalHelper}
      {teacher.length ? (
        teacher?.map((teacher, i) => {
          if (teacher?._id === editTeacher._id) {
            return (
              <Modal
                style={{
                  position: "absolute",
                  top: "50%",
                  left: " 50%",
                  transform: "translate(-50%, -50%)",
                  minWidth: "50vw",
                }}
                className="modal overflow-auto p-3"
                show={showNotesModal}
                onHide={() => setShowNotesModal(false)}
                renderBackdrop={renderBackdrop}
              >
                <div className="flex flex-col gap-4 mx-4">
                  <h2 className="text-[#1c5c2e] text-[24px] mt-2 capitalize ">
                    {editTeacher.teacherName} - Edit Notes & Links
                  </h2>

                  <div className="flex flex-col">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Notes"
                      className="px-4 py-3 rounded-md border border-gray focus:outline-none"
                      value={notes !== undefined ? notes : teacher?.notes}
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="url">URL</label>
                    <input
                      onChange={(e) => setUrl(e.target.value)}
                      type="text"
                      placeholder="URL"
                      className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                      value={url !== undefined ? url : teacher?.url}
                    />
                  </div>

                  <div>
                    <label htmlFor="display-url">Display URL</label>
                    <input
                      onChange={(e) => setDisplayUrl(e.target.value)}
                      type="text"
                      placeholder="Display URL"
                      className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                      value={
                        displayUrl !== undefined
                          ? displayUrl
                          : teacher?.displayUrl
                      }
                    />
                  </div>

                  <Button
                    handleClick={addTeacherNotesAndLinks}
                    text={teacherNotesLoader ? <Loader /> : "Update"}
                    bgColor="#359D9E"
                    color="#fff"
                    borderRadius="10px"
                    height="50px"
                    width="150px"
                    type="submit"
                  />
                </div>
              </Modal>
            );
          }
        })
      ) : (
        <Modal
          style={{
            position: "absolute",
            top: "50%",
            left: " 50%",
            transform: "translate(-50%, -50%)",
            minWidth: "50vw",
          }}
          className="modal overflow-auto p-3"
          show={showNotesModal}
          onHide={() => setShowNotesModal(false)}
          renderBackdrop={renderBackdrop}
        >
          <div className="flex flex-col gap-4 mx-4">
            <h2 className="text-[#1c5c2e] text-[24px] mt-2 capitalize ">
              {editTeacher.teacherName} - Edit Notes & Links
            </h2>

            <div className="flex flex-col">
              <label htmlFor="notes">Notes</label>
              <textarea
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                className="px-4 py-3 rounded-md border border-gray focus:outline-none"
                value={notes}
              ></textarea>
            </div>

            <div>
              <label htmlFor="url">URL</label>
              <input
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                placeholder="URL"
                className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                value={url}
              />
            </div>

            <div>
              <label htmlFor="display-url">Display URL</label>
              <input
                onChange={(e) => setDisplayUrl(e.target.value)}
                type="text"
                placeholder="Display URL"
                className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                value={displayUrl}
              />
            </div>

            <Button
              handleClick={addTeacherNotesAndLinks}
              text={teacherNotesLoader ? <Loader /> : "Update"}
              bgColor="#359D9E"
              color="#fff"
              borderRadius="10px"
              height="50px"
              width="150px"
              type="submit"
            />
          </div>
        </Modal>
      )}
      <Container
        backButton={true}
        //   isLoading={tagsloading}
        // error={error}
      >
        <SectionTitle>Enter Video Details</SectionTitle>
        <form onSubmit={updateToolVideo}>
          <div className=" flex justify-around">
            <div className="p-5 w-1/2 flex flex-col justify-around">
              <input
                type="text"
                placeholder="Title"
                className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />

              <select
                id=""
                className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                ref={categoryRef}
                onChange={() =>
                  setCategory(
                    categoryRef.current.value || freshBloomData?.category
                  )
                }
              >
                <option
                  key="category"
                  value={
                    freshBloomData?.category?.title
                      ? freshBloomData?.category?.title
                      : ""
                  }
                  hidden
                >
                  {freshBloomData?.category?.title
                    ? freshBloomData?.category?.title
                    : "Select Category"}
                </option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Description"
                className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>

              {/* <TagsInput
              value={tags}
              onChange={setTags}
              name="Tags"
              placeHolder="Add Tags & Topic"
            /> */}
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
              <div className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full">
                <p className="text-[gray]">Related Content</p>
                {/* {videosId} */}
                <label
                  htmlFor="related-content"
                  onClick={() => setShowModal(true)}
                >
                  <div
                    className="w-[60px] h-[60px] bg-[#E5ECE7] rounded-lg mt-[5px]"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <FiVideo color="#1C5C2E" size={25} />
                    <p className="text-[#1C5C2E] font-medium text-[12px]">
                      Add
                    </p>
                  </div>
                </label>

                {videosId.length > 0 && (
                  <p className="text-[gray]">Content Uploaded Successfully !</p>
                )}
                {/* <input
                type="file"
                id="related-content"
                style={{ display: "none" }}
                ref={videoRef}
              /> */}
              </div>

              <div className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full">
                <p className="text-[gray] mb-2">Additional Resources</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="text-[#1C5C2E] w-1/2 mr-1 outline-none p-2 rounded-md text-[12px] md:text-[14px] border border-gary-500 placeholder:text-[#1C5C2E]"
                    placeholder="Title"
                    ref={resourceTitle}
                    onChange={() =>
                      setResourceTitleState(resourceTitle?.current?.value)
                    }
                    value={resourceTitleState}
                  />
                  <div className="flex items-center w-1/2  justify-start rounded-md border border-gary-500 h-fit">
                    <FiLink
                      color="#1C5C2E"
                      size={16}
                      style={{ marginLeft: 5 }}
                    />
                    <input
                      type="text"
                      className="text-[#1C5C2E] w-1/2 outline-none p-2 rounded-md text-[12px] md:text-[14px] placeholder:text-[#1C5C2E]"
                      placeholder="Link"
                      ref={resourceLink}
                      onChange={() =>
                        setResourceLinkState(resourceLink?.current?.value)
                      }
                      value={resourceLinkState}
                    />
                  </div>
                </div>

                <textarea
                  placeholder="Enter Description"
                  className="text-[#1C5C2E] outline-none w-full p-2 rounded-md text-[12px] md:text-[14px] mt-[10px] border border-gary-500 placeholder:text-[#1C5C2E]"
                  ref={resourceDescription}
                  onChange={() =>
                    setResourceDescriptionState(
                      resourceDescription?.current?.value
                    )
                  }
                  value={resourceDescriptionState}
                ></textarea>
              </div>
            </div>
            <div className=" w-1/2 flex flex-col justify-around p-3">
              <div className=" w-1/2">
                <div className=" w-max ml-auto flex items-center gap-5 justify-center ">
                  <ImageInputCard
                    thumbnail={thumbnail}
                    setThumbnail={setThumbnail}
                  />
                  <VideoInputCard
                    mainVideo={mainVideo}
                    setMainVideo={setMainVideo}
                  />
                  {/* {video} */}
                </div>
              </div>

              <div className="w-full h-[500px] my-5  border-solid border border-[gray] rounded-lg px-4 py-3">
                <p className="text-[#1C5C2E] font-medium text-[20px] px-4 py-3">
                  Add Suggested Teachers
                </p>
                {teacher?.map((teacher) => (
                  <div
                    key={teacher._id}
                    className="flex flex-row items-center py-1 "
                  >
                    <div className="flex items-center  border border-gray w-full  bg-[white] shadow-lg rounded-lg p-3">
                      <input
                        type="checkbox"
                        id={teacher?.id}
                        value={teacher?._id}
                        // onChange={(e) => {
                        //   const id = e.target.value;
                        //   setTeacherToggle(e.target.checked);
                        //   setTeacherId(id);
                        // }}
                        onChange={handleCheckbox}
                        className=" w-1/4 bg-[#1C5C2E]"
                        // checked={teachersId?.includes(teacher?._id)}
                        checked={selectedTeachers.includes(teacher?._id)}
                      />
                      <div className="  w-1/4 flex justify-end px-6">
                        <img
                          src={`https://vibe-garden-development.s3.ap-south-1.amazonaws.com/${teacher.photo}`}
                          alt="img"
                          className="rounded-full h-16 w-16 object-contain"
                          // width="50"
                          // height="50"
                        />
                      </div>
                      <div className=" w-2/4">
                        <span className=" font-bold">
                          {teacher.teacherName}
                        </span>
                        <p
                          onClick={() => {
                            selectedTeachers.includes(teacher._id) &&
                              showNotesModalHandler(teacher);
                          }}
                          // className="text-[#0069FF] text-[14px] flex"
                          className={`text-[#0069FF] text-[14px] flex ${
                            !selectedTeachers.includes(teacher._id)
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer"
                          }`}
                        >
                          <HiPlusCircle size={20} /> Edit Notes & Links
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:flex space-x-4">
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
    </>
  );
};

export default GroundworkForm;

// {/* <Container
//       backButton={true}
//       //   isLoading={tagsloading}
//       // error={error}
//     >
//       <SectionTitle>Enter Video Details</SectionTitle>
//       <form onSubmit={updateToolVideo}>
//         <div className=" flex p-5">
//           <div className=" w-1/2 flex flex-col justify-around">
//             <input
//               type="text"
//               placeholder="Title"
//               className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
//               onChange={(e) => setTitle(e.target.value)}
//               value={title}
//             />

//             <textarea
//               placeholder="Description"
//               className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
//               onChange={(e) => setDescription(e.target.value)}
//               value={description}
//             ></textarea>

//             {tagsLoading ? (
//               <Loader />
//             ) : (
//               <Select
//                 isMulti={true}
//                 options={allTags?.data?.data?.map((tag) => ({
//                   label: tag.name,
//                   value: tag._id,
//                 }))}
//                 className=" rounded-md border border-gray outline-none w-full"
//                 onChange={setSelectedTags}
//                 defaultValue={selectedTags}
//                 placeholder={"Add Tags and Topics..."}
//               />
//             )}
//           </div>
//           <div className=" w-1/2">
//             <div className=" w-full flex items-center gap-5 justify-center ">
//               <ImageInputCard
//                 thumbnail={thumbnail}
//                 setThumbnail={setThumbnail}
//               />
//               <VideoInputCard
//                 mainVideo={mainVideo}
//                 setMainVideo={setMainVideo}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="md:flex md:space-x-4 mt-5 mb-5 ml-5">
//           <Button
//             text={submitLoading ? <Loader /> : "Save"}
//             bgColor="#359D9E"
//             color="#fff"
//             borderRadius="10px"
//             height="50px"
//             width="150px"
//             type="submit"
//           />
//           <Button
//             text="Cancel"
//             bgColor="white"
//             shadow={`1px 2px 9px #00000029`}
//             color="#EF3A71"
//             width={150}
//             borderRadius={10}
//             handleClick={() => navigate(-1)}
//           />
//         </div>
//         {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
//         {mainError && <ErrorMessage>{mainError}</ErrorMessage>}
//       </form>
//     </Container> */}
