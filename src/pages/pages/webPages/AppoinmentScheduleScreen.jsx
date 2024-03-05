import React from "react";
import BackButton from "../../../components/BackButton";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import appoinmentSchedule from "./webScreenImages/appoinmentSchedule.png";
import Box from "../../../components/Box";
import CameraBox from "../../../components/CameraBox";
import { FiCamera, FiVideo } from "react-icons/fi";

const AppoinmentScheduleScreen = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/Pages");
  };

  const [showModal, setShowModal] = useState(false);
  var handleClose = () => setShowModal(false);

  var handleSave = () => {
    console.log("success");
  };

  const renderBackdrop = (props) => <div className="backdrop" {...props} />;
  return (
    <>
      <div onClick={handleBack}>
        <BackButton />
      </div>
      <MobileScreenHeader
        heading="Teacher Schedule"
        horizontalLine={
          <div className="border-t border-[#1C5C2E]  w-[70%] mt-[15px] mx-4"></div>
        }
        btn={
          <div>
            {" "}
            <Button
              text="Update Site"
              bgColor="#1C5C2E"
              borderRadius={10}
              width={150}
              color="#fff"
            />{" "}
          </div>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 space-y-10">
        <div className="m-10 space-y-10">
          <Box
            absoluteDiv={
              <div className="w-[130px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Teacher Schedule</p>
              </div>
            }
            text={<p className="mt-5 m-10">Katie Schedule</p>}
          />
          <Box
            absoluteDiv={
              <div className="w-[120px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Session Heading</p>
              </div>
            }
            text={<p className="mt-4 mt-4 m-10">Session Length</p>}
          />
          <Box
            absoluteDiv={
              <div className="w-[170px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Time Selection Heading</p>
              </div>
            }
            text={
              <p className="mt-4 mt-4 m-10">
                Choose time for your Session.....
              </p>
            }
          />
          <Button
            text={`Button Text`}
            border={`1px solid #1C5C2E`}
            width={180}
            borderRadius={10}
          />
          <Box
            absoluteDiv={
              <div className="w-[60px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Note</p>
              </div>
            }
            text={
              <p className="mt-4 mt-4 m-10">
                Katie Will email you to coordinate with zoom meetings....
              </p>
            }
          />
        </div>
        <div>
          <h1 className="text-[#1C5C2E] text-[24px] mb-5">Previwe:</h1>
          <img src={appoinmentSchedule} alt="appoinmentSchedule" />
        </div>
      </div>
    </>
  );
};

export default AppoinmentScheduleScreen;
