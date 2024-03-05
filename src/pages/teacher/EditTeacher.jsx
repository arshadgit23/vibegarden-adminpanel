import React, { useRef, useState, useEffect } from "react";
import { Button } from "../../components";
import ButtonsHeader from "../../components/ButtonsHeader";
import { useNavigate } from "react-router-dom";
import { FiImage } from "react-icons/fi";
import BackButton from "../../components/BackButton";
import apicall from "../../assets/api/axios";
import Loader from "../../components/Loader";
import Container from "../../components/Container";
import { useParams } from "react-router-dom";
import { ImageUrl } from "../../assets/api/axios";
import VideoInputCard from "../../components/VideoInputCard";
import axios from "axios";
import { setDisableSidebar } from "../../store/reducers/sidebarSlice";
import { useDispatch } from "react-redux";

const EditTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [findTeacher] = teachers?.filter((teacher) => teacher?.id === id);
  const nameRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState();
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

  useEffect(() => {
    setName(findTeacher?.teacherName);
    setDescription(findTeacher?.description);
    setLink(findTeacher?.link);
    setProfile(`${findTeacher?.photo} `);
    setMainVideo(findTeacher?.video);
  }, [teachers]);

  useEffect(() => {
    const getTeachers = async () => {
      setLoading(true);
      try {
        const response = await apicall.get("/users?role=teacher");
        setTeachers(response.data.data);
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
    getTeachers();
  }, []);

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
    teacherData.append("video", mainVideo);
    if (typeof mainVideo === "object") {
      teacherData.append("isVideo", true);
    }

    try {
      dispatch(setDisableSidebar(true));
      setLoading(true);
      const response = await apicall.patch(
        `/users/update-teacher/${id}`,
        teacherData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        setVideoUrl(response?.data?.data?.url);
        setMessage("Teacher Added");
        setTimeout(() => {
          setMessage("");
          navigate("/Teacher");
          dispatch(setDisableSidebar(false));
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
        Edit Teacher Details
      </h1>
      <form onSubmit={(e) => handleClick(e)}>
        <div className="  flex items-center justify-between py-5">
          <div className="  px-8 w-1/2 h-full flex flex-col justify-center">
            <input
              type="text"
              placeholder="Name"
              className="px-4 py-3 focus:outline-none w-full rounded-md border border-gray mb-3"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="px-4 py-3 focus:outline-none w-full rounded-md border border-gray mb-3"
              ref={descriptionRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <input
              type="text"
              placeholder="Link"
              className="px-4 py-3 focus:outline-none w-full rounded-md border border-gray mb-3"
              ref={linkRef}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="w-1/2 h-full flex justify-center items-center">
            <label htmlFor="teacher-image" className=" cursor-pointer">
              <div
                className="  rounded-lg bg-[#f0f5f1] p-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {profile ? (
                  <img
                    src={
                      typeof profile === "string"
                        ? `${ImageUrl}${profile}`
                        : URL.createObjectURL(profile)
                    }
                    alt="profile-image"
                    height={150}
                    width={150}
                  />
                ) : (
                  <div
                    className="w-[150px] h-[150px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]"
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
                  <span className="underline text-[#1C5C2E] font-medium ">
                    Upload
                  </span>
                  or Drag Category <br /> Icon Here
                </p>
              </div>
            </label>
            <input
              type="file"
              id="teacher-image"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <VideoInputCard mainVideo={mainVideo} setMainVideo={setMainVideo} />
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

export default EditTeacher;
