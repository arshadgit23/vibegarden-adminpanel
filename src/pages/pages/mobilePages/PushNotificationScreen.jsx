import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import { Button } from "../../../components";
import pushNotification from "./screenImages/pushNotification.png";
import Box from "../../../components/Box";

const PushNotificationScreen = () => {
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
        heading="Push notification Screen"
        horizontalLine={
          <div className="border-t border-[#1C5C2E]  w-[60%] mt-[15px] mx-4"></div>
        }
        btn={
          <div onClick={() => setShowModal(true)}>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="m-10">
          <Box
            heading="Descriptive Text"
            absoluteDiv={
              <div className="w-[140px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Descriptive Text</p>
              </div>
            }
            div={
              <div>
                <p className="text-gray text-[18px] -mt-2">
                  Push Notifications
                </p>
                <p className="text-gray text-[14px] mt-4 w-[250px]">
                  When Is A Good Time For Me To Send Your Personalized
                  Recommendations?
                </p>
              </div>
            }
          />
        </div>
        <div>
          <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
          <div className="w-[300px] h-[550px] flex flex-col rounded-[40px] mt-10">
            <img
              src={pushNotification}
              alt="mobileImg"
              className="rounded-[40px] relative"
              width={"100%"}
              height={"100%"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PushNotificationScreen;
