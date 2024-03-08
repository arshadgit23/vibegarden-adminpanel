import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillCalendarFill } from "react-icons/bs";
import { FiImage, FiTrash2 } from "react-icons/fi";
import { HiMinus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import BackButton from "../../components/BackButton";
import { useState, useEffect } from "react";
import apicall from "../../assets/api/axios";
import Loader from "../../components/Loader";
import Modal from "react-overlays/Modal";
import "./style.css";
import "./calender.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment/moment";
import axios from "axios";
import SuccessMessage from "../../components/SuccessMessage";
import ErrorMessage from "../../components/ErrorMessage";
import { FaCheck } from "react-icons/fa";
import { setDisableSidebar } from "../../store/reducers/sidebarSlice";
import { useDispatch } from "react-redux";

const AddVibeGuide = () => {
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState("");
  const [err, setErr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [calenderDate, setCalenderDate] = useState(new Date());
  const [inputs, setInputs] = useState({
    vibeGuideName: "",
    description: "",
    sun: false,
    sunTimeIn: "",
    sunTimeOut: "",
    sunAdditionalTimeIn: "",
    sunAdditionalTimeOut: "",
    mon: false,
    monTimeIn: "",
    monTimeOut: "",
    monAdditionalTimeIn: "",
    monAdditionalTimeOut: "",
    tue: false,
    tueTimeIn: "",
    tueTimeOut: "",
    tueAdditionalTimeIn: "",
    tueAdditionalTimeOut: "",
    wed: false,
    wedTimeIn: "",
    wedTimeOut: "",
    wedAdditionalTimeIn: "",
    wedAdditionalTimeOut: "",
    thurs: false,
    thursTimeIn: "",
    thursTimeOut: "",
    thursAdditionalTimeIn: "",
    thursAdditionalTimeOut: "",
    fri: false,
    friTimeIn: "",
    friTimeOut: "",
    friAdditionalTimeIn: "",
    friAdditionalTimeOut: "",
    sat: false,
    satTimeIn: "",
    satTimeOut: "",
    satAdditionalTimeIn: "",
    satAdditionalTimeOut: "",
    thirtyMinSession: "",
    SixtyMinSession: "",
    photo: "",
  });

  const [additionalDate, setAdditionalDate] = useState({
    sunAdditionalDate: false,
    monAdditionalDate: false,
    tueAdditionalDate: false,
    wedAdditionalDate: false,
    thursAdditionalDate: false,
    friAdditionalDate: false,
    satAdditionalDate: false,
  });

  const [overrideHours, setOverrideHours] = useState([
    {
      timeIn: "",
      timeOut: "",
    },
  ]);

  const [mainVideo, setMainVideo] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (resData) {
      navigate("/vibeGuides");
    }
  }, [resData]);

  const convertTo12HourFormat = (value) => {
    let [hours, minutes] = value.split(":")?.map(Number);
    let period;
    if (hours === 0) {
      period = "AM";
      hours = 12;
    } else if (hours < 12) {
      period = "AM";
    } else if (hours === 12) {
      period = "PM";
    } else {
      period = "PM";
      hours -= 12;
    }
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${period}`;
  };

  const inputsHandler = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "checkbox") {
      setInputs((prev) => ({ ...prev, [name]: !inputs[name] }));
    } else if (type === "file") {
      setInputs((prev) => ({ ...prev, [name]: files[0] }));
    }
    // this will run in case of date input (date format 12:30)
    else if (value.includes(":")) {
      let formattedTime = convertTo12HourFormat(value);
      setInputs((prev) => ({ ...prev, [name]: formattedTime }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/VibeGuides");
    }, 1500);
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
          setLoading(false);
          setSuccessMessage("Video Added Successfully");
          setTimeout(() => {
            navigate("/VibeGuides");
            dispatch(setDisableSidebar(false));
          }, 800);
        } catch (error) {
          setError(error.message);
          setLoading(false);
          dispatch(setDisableSidebar(false));
        }
      };
      uploadToAWS();
    }
  }, [videoUrl]);

  const handleClick = () => {
    navigate("/vibeGuides");
  };

  var handleClose = () => {
    setShowModal(false);
    setErr("");
  };

  const renderBackdrop = (props) => <div className="backdrop2" {...props} />;

  const addDateHandler = (event, key) => {
    if (event === "add") {
      setAdditionalDate((prev) => ({ ...prev, [key]: true }));
    } else {
      setAdditionalDate((prev) => ({ ...prev, [key]: false }));
    }
  };

  const deleteOverrideHandler = (overrideDateIndex) => {
    setSelectedDates((prevDates) =>
      prevDates.filter((_, i) => i !== overrideDateIndex)
    );
  };

  const isSameDay = (date1, date2) =>
    new Date(date1).getDate() === new Date(date2).getDate() &&
    new Date(date1).getMonth() === new Date(date2).getMonth() &&
    new Date(date1).getFullYear() === new Date(date2).getFullYear();

  const handleDateChange = (date) => {
    const isDateSelected = selectedDates.find((selectedDate) =>
      isSameDay(selectedDate, date)
    );

    if (isDateSelected) {
      setSelectedDates((prevDates) =>
        prevDates?.filter((selectedDate) => !isSameDay(selectedDate, date))
      );
    } else {
      setSelectedDates((prevDates) => [...prevDates, date]);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const isSelected = selectedDates.some((selectedDate) =>
        isSameDay(selectedDate, date)
      );

      return isSelected ? (
        <small>
          <FaCheck />
        </small>
      ) : null;
    }
    return null;
  };

  const modalHelper = (
    <Modal
      className="modal overflow-auto p-3 z-20"
      show={showModal}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div className="p-3">
        <div className="flex justify-between items-center mb-3">
          <h1 className="font-extrabold text-[1.5vw]">
            Select The Dates You Want To Assign Specific Hours
          </h1>
          <span
            className="bg-[#4D4D4D] p-3 text-white rounded-[100%] cursor-pointer"
            onClick={handleClose}
          >
            X
          </span>
        </div>
        <Calendar onChange={handleDateChange} tileContent={tileContent} />

        <hr className="mt-6 bg-[#707070] text-[#707070]" />

        <div className="flex justify-start items-center mt-5">
          <Button
            margin=".3vw"
            text="Apply"
            bgColor="#0069FF"
            color="white"
            borderRadius={50}
            width={150}
            fontSize="18px"
            handleClick={handleClose}
          />
          <Button
            margin=".3vw"
            border="solid 1px black"
            text="Cancel"
            bgColor="white"
            color="black"
            borderRadius={50}
            width={150}
            fontSize="18px"
            handleClick={() => {
              setShowModal(false);
              setErr("");
            }}
          />
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      {modalHelper}
      <div className="bg-[#F7F9F8] shadow-lg shadow-[#00000029]-500/50 w-[90%] h-[500px] rounded-[20px] m-10 overflow-y-auto mb-10">
        <div className="md:flex justify-between m-10">
          <h1
            className="font-medium text-[#1C5C2E] text-[24px] "
            style={{ marginTop: 10 }}
          >
            Add Vibe Guide
          </h1>
          <div onClick={() => handleClick()}>
            {" "}
            <BackButton />
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 m-10">
            <div>
              <input
                onChange={inputsHandler}
                type="text"
                name="vibeGuideName"
                placeholder="Name"
                className="px-4 py-3 border border-[gray] rounded-[10px] bg-[#FFFFFF] focus:outline-none w-[90%] h-[50px] "
              />
              <textarea
                name="description"
                onChange={inputsHandler}
                placeholder="Description"
                className="px-4 py-3 border border-[gray] rounded-[10px] bg-[#FFFFFF] focus:outline-none w-[90%] h-[150px]  mt-5 resize-y"
              ></textarea>
              <div className="px-3 py-3 border border-[gray] rounded-[10px] bg-[#FFFFFF]  w-[90%] h-max  mt-5 resize-y">
                <p>Set Your Weekly Hours</p>
                <div className="flex px-5 py-4 space-x-4 ">
                  <input onChange={inputsHandler} type="checkbox" name="sun" />
                  {inputs.sun ? (
                    <>
                      <p className="font-semibold mt-[5px]">SUN</p>

                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="sunTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />
                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="sunTimeOut"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />
                      <AiOutlinePlus
                        size={30}
                        onClick={() =>
                          addDateHandler("add", "sunAdditionalDate")
                        }
                      />
                    </>
                  ) : (
                    <p className="text-[#979B9F] mt-[5px] text-[14px]">
                      Unavailable
                    </p>
                  )}

                  {/* <FiTrash2 size={30} /> */}
                </div>

                {additionalDate.sunAdditionalDate && (
                  <div className="flex px-5 py-4 space-x-4 ">
                    {inputs.sun ? (
                      <>
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="sunAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />
                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="sunAdditionalTimeOut"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />
                        <FiTrash2
                          size={30}
                          onClick={() =>
                            addDateHandler("delete", "sunAdditionalDate")
                          }
                        />
                      </>
                    ) : (
                      addDateHandler("delete", "sunAdditionalDate")
                    )}

                    {/* <FiTrash2 size={30} /> */}
                  </div>
                )}

                <hr />
                <div className="flex px-5 py-4 space-x-4 ">
                  <input onChange={inputsHandler} type="checkbox" name="mon" />
                  {inputs.mon ? (
                    <>
                      <p className="font-semibold mt-[5px]">MON</p>
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="monTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />
                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="monTimeOut"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />
                      <AiOutlinePlus
                        size={30}
                        onClick={() =>
                          addDateHandler("add", "monAdditionalDate")
                        }
                      />
                    </>
                  ) : (
                    <p className="text-[#979B9F] mt-[5px] text-[14px]">
                      Unavailable
                    </p>
                  )}

                  {/* <FiTrash2 size={30} />
                                <AiOutlinePlus size={30} /> */}
                </div>
                {additionalDate.monAdditionalDate && (
                  <div className="flex px-5 py-4 space-x-4 ">
                    {inputs.mon ? (
                      <>
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="monAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />
                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="monAdditionalTimeOut"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />
                        <FiTrash2
                          size={30}
                          onClick={() =>
                            addDateHandler("delete", "monAdditionalDate")
                          }
                        />
                      </>
                    ) : (
                      addDateHandler("delete", "monAdditionalDate")
                    )}

                    {/* <FiTrash2 size={30} />
                                <AiOutlinePlus size={30} /> */}
                  </div>
                )}
                <hr />
                <div className="flex px-5 py-4 space-x-4 ">
                  <input onChange={inputsHandler} type="checkbox" name="tue" />
                  {inputs.tue ? (
                    <>
                      <p className="font-semibold mt-[5px]">TUE</p>
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="tueTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />

                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="tueTimeOut"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />
                      <AiOutlinePlus
                        size={30}
                        onClick={() =>
                          addDateHandler("add", "tueAdditionalDate")
                        }
                      />
                    </>
                  ) : (
                    <p className="text-[#979B9F] mt-[5px] text-[14px]">
                      Unavailable
                    </p>
                  )}

                  {/* <FiTrash2 size={30} />
                                <AiOutlinePlus size={30} /> */}
                </div>
                {additionalDate.tueAdditionalDate && (
                  <div className="flex px-5 py-4 space-x-4 ">
                    {inputs.tue ? (
                      <>
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="tueAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />

                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="tueAdditionalTimeOut"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />
                        <FiTrash2
                          size={30}
                          onClick={() =>
                            addDateHandler("delete", "tueAdditionalDate")
                          }
                        />
                      </>
                    ) : (
                      addDateHandler("delete", "tueAdditionalDate")
                    )}

                    {/* <FiTrash2 size={30} />
                                <AiOutlinePlus size={30} /> */}
                  </div>
                )}
                <hr />
                <div className="flex px-5 py-4 space-x-4 ">
                  <input onChange={inputsHandler} type="checkbox" name="wed" />
                  {inputs.wed ? (
                    <>
                      <p className="font-semibold mt-[5px]">WED</p>
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="wedTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />

                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="wedTimeOut"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />
                      <AiOutlinePlus
                        size={30}
                        onClick={() =>
                          addDateHandler("add", "wedAdditionalDate")
                        }
                      />
                    </>
                  ) : (
                    <p className="text-[#979B9F] mt-[5px] text-[14px]">
                      Unavailable
                    </p>
                  )}

                  {/* <FiTrash2 size={30} />
                                <AiOutlinePlus size={30} /> */}
                </div>
                {additionalDate.wedAdditionalDate && (
                  <div className="flex px-5 py-4 space-x-4 ">
                    {inputs.wed ? (
                      <>
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="wedAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />

                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="wedAdditionalTimeOut"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />
                        <FiTrash2
                          size={30}
                          onClick={() =>
                            addDateHandler("delete", "wedAdditionalDate")
                          }
                        />
                      </>
                    ) : (
                      addDateHandler("delete", "wedAdditionalDate")
                    )}

                    {/* <FiTrash2 size={30} />
                                <AiOutlinePlus size={30} /> */}
                  </div>
                )}
                <hr />
                <div className="flex px-5 py-4 space-x-4 ">
                  <input
                    onChange={inputsHandler}
                    type="checkbox"
                    name="thurs"
                  />
                  {inputs.thurs ? (
                    <>
                      <p className="font-semibold mt-[5px]">THU</p>
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="thursTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />

                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="thursTimeOut"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />
                      <AiOutlinePlus
                        size={30}
                        onClick={() =>
                          addDateHandler("add", "thursAdditionalDate")
                        }
                      />
                    </>
                  ) : (
                    <p className="text-[#979B9F] mt-[5px] text-[14px]">
                      Unavailable
                    </p>
                  )}

                  {/* <FiTrash2 size={30} />
                                <AiOutlinePlus size={30} /> */}
                </div>
                {additionalDate.thursAdditionalDate && (
                  <div className="flex px-5 py-4 space-x-4 ">
                    {inputs.thurs ? (
                      <>
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="thursAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />

                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="thursAdditionalTimeOut"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />
                        <FiTrash2
                          size={30}
                          onClick={() =>
                            addDateHandler("delete", "thursAdditionalDate")
                          }
                        />
                      </>
                    ) : (
                      addDateHandler("delete", "thursAdditionalDate")
                    )}

                    {/* <FiTrash2 size={30} />
                            <AiOutlinePlus size={30} /> */}
                  </div>
                )}
                <hr />
                <div className="flex px-5 py-4 space-x-4 ">
                  <input onChange={inputsHandler} type="checkbox" name="fri" />
                  {inputs.fri ? (
                    <>
                      <p className="font-semibold mt-[5px]">FRI</p>
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="friTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />

                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="friTimeOut"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />
                      <AiOutlinePlus
                        size={30}
                        onClick={() =>
                          addDateHandler("add", "friAdditionalDate")
                        }
                      />
                    </>
                  ) : (
                    <p className="text-[#979B9F] mt-[5px] text-[14px]">
                      Unavailable
                    </p>
                  )}

                  {/* <FiTrash2 size={30} />
                                <AiOutlinePlus size={30} /> */}
                </div>
                {additionalDate.friAdditionalDate && (
                  <div className="flex px-5 py-4 space-x-4 ">
                    {inputs.fri ? (
                      <>
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="friAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />

                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="friAdditionalTimeOut"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />
                        <FiTrash2
                          size={30}
                          onClick={() =>
                            addDateHandler("delete", "friAdditionalDate")
                          }
                        />
                      </>
                    ) : (
                      addDateHandler("delete", "friAdditionalDate")
                    )}

                    {/* <FiTrash2 size={30} />
                                <AiOutlinePlus size={30} /> */}
                  </div>
                )}
                <hr />
                <div className="flex px-5 py-4 space-x-4 ">
                  <input onChange={inputsHandler} type="checkbox" name="sat" />
                  {inputs.sat ? (
                    <>
                      <p className="font-semibold mt-[5px]">SAT</p>
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="satTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />

                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="satTimeOut"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />
                      <AiOutlinePlus
                        size={30}
                        onClick={() =>
                          addDateHandler("add", "satAdditionalDate")
                        }
                      />
                    </>
                  ) : (
                    <p className="text-[#979B9F] mt-[5px] text-[14px]">
                      Unavailable
                    </p>
                  )}

                  {/* <FiTrash2 size={30} />
                                <AiOutlinePlus size={30} /> */}
                </div>
                {additionalDate.satAdditionalDate && (
                  <div className="flex px-5 py-4 space-x-4 ">
                    {inputs.sat ? (
                      <>
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="satAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />

                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          name="satAdditionalTimeOut"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />
                        <FiTrash2
                          size={30}
                          onClick={() =>
                            addDateHandler("delete", "satAdditionalDate")
                          }
                        />
                      </>
                    ) : (
                      addDateHandler("delete", "satAdditionalDate")
                    )}

                    {/* <FiTrash2 size={30} />
                            <AiOutlinePlus size={30} /> */}
                  </div>
                )}
              </div>
              <div className="px-3 py-3 border border-[gray] rounded-[10px] space-y-4  bg-[#FFFFFF]  w-[90%] h-[250px] flex flex-col mt-5">
                <p className="font-semibold mt-[5px]">30 Min Session</p>
                <input
                  onChange={inputsHandler}
                  type="number"
                  name="thirtyMinSession"
                  placeholder="$"
                  className="px-4 py-3 border border-[gray] rounded-[10px] bg-[#FFFFFF] focus:outline-none w-[50%] h-[50px] "
                />
                <p className="font-semibold mt-[5px]">60 Min Session</p>
                <input
                  onChange={inputsHandler}
                  type="number"
                  name="SixtyMinSession"
                  placeholder="$"
                  className="px-4 py-3 border border-[gray] rounded-[10px] bg-[#FFFFFF] focus:outline-none w-[50%] h-[50px] "
                />
              </div>
              <div className="m-5 space-x-4">
                <button className=" border border-green px-4 py-2 rounded-md hover:bg-green hover:text-white">
                  {loading ? <Loader /> : "Save"}
                </button>

                {successMessage && (
                  <SuccessMessage>{successMessage}</SuccessMessage>
                )}
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {/* <Button text="Save" type="submit" bgColor="#359D9E" color="white" width={150} borderRadius={10} /> */}
                <br />
                {/* <Button text="Cancle" handleClick={} bgColor="white" shadow={`1px 2px 9px #00000029`} color="#EF3A71" width={150} borderRadius={10} /> */}
              </div>
            </div>
            <div>
              <div className="flex justify-around">
                <div
                  className="w-[220px] h-[220px] rounded-lg bg-[#f0f5f1] relative"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <input
                    onChange={inputsHandler}
                    type="file"
                    name="photo"
                    accept="image/*"
                    className=" cursor-pointer  bg-black h-2/3 w-10/12 absolute top-[0] left-[0] opacity-0"
                  />
                  {inputs.photo ? (
                    <img
                      src={URL.createObjectURL(inputs.photo)}
                      alt="vibe-guide"
                      className="w-[10vw] h-[15vh]"
                    />
                  ) : (
                    <>
                      <div
                        className="cursor-pointer w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]"
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
                      <p className="text-[#979B9F] text-[14px] text-center mt-5">
                        <span className="underline text-[#1C5C2E] font-medium ">
                          {" "}
                          Upload{" "}
                        </span>{" "}
                        or Drag <br /> Profile Crop Image Here
                      </p>
                    </>
                  )}
                </div>
                <label
                  htmlFor="video"
                  className="relative cursor-pointer ml-5 "
                >
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

                {/* <div
                  className="w-[200px] h-[220px] rounded-lg bg-[#f0f5f1]  ml-5 "
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
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
                  <p className="text-[#979B9F] text-[14px] text-center mt-5">
                    <span className="underline text-[#1C5C2E] font-medium ">
                      {" "}
                      Upload{" "}
                    </span>{" "}
                    or Drag <br /> Profile Crop Image Here
                  </p>
                </div> */}
              </div>
              <div className=" border border-[gray] rounded-[10px] bg-[#FFFFFF]  w-[90%] h-[830px]  mt-5">
                <p className="font-semibold m-5">Add Dates Overrides</p>
                <div className="m-5 flex">
                  <Button
                    icon={<BsFillCalendarFill color="#1C5C2E" size={25} />}
                    bgColor="white"
                    shadow={`1px 2px 9px #00000029`}
                    borderRadius={10}
                  />
                  <Button
                    text="Add a date override"
                    bgColor="#359D9E"
                    color="white"
                    borderRadius={10}
                    width={200}
                    fontSize="14px"
                    handleClick={() => {
                      setShowModal(true);
                    }}
                  />
                </div>
                <hr className="w-[100%] " />
                {selectedDates?.map((overrideDate, overrideDateIndex) => {
                  return (
                    <div
                      key={overrideDateIndex}
                      className="flex justify-between m-5"
                    >
                      <p className="text-[14px] text-[#4D4D4D]">
                        {moment(overrideDate).format("MMM Do YY")}
                      </p>
                      <FiTrash2
                        size={15}
                        color="red"
                        onClick={() => deleteOverrideHandler(overrideDateIndex)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddVibeGuide;
