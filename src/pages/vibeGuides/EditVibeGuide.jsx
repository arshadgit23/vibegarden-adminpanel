import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillCalendarFill } from "react-icons/bs";
import { FiImage, FiTrash2, FiVideo } from "react-icons/fi";
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
import { useParams } from "react-router-dom";
import { ImageUrl } from "../../assets/api/axios";
import moment from "moment/moment";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setDisableSidebar } from "../../store/reducers/sidebarSlice";

const EditVibeGuide = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState("");
  const [err, setErr] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  const [videoUrl, setVideoUrl] = useState("");
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
    video: "",
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

  const [vibeGuides, setVibeguides] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getVibeguides = async () => {
      try {
        setLoading(true);
        const response = await apicall.get("/users?role=vibe-guide");
        setVibeguides(response.data.data);
        setLoading(false);
      } catch (error) {
        setErr(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error.message
        );
        setLoading(false);
      }
    };
    getVibeguides();
  }, []);

  const [vg] = vibeGuides?.filter((vg) => vg?.id === id);

  const additionalTimeInSetting = (day) => {
    setAdditionalDate((prev) => ({ ...prev, [day]: true }));
    return vg?.weeklyHours?.sun[1]?.split("-")[0];
  };

  const additionalTimeOutSetting = (day) => {
    setAdditionalDate((prev) => ({ ...prev, [day]: false }));
    return vg?.weeklyHours?.sun[1]?.split("-")[1];
  };

  useEffect(() => {
    if (vg?.dateOverride?.availableHours?.length > 0) {
      setOverrideHours(vg?.dateOverride?.availableHours);
    }
  }, [vibeGuides]);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      vibeGuideName: vg?.vibeGuideName,
      description: vg?.description,
      photo: `${ImageUrl}${vg?.photo}`,
      video: `${vg?.video}`,
      sun: vg?.weeklyHours?.sun[0]?.includes("Unavailable") ? false : true,
      mon: vg?.weeklyHours?.mon[0]?.includes("Unavailable") ? false : true,
      tue: vg?.weeklyHours?.tue[0]?.includes("Unavailable") ? false : true,
      wed: vg?.weeklyHours?.wed[0]?.includes("Unavailable") ? false : true,
      thurs: vg?.weeklyHours?.thu[0]?.includes("Unavailable") ? false : true,
      fri: vg?.weeklyHours?.fri[0]?.includes("Unavailable") ? false : true,
      sat: vg?.weeklyHours?.sat[0]?.includes("Unavailable") ? false : true,
      sunTimeIn: vg?.weeklyHours?.sun[0]?.split("-")
        ? vg?.weeklyHours?.sun[0]?.split("-")[0]
        : null,
      sunTimeOut: vg?.weeklyHours?.sun[0]?.split("-")
        ? vg?.weeklyHours?.sun[0]?.split("-")[1]
        : null,
      sunAdditionalTimeIn:
        vg?.weeklyHours?.sun[1] !== null
          ? additionalTimeInSetting("sunAdditionalDate")
          : null,
      sunAdditionalTimeOut:
        vg?.weeklyHours?.sun[1] !== null
          ? additionalTimeOutSetting("sunAdditionalDate")
          : null,
      monTimeIn: vg?.weeklyHours?.mon[0]?.split("-")
        ? vg?.weeklyHours?.mon[0]?.split("-")[0]
        : null,
      monTimeOut: vg?.weeklyHours?.mon[0]?.split("-")
        ? vg?.weeklyHours?.mon[0]?.split("-")[1]
        : null,
      monAdditionalTimeIn:
        vg?.weeklyHours?.mon[1] !== null
          ? additionalTimeInSetting("monAdditionalDate")
          : null,
      monAdditionalTimeOut:
        vg?.weeklyHours?.mon[1] !== null
          ? additionalTimeOutSetting("monAdditionalDate")
          : null,
      tueTimeIn: vg?.weeklyHours?.tue[0]?.split("-")
        ? vg?.weeklyHours?.tue[0]?.split("-")[0]
        : null,
      tueTimeOut: vg?.weeklyHours?.tue[0]?.split("-")
        ? vg?.weeklyHours?.tue[0]?.split("-")[1]
        : null,
      tueAdditionalTimeIn:
        vg?.weeklyHours?.tue[1] !== null
          ? additionalTimeInSetting("tueAdditionalDate")
          : null,
      tueAdditionalTimeOut:
        vg?.weeklyHours?.tue[1] !== null
          ? additionalTimeOutSetting("tueAdditionalDate")
          : null,
      wedTimeIn: vg?.weeklyHours?.wed[0]?.split("-")
        ? vg?.weeklyHours?.wed[0]?.split("-")[0]
        : null,
      wedTimeOut: vg?.weeklyHours?.wed[0]?.split("-")
        ? vg?.weeklyHours?.wed[0]?.split("-")[1]
        : null,
      wedAdditionalTimeIn:
        vg?.weeklyHours?.wed[1] !== null
          ? additionalTimeInSetting("wedAdditionalDate")
          : null,
      wedAdditionalTimeOut:
        vg?.weeklyHours?.wed[1] !== null
          ? additionalTimeOutSetting("wedAdditionalDate")
          : null,
      thursTimeIn: vg?.weeklyHours?.thu[0]?.split("-")
        ? vg?.weeklyHours?.thu[0]?.split("-")[0]
        : null,
      thursTimeOut: vg?.weeklyHours?.thu[0]?.split("-")
        ? vg?.weeklyHours?.thu[0]?.split("-")[1]
        : null,
      thursAdditionalTimeIn:
        vg?.weeklyHours?.thu[1] !== null
          ? additionalTimeInSetting("thursAdditionalDate")
          : null,
      thursAdditionalTimeOut:
        vg?.weeklyHours?.thu[1] !== null
          ? additionalTimeOutSetting("thursAdditionalDate")
          : null,
      friTimeIn: vg?.weeklyHours?.fri[0]?.split("-")
        ? vg?.weeklyHours?.fri[0]?.split("-")[0]
        : null,
      friTimeOut: vg?.weeklyHours?.fri[0]?.split("-")
        ? vg?.weeklyHours?.fri[0]?.split("-")[1]
        : null,
      friAdditionalTimeIn:
        vg?.weeklyHours?.fri[1] !== null
          ? additionalTimeInSetting("friAdditionalDate")
          : null,
      friAdditionalTimeOut:
        vg?.weeklyHours?.fri[1] !== null
          ? additionalTimeOutSetting("friAdditionalDate")
          : null,
      satTimeIn: vg?.weeklyHours?.sat[0]?.split("-")
        ? vg?.weeklyHours?.sat[0]?.split("-")[0]
        : null,
      satTimeOut: vg?.weeklyHours?.sat[0]?.split("-")
        ? vg?.weeklyHours?.sat[0]?.split("-")[1]
        : null,
      satAdditionalTimeIn:
        vg?.weeklyHours?.sat[1] !== null
          ? additionalTimeInSetting("satAdditionalDate")
          : null,
      satAdditionalTimeOut:
        vg?.weeklyHours?.sat[1] !== null
          ? additionalTimeOutSetting("satAdditionalDate")
          : null,
      thirtyMinSession: vg?.thirtyMinSession,
      SixtyMinSession: vg?.sixtyMinSession,
    }));
  }, [vibeGuides]);

  const convertTo12HourFormat = (value) => {
    let [hours, minutes] = value.split(":").map(Number);
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

  const convertTo24HourFormat = (dateString) => {
    if (dateString) {
      const [time, period] = dateString?.split(" ");

      let [hours, minutes] = time?.split(":").map(Number);

      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      return `${hours.toString().padStart(2, "0")}:${minutes
        ?.toString()
        .padStart(2, "0")} ${period}`;
    }
  };

  if (inputs?.sun) {
    var initialSunTimeIn = convertTo24HourFormat(inputs?.sunTimeIn);
    var initialSunTimeOut = convertTo24HourFormat(inputs?.sunTimeOut);
    if (inputs?.sunAdditionalTimeIn && inputs?.sunAdditionalTimeOut) {
      var initialSunAdditionalTimeIn = convertTo24HourFormat(
        inputs?.sunAdditionalTimeIn
      );
      var initialSunAdditionalTimeOut = convertTo24HourFormat(
        inputs?.sunAdditionalTimeOut
      );
    }
  }
  if (inputs?.sat) {
    var initialSatTimeIn = convertTo24HourFormat(inputs?.satTimeIn);
    var initialSatTimeOut = convertTo24HourFormat(inputs?.satTimeOut);
    if (inputs?.satAdditionalTimeIn && inputs?.satAdditionalTimeOut) {
      var initialSatAdditionalTimeIn = convertTo24HourFormat(
        inputs?.satAdditionalTimeIn
      );
      var initialSatAdditionalTimeOut = convertTo24HourFormat(
        inputs?.satAdditionalTimeOut
      );
    }
  }
  if (inputs?.fri) {
    var initialFriTimeIn = convertTo24HourFormat(inputs?.friTimeIn);
    var initialFriTimeOut = convertTo24HourFormat(inputs?.friTimeOut);
    if (inputs?.friAdditionalTimeIn && inputs?.friAdditionalTimeOut) {
      var initialFriAdditionalTimeIn = convertTo24HourFormat(
        inputs?.friAdditionalTimeIn
      );
      var initialFriAdditionalTimeOut = convertTo24HourFormat(
        inputs?.friAdditionalTimeOut
      );
    }
  }
  if (inputs?.thurs) {
    var initialThursTimeIn = convertTo24HourFormat(inputs?.thursTimeIn);
    var initialThursTimeOut = convertTo24HourFormat(inputs?.thursTimeOut);
    if (inputs?.thursAdditionalTimeIn && inputs?.thursAdditionalTimeOut) {
      var initialThursAdditionalTimeIn = convertTo24HourFormat(
        inputs?.thursAdditionalTimeIn
      );
      var initialThursAdditionalTimeOut = convertTo24HourFormat(
        inputs?.thursAdditionalTimeOut
      );
    }
  }
  if (inputs?.wed) {
    var initialWedTimeIn = convertTo24HourFormat(inputs?.wedTimeIn);
    var initialWedTimeOut = convertTo24HourFormat(inputs?.wedTimeOut);
    if (inputs?.wedAdditionalTimeIn && inputs?.wedAdditionalTimeOut) {
      var initialWedAdditionalTimeIn = convertTo24HourFormat(
        inputs?.wedAdditionalTimeIn
      );
      var initialWedAdditionalTimeOut = convertTo24HourFormat(
        inputs?.wedAdditionalTimeOut
      );
    }
  }
  if (inputs?.tue) {
    var initialTueTimeIn = convertTo24HourFormat(inputs?.tueTimeIn);
    var initialTueTimeOut = convertTo24HourFormat(inputs?.tueTimeOut);
    if (inputs?.tueAdditionalTimeIn && inputs?.tueAdditionalTimeOut) {
      var initialTueAdditionalTimeIn = convertTo24HourFormat(
        inputs?.tueAdditionalTimeIn
      );
      var initialTueAdditionalTimeOut = convertTo24HourFormat(
        inputs?.tueAdditionalTimeOut
      );
    }
  }
  if (inputs?.mon) {
    var initialMonTimeIn = convertTo24HourFormat(inputs?.monTimeIn);
    var initialMonTimeOut = convertTo24HourFormat(inputs?.monTimeOut);
    if (inputs?.monAdditionalTimeIn && inputs?.monAdditionalTimeOut) {
      var initialMonAdditionalTimeIn = convertTo24HourFormat(
        inputs?.monAdditionalTimeIn
      );
      var initialMonAdditionalTimeOut = convertTo24HourFormat(
        inputs?.monAdditionalTimeOut
      );
    }
  }

  const inputsHandler = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "checkbox") {
      setInputs((prev) => ({ ...prev, [name]: !inputs[name] }));
    } else if (type === "file") {
      setInputs((prev) => ({ ...prev, [name]: files[0] }));
    } else if (value.includes(":")) {
      let formattedTime = convertTo12HourFormat(value);
      setInputs((prev) => ({ ...prev, [name]: formattedTime }));
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const weeklyHours = {
      sun: [
        inputs.sun
          ? inputs.sunTimeIn + "-" + inputs.sunTimeOut
          : "SUN Unavailable",
        additionalDate.sunAdditionalDate
          ? inputs.sunAdditionalTimeIn + "-" + inputs.sunAdditionalTimeOut
          : null,
      ],
      mon: [
        inputs.mon
          ? inputs.monTimeIn + "-" + inputs.monTimeOut
          : "MON Unavailable",
        additionalDate.monAdditionalDate
          ? inputs.monAdditionalTimeIn + "-" + inputs.monAdditionalTimeOut
          : null,
      ],
      tue: [
        inputs.tue
          ? inputs.tueTimeIn + "-" + inputs.tueTimeOut
          : "TUE Unavailable",
        additionalDate.tueAdditionalDate
          ? inputs.tueAdditionalTimeIn + "-" + inputs.tueAdditionalTimeOut
          : null,
      ],
      wed: [
        inputs.wed
          ? inputs.wedTimeIn + "-" + inputs.wedTimeOut
          : "WED Unavailable",
        additionalDate.wedAdditionalDate
          ? inputs.wedAdditionalTimeIn + "-" + inputs.wedAdditionalTimeOut
          : null,
      ],
      thu: [
        inputs.thurs
          ? inputs.thursTimeIn + "-" + inputs.thursTimeOut
          : "THURS Unavailable",
        additionalDate.thursAdditionalDate
          ? inputs.thursAdditionalTimeIn + "-" + inputs.thursAdditionalTimeOut
          : null,
      ],
      fri: [
        inputs.fri
          ? inputs.friTimeIn + "-" + inputs.friTimeOut
          : "FRI Unavailable",
        additionalDate.friAdditionalDate
          ? inputs.friAdditionalTimeIn + "-" + inputs.friAdditionalTimeOut
          : null,
      ],
      sat: [
        inputs.sat
          ? inputs.satTimeIn + "-" + inputs.satTimeOut
          : "SAT Unavailable",
        additionalDate.satAdditionalDate
          ? inputs.satAdditionalTimeIn + "-" + inputs.satAdditionalTimeOut
          : null,
      ],
    };

    const data = {
      vibeGuideName: inputs.vibeGuideName,
      description: inputs.description,
      weeklyHours: JSON.stringify(weeklyHours),
      thirtyMinSession: inputs.thirtyMinSession,
      sixtyMinSession: inputs.SixtyMinSession,
      photo: typeof inputs.photo === "string" ? vg?.photo : inputs.photo,
      dateOverride: JSON.stringify(selectedDates),
      video: typeof inputs.video === "string" ? vg?.video : inputs.video,
      isVideo: typeof inputs.video === "object" ? true : false,
    };

    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    setLoading(true);
    try {
      dispatch(setDisableSidebar(true));
      const response = await apicall.patch(
        `/users/update-vibe-guide/${id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      setVideoUrl(response?.data?.data?.url);
      setResData(response?.data?.data);
      setLoading(false);

      if (!response.data.data.url) {
        setSuccessMessage("Vibe Guide Updated Successfully");
      }
      if (!response.data.data.url) {
        setTimeout(() => {
          navigate("/VibeGuides");
          dispatch(setDisableSidebar(false));
        }, 800);
      }
    } catch (error) {
      setLoading(false);
      setErr(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message
      );
      dispatch(setDisableSidebar(false));
    }
  };

  useEffect(() => {
    if (videoUrl) {
      const uploadToAWS = async () => {
        dispatch(setDisableSidebar(true));
        try {
          await axios.put(videoUrl, inputs?.video, {
            headers: {
              "Content-Type": inputs?.video?.type,
            },
          });
          setLoading(false);
          setSuccessMessage("Video Added Successfully");
          setTimeout(() => {
            navigate("/VibeGuides");
            dispatch(setDisableSidebar(false));
          }, 800);
        } catch (error) {
          setErr(error.message);
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

  useEffect(() => {
    setSelectedDates(vg?.dateOverride);
  }, [vg]);

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
            handleClick={handleClose}
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
            Edit Vibe Guide
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
                value={inputs.vibeGuideName}
                type="text"
                name="vibeGuideName"
                placeholder="Name"
                className="px-4 py-3 border border-[gray] rounded-[10px] bg-[#FFFFFF] focus:outline-none w-[90%] h-[50px] "
              />
              <textarea
                name="description"
                value={inputs.description}
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
                        // value={inputs?.sunTimeIn?.split(" ")[0]}
                        value={
                          initialSunTimeIn && initialSunTimeIn?.split(" ")[0]
                        }
                        name="sunTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />
                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        // value={inputs.sunTimeOut}
                        value={
                          initialSunTimeOut && initialSunTimeOut?.split(" ")[0]
                        }
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
                          value={
                            initialSunAdditionalTimeIn &&
                            initialSunAdditionalTimeIn?.split(" ")[0]
                          }
                          name="sunAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />
                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          value={
                            initialSunAdditionalTimeOut &&
                            initialSunAdditionalTimeOut?.split(" ")[0]
                          }
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
                        value={
                          initialMonTimeIn && initialMonTimeIn?.split(" ")[0]
                        }
                        name="monTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />
                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        value={
                          initialMonTimeOut && initialMonTimeOut?.split(" ")[0]
                        }
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
                          value={
                            initialMonAdditionalTimeIn &&
                            initialMonAdditionalTimeIn?.split(" ")[0]
                          }
                          name="monAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />
                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          value={
                            initialMonAdditionalTimeOut &&
                            initialMonAdditionalTimeOut?.split(" ")[0]
                          }
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
                        value={
                          initialTueTimeIn && initialTueTimeIn?.split(" ")[0]
                        }
                        name="tueTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />

                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        value={
                          initialTueTimeOut && initialTueTimeOut?.split(" ")[0]
                        }
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
                          value={
                            initialTueAdditionalTimeIn &&
                            initialTueAdditionalTimeIn?.split(" ")[0]
                          }
                          name="tueAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />

                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          value={
                            initialTueAdditionalTimeOut &&
                            initialTueAdditionalTimeOut?.split(" ")[0]
                          }
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
                        value={
                          initialWedTimeIn && initialWedTimeIn?.split(" ")[0]
                        }
                        name="wedTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />

                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        value={
                          initialWedTimeOut && initialWedTimeOut?.split(" ")[0]
                        }
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
                          value={
                            initialWedAdditionalTimeIn &&
                            initialWedAdditionalTimeIn?.split(" ")[0]
                          }
                          name="wedAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />

                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          value={
                            initialWedAdditionalTimeOut &&
                            initialWedAdditionalTimeOut?.split(" ")[0]
                          }
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
                        value={
                          initialThursTimeIn &&
                          initialThursTimeIn?.split(" ")[0]
                        }
                        name="thursTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />

                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        value={
                          initialThursTimeOut &&
                          initialThursTimeOut?.split(" ")[0]
                        }
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
                          value={
                            initialThursAdditionalTimeIn &&
                            initialThursAdditionalTimeIn?.split(" ")[0]
                          }
                          name="thursAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />

                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          value={
                            initialThursAdditionalTimeOut &&
                            initialThursAdditionalTimeOut?.split(" ")[0]
                          }
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
                        value={
                          initialFriTimeIn && initialFriTimeIn?.split(" ")[0]
                        }
                        name="friTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />

                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        value={
                          initialFriTimeOut && initialFriTimeOut?.split(" ")[0]
                        }
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
                          value={
                            initialFriAdditionalTimeIn &&
                            initialFriAdditionalTimeIn?.split(" ")[0]
                          }
                          name="friAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />

                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          value={
                            initialFriAdditionalTimeOut &&
                            initialFriAdditionalTimeOut?.split(" ")[0]
                          }
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
                        value={
                          initialSatTimeIn && initialSatTimeIn?.split(" ")[0]
                        }
                        name="satTimeIn"
                        className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                      />

                      <HiMinus size={30} />
                      <input
                        onChange={inputsHandler}
                        type="time"
                        name="satTimeOut"
                        value={
                          initialSatTimeOut && initialSatTimeOut?.split(" ")[0]
                        }
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
                          value={
                            initialSatAdditionalTimeIn &&
                            initialSatAdditionalTimeIn?.split(" ")[0]
                          }
                          name="satAdditionalTimeIn"
                          className="border border-[gray] rounded-[10px] w-1/2 h-[35px] text-[12px] flex justify-center items-center"
                        />

                        <HiMinus size={30} />
                        <input
                          onChange={inputsHandler}
                          type="time"
                          value={
                            initialSatAdditionalTimeOut &&
                            initialSatAdditionalTimeOut?.split(" ")[0]
                          }
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
                  value={inputs.thirtyMinSession}
                  name="thirtyMinSession"
                  placeholder="$"
                  className="px-4 py-3 border border-[gray] rounded-[10px] bg-[#FFFFFF] focus:outline-none w-[50%] h-[50px] "
                />
                <p className="font-semibold mt-[5px]">60 Min Session</p>
                <input
                  onChange={inputsHandler}
                  type="number"
                  value={inputs.SixtyMinSession}
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
                {err && <ErrorMessage>{err}</ErrorMessage>}
                {/* <Button text="Save" type="submit" bgColor="#359D9E" color="white" width={150} borderRadius={10} /> */}
                <br />
                {/* <Button text="Cancle" handleClick={} bgColor="white" shadow={`1px 2px 9px #00000029`} color="#EF3A71" width={150} borderRadius={10} /> */}
              </div>
            </div>
            <div>
              <div className="flex">
                <div
                  className="w-[200px] h-[220px] rounded-lg bg-[#f0f5f1]  ml-5 relative"
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
                    className="cursor-pointer  bg-black h-2/3 w-10/12 absolute top-[0] left-[0] opacity-0"
                  />
                  {inputs.photo ? (
                    <img
                      src={
                        typeof inputs.photo === "string"
                          ? inputs.photo
                          : URL.createObjectURL(inputs.photo)
                      }
                      alt="vibe-guide"
                      className="w-[10vw] h-[20vh]"
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

                {/* <div className='w-[200px] h-[220px] rounded-lg bg-[#f0f5f1]  ml-5 '
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <div className='w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]'
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                                    <div className='w-[100px] h-[100px] bg-[#E5ECE7] rounded-[15px]'
                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <FiImage color='#1C5C2E' size={40} />
                                    </div>
                                </div>
                                <p className='text-[#979B9F] text-[14px] text-center mt-5'><span className='underline text-[#1C5C2E] font-medium '> Upload </span> or Drag   <br /> Profile Crop Image Here</p>

                            </div> */}

                <div
                  className="w-[200px] h-[220px] rounded-lg bg-[#f0f5f1] ml-5 relative"
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
                    name="video"
                    accept="video/*"
                    className="cursor-pointer bg-black h-[40vh] w-[13vw] absolute opacity-0"
                  />

                  {inputs?.video &&
                  typeof inputs?.video == "string" &&
                  inputs?.video !== "undefined" ? (
                    // <video controls className="w-[12vw] h-[23vh]">
                    <div>
                      <video
                        controls
                        className="h-40 w-[12vw] object-fill rounded-xl"
                      >
                        <source
                          src={
                            typeof inputs?.video === "string"
                              ? inputs?.video
                              : URL.createObjectURL(inputs?.video)
                          }
                        />
                        Sorry, your browser doesn't support videos.
                      </video>
                    </div>
                  ) : inputs?.video && typeof inputs?.video == "object" ? (
                    <video
                      controls
                      className="h-40 w-[12vw] object-fill rounded-xl"
                    >
                      <source src={URL.createObjectURL(inputs?.video)} />
                      Sorry, your browser doesn't support videos.
                    </video>
                  ) : (
                    <>
                      <div
                        className=" cursor-pointer w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]"
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
                        or Drag <br /> Video Here
                      </p>
                    </>
                  )}
                </div>
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

export default EditVibeGuide;
