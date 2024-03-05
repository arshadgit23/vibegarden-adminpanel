import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "../../components";
import ButtonsHeader from "../../components/ButtonsHeader";
import { useNavigate } from "react-router-dom";
import { FiImage, FiLink, FiVideo } from "react-icons/fi";
import roundImg from "../../assets/images/profileImg.png";
import { HiPlusCircle } from "react-icons/hi";
import { BsArrowLeft } from "react-icons/bs";
import apicall from "../../assets/api/axios";
import { TagsInput } from "react-tag-input-component";
import "./style.css";
import Container from "../../components/Container";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import axios from "axios";
import Select from "react-select";
import Modal from "react-overlays/Modal";
import { ImageUrl } from "../../assets/api/axios";
import AppMenu from "../../components/AppMenu";
import cancelIcon from "../../assets/cancel.png";
import { setDisableSidebar } from "../../store/reducers/sidebarSlice";
import { useDispatch } from "react-redux";

const AddVideo = () => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  const [teacher, setTeachers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [mainVideo, setMainVideo] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [mainError, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [tagsloading, setTagsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videosId, setVideosId] = useState([]);
  const [teachersId, setTeachersId] = useState([]);
  const [teacherToggle, setTeacherToggle] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const [videoType, setVideoType] = useState("");
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");
  const [displayUrl, setDisplayUrl] = useState("");
  const [editTeacher, setEditTeacher] = useState("");
  const [teacherNotes, setTeacherNotes] = useState([]);
  const [teacherNotesLoader, setTeacherNotesLoader] = useState(false);
  const dispatch = useDispatch();

  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const descriptionRef = useRef(null);
  const videoRef = useRef(null);
  // const imageRef = useRef(null);
  // const mainVideoRef = useRef(null);
  const resourceDescription = useRef(null);
  const resourceTitle = useRef(null);
  const resourceLink = useRef(null);

  // useEffect(() => {
  //   if (teacherToggle) {
  //     setTeachersId((prev) => [...prev, teacherId]);
  //   } else if (!teacherId) {
  //     setTeachersId((prev) => [...prev]);
  //   } else {
  //     setTeachersId((prev) => {
  //       const list = [...prev];
  //       const filteredList = list.filter((id) => id !== teacherId);
  //       return filteredList;
  //     });
  //   }
  // }, [teacherToggle, teacherId]);

  const addTeacherNotesAndLinks = () => {
    if (!notes && !url && !displayUrl) {
      alert("Fill out all the fields");
      return;
    }

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
    if (teacherToggle) {
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

  useEffect(() => {
    const getTeachers = async () => {
      const response = await apicall.get("/users?role=teacher");
      setTeachers(response.data.data);
    };
    getTeachers();

    const getCategories = async () => {
      try {
        const response = await apicall.get("/categories?type=groundwork");
        if (response.status === 200) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

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
            navigate("/GroundworkVideos");
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
        const response = await apicall.get(`/tags/admin/all`);
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

  const submitHandler = async (e) => {
    e.preventDefault();
    const allTags = selectedTags.map((tag) => tag?.value);
    const toolsVideo = new FormData();
    toolsVideo.append("title", titleRef.current.value);
    toolsVideo.append("description", descriptionRef.current.value);
    toolsVideo.append("tags", JSON.stringify(allTags));
    toolsVideo.append("thumbnail", thumbnail);
    toolsVideo.append("videoType", "groundwork");
    toolsVideo.append(
      "additionalResources",
      JSON.stringify({
        title: resourceTitle.current.value,
        description: resourceDescription.current.value,
        link: resourceLink.current.value,
      })
    );
    toolsVideo.append("isVideo", true);
    toolsVideo.append("category", category);
    toolsVideo.append("relatedContent", JSON.stringify(videosId));
    // toolsVideo.append("teachers", JSON.stringify(teachersId));
    toolsVideo.append("teachers", JSON.stringify(teacherNotes));

    if (thumbnail && mainVideo) {
      dispatch(setDisableSidebar(true));
      try {
        setError("");
        setSuccessMessage("");
        setSubmitLoading(true);
        const response = await apicall.post("videos/", toolsVideo, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setVideoUrl(response?.data?.data?.url);
        dispatch(setDisableSidebar(false));
      } catch (error) {
        setError(error?.response?.data?.message);
        setSubmitLoading(false);
        dispatch(setDisableSidebar(false));
      }
    } else {
      setError("Required fields are missing");
      dispatch(setDisableSidebar(false));
    }
  };

  const data = tags.map((tag) => ({
    value: tag._id,
    label: tag.name,
  }));

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
          {videos?.map((val, ind) => (
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
                  : val?.description.substring(0, 80) + " ..."}
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
          ))}
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
  };

  const EditNotesModalHelper = (
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
          ></textarea>
        </div>

        <div>
          <label htmlFor="url">URL</label>
          <input
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder="URL"
            className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
          />
        </div>

        <div>
          <label htmlFor="display-url">Display URL</label>
          <input
            onChange={(e) => setDisplayUrl(e.target.value)}
            type="text"
            placeholder="Display URL"
            className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
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

  return (
    <>
      {modalHelper}
      {EditNotesModalHelper}
      <Container backButton={true}>
        <h1 className="font-bold text-4xl text-[#1C5C2E]">
          Enter Video Details
        </h1>
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
          <div className=" flex justify-around">
            <div className="p-5 w-1/2 flex flex-col justify-around">
              <input
                type="text"
                placeholder="Title"
                className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                ref={titleRef}
              />

              <select
                id=""
                className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                ref={categoryRef}
                onChange={() => setCategory(categoryRef.current.value)}
              >
                <option key="category" value="" hidden>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Description"
                className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                ref={descriptionRef}
              ></textarea>

              {/* <TagsInput
              value={tags}
              onChange={setTags}
              name="Tags"
              placeHolder="Add Tags & Topic"
            /> */}
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
                    />
                  </div>
                </div>

                <textarea
                  placeholder="Enter Description"
                  className="text-[#1C5C2E] outline-none w-full p-2 rounded-md text-[12px] md:text-[14px] mt-[10px] border border-gary-500 placeholder:text-[#1C5C2E]"
                  ref={resourceDescription}
                ></textarea>
              </div>
            </div>
            <div className=" w-1/2 flex flex-col justify-around p-3">
              <div className="flex justify-around ">
                <label htmlFor="thumbnail" className="relative cursor-pointer">
                  <input
                    type="file"
                    id="thumbnail"
                    style={{
                      background: "black",
                      position: "absolute",
                      width: "15vw",
                      height: "25vh",
                      left: 0,
                      opacity: 0,
                    }}
                    onMouseEnter={(e) => {
                      console.log(e.target.files);
                    }}
                    onChange={(e) => {
                      setThumbnail(e.target.files[0]);
                    }}
                    accept="image/*"
                  />
                  <div
                    className="w-[220px] h-[220px] rounded-lg bg-[#E5ECE7]"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {thumbnail ? (
                      <img src={URL.createObjectURL(thumbnail)} width={120} />
                    ) : (
                      <div className=" flex flex-col justify-center items-center">
                        <div
                          className="w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <FiImage color="#1C5C2E" size={40} />
                        </div>
                        <p className="text-[gray] text-[14px] text-center mt-5">
                          <span className="underline text-[#1C5C2E] font-medium mr-1">
                            Upload
                          </span>
                          or Drag Thumbnail <br /> Image Here
                        </p>
                      </div>
                    )}
                  </div>
                </label>
                {/* <div {...getRootProps()}>
              <input {...getInputProps()} />
              </div> */}

                <label htmlFor="video" className="relative">
                  <input
                    type="file"
                    id="video"
                    style={{
                      background: "black",
                      position: "absolute",
                      left: 0,
                      width: "15vw",
                      height: "25vh",
                      opacity: 0,
                    }}
                    onChange={(e) => setMainVideo(e.target.files[0])}
                    accept="video/*"
                  />
                  <div
                    className="w-[220px] h-[220px] rounded-lg bg-[#E5ECE7]"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {mainVideo ? (
                      <div className="  h-full w-full p-5">
                        <video
                          controls
                          className=" h-full w-full object-fill rounded-xl"
                        >
                          <source
                            src={URL.createObjectURL(mainVideo)}
                            type="video/webm"
                          />
                          <source
                            src={URL.createObjectURL(mainVideo)}
                            type="video/mp4"
                          />
                          Sorry, your browser doesn't support videos.
                        </video>
                      </div>
                    ) : (
                      <div className=" flex flex-col justify-center items-center">
                        <div
                          className="w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-xl"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <FiImage color="#1C5C2E" size={40} />
                        </div>
                        <p className="text-[gray] text-[14px] text-center mt-5">
                          <span className="underline text-[#1C5C2E] font-medium mr-1">
                            Upload
                          </span>
                          or Drag <br /> Video Here
                        </p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
              <div className="w-full h-[500px] my-5  border-solid border border-[gray] rounded-lg px-4 py-3 overflow-y-auto">
                <p className="text-[#1C5C2E] font-medium text-[20px] px-4 py-3">
                  Add Suggested Teachers
                </p>
                {teacher.map((teacher) => (
                  <div
                    key={teacher._id}
                    className="flex flex-row items-center py-1 "
                  >
                    <div className="flex items-center  border border-gray w-full  bg-[white] shadow-lg rounded-lg p-3">
                      <input
                        type="checkbox"
                        id={teacher?.id}
                        value={teacher?._id}
                        onChange={(e) => {
                          const id = e.target.value;
                          setTeacherToggle(e.target.checked);
                          setTeacherId(id);
                        }}
                        className=" w-1/4 bg-[#1C5C2E]"
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
                          onClick={() =>
                            teacherToggle &&
                            teacher._id === teacherId &&
                            showNotesModalHandler(teacher)
                          }
                          // className="text-[#0069FF] text-[14px] flex cursor-pointer"
                          className={`text-[#0069FF] text-[14px] flex ${
                            !(teacherToggle && teacher._id === teacherId)
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

export default AddVideo;
