import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import BackButton from "../../../components/BackButton";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import Modal from "react-overlays/Modal";
import { useState } from "react";
import Box from "../../../components/Box";
import setting from "./screenImages/setting.png";

const SettingsScreen = () => {
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
        heading="Search Screen"
        horizontalLine={
          <div className="border-t border-[#1C5C2E]  w-[68%] mt-[15px] mx-4"></div>
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
              <div className="w-[80px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Settings</p>
              </div>
            }
            div={
              <div className="flex flex-col space-y-5">
                <input
                  placeholder="Email Notifications"
                  type="text"
                  className="bg-[#E5ECE7] w-[300px] h-[40px] rounded-[9px] placeholder-ml-5 outline-none"
                />
                <input
                  placeholder="Push Notifications"
                  type="text"
                  className="bg-[#E5ECE7] w-[300px] h-[40px] rounded-[9px] outline-none"
                />
                <input
                  placeholder="Edit Email"
                  type="text"
                  className="bg-[#E5ECE7] w-[300px] h-[40px] rounded-[9px] outline-none"
                />
                <input
                  placeholder="Change Password"
                  type="text"
                  className="bg-[#E5ECE7] w-[300px] h-[40px] rounded-[9px]  outline-none"
                />
                <input
                  placeholder="Manage Subscriptions"
                  type="text"
                  className="bg-[#E5ECE7] w-[300px] h-[40px] rounded-[9px] outline-none"
                />
                <input
                  placeholder="Logout"
                  type="text"
                  className="bg-[#E5ECE7] w-[300px] h-[40px] rounded-[9px] outline-none"
                />
                <input
                  placeholder="Contact Us"
                  type="text"
                  className="bg-[#E5ECE7] w-[300px] h-[40px] rounded-[9px] outline-none"
                />
                <input
                  placeholder="Privacy Policy"
                  type="text"
                  className="bg-[#E5ECE7] w-[300px] h-[40px] rounded-[9px] outline-none"
                />
                <input
                  placeholder="Terms & Coditions"
                  type="text"
                  className="bg-[#E5ECE7] w-[300px] h-[40px] rounded-[9px] outline-none"
                />
              </div>
            }
          />
        </div>

        <div>
          <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
          <div className="w-[300px] h-[550px] flex flex-col rounded-[40px] mt-10">
            <img
              src={setting}
              alt="mobileImg"
              className="rounded-[40px] relative"
              width={"100%"}
              height={"100%"}
            />
          </div>
        </div>
      </div>

      <Modal
        className="modal"
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        <div className="flex flex-col justify-center items-center px-4 py-4 space-y-10">
          <p className="text-[#1C5C2E]">Application Update Successfully!</p>
          <div onClick={handleClose}>
            <Button
              text="Close"
              bgColor="#1C5C2E"
              color="#fff"
              borderRadius={5}
              width={100}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SettingsScreen;
