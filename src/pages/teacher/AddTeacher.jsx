import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components";
import ButtonsHeader from "../../components/ButtonsHeader";
import { useNavigate } from "react-router-dom";
import { FiImage } from "react-icons/fi";
import BackButton from "../../components/BackButton";
import apicall from "../../assets/api/axios";
import Loader from "../../components/Loader";
import Container from "../../components/Container";
import axios from "axios";
import { setDisableSidebar } from "../../store/reducers/sidebarSlice";
import { useDispatch } from "react-redux";

const AddTeacher = () => {
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const linkRef = useRef(null);
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [mainVideo, setMainVideo] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();

    if (!nameRef.current.value) {
      setError("Please Enter Name");
      return;
    } else if (!descriptionRef.current.value) {
      setError("Please Enter Description");
      return;
    } else if (!linkRef.current.value) {
      setError("Please Enter Link");
      return;
    } else if (!profile) {
      setError("Please Enter Image");
      return;
    }
    if (
      !nameRef.current.value ||
      !descriptionRef.current.value ||
      !linkRef.current.value ||
      !profile
    ) {
      setError("Please Fill All Fields");
      return;
    }

    const teacherData = new FormData();
    teacherData.append("teacherName", nameRef.current.value);
    teacherData.append("description", descriptionRef.current.value);
    teacherData.append("link", linkRef.current.value);
    teacherData.append("photo", profile);
    teacherData.append("isVideo", true);

    try {
      dispatch(setDisableSidebar(true));
      setLoading(true);
      const response = await apicall.post(
        "/users/create-teacher",
        teacherData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setVideoUrl(response?.data?.data?.url);
        setLoading(false);
        setMessage("Teacher Added");
        setTimeout(() => {
          setMessage("");
          navigate("/Teacher");
          dispatch(setDisableSidebar(false));
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
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
            navigate("/Teacher");
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
  //   Get http://192.168.100.116/api/v1/users?role=teacher
  // Post http://192.168.100.116/api/v1/users/create-teacher

  // body-->send form data

  // name
  // description
  // link
  // photo

  return (
    <Container backButton={true}>
      <h1 className="font-medium text-[#1C5C2E] text-3xl ">
        Enter Teacher Details
      </h1>
      <form onSubmit={(e) => handleClick(e)}>
        <div className="  flex items-center justify-between py-5">
          <div className="  px-8 w-1/2 h-full flex flex-col justify-center">
            <input
              type="text"
              placeholder="Name"
              className="px-4 py-3 focus:outline-none w-full rounded-md border border-gray mb-3"
              ref={nameRef}
            />

            <textarea
              placeholder="Description"
              className="px-4 py-3 focus:outline-none w-full rounded-md border border-gray mb-3"
              ref={descriptionRef}
            ></textarea>

            <input
              type="text"
              placeholder="Link"
              className="px-4 py-3 focus:outline-none w-full rounded-md border border-gray mb-3"
              ref={linkRef}
            />
          </div>
          <div className="w-1/2 flex flex-col justify-around p-3">
            <div className="flex justify-around ">
              <label
                htmlFor="teacher-image"
                className="relative cursor-pointer"
              >
                <input
                  type="file"
                  id="teacher-image"
                  style={{
                    background: "black",
                    position: "absolute",
                    left: 0,
                    width: "12vw",
                    height: "28vh",
                    opacity: 0,
                  }}
                  accept="image/*"
                  onChange={(e) => setProfile(e.target.files[0])}
                />
                <div
                  className="w-[220px] h-[220px] rounded-lg bg-[#f0f5f1] p-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {profile ? (
                    <img
                      src={URL.createObjectURL(profile)}
                      alt="profile-image"
                      height={150}
                      width={150}
                    />
                  ) : (
                    <div
                      className="w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        className="w-[100px] h-[100px] bg-[#E5ECE7] rounded-[15px]"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <FiImage color="#1C5C2E" size={40} />
                      </div>
                    </div>
                  )}

                  <p className="text-[#979B9F] text-[14px] text-center mt-5">
                    <span className="underline text-[#1C5C2E] font-medium mr-1">
                      Upload
                    </span>
                    or Drag Teacher <br /> Image Here
                  </p>
                </div>
              </label>
              <label htmlFor="video" className="relative cursor-pointer">
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
                  className="w-[220px] h-[220px] rounded-lg bg-[#f0f5f1] "
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {mainVideo ? (
                    <div className="h-full w-full p-5">
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
          </div>
        </div>

        <div>
          <div className="flex justify-start items-center px-3 py-3">
            <button className=" border border-green px-4 py-2 rounded-md hover:bg-green hover:text-white">
              {loading ? <Loader /> : "Submit"}
            </button>
            <Button
              text="Cancel"
              // bgColor="#359D9E"
              color="red"
              borderRadius="10px"
              height="50px"
              width="150px"
              handleClick={() => navigate(-1)}
            />
          </div>
          <div>{error && <p className=" text-red-500 text-sm">{error}</p>}</div>
        </div>
      </form>
      {message && (
        <p className=" text-2xl font-bold text-green text-center">{message}</p>
      )}
    </Container>
  );
};

export default AddTeacher;
