import React from "react";
import BackButton from "../../../components/BackButton";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import teacher from "./webScreenImages/teacher.png";
import Box from "../../../components/Box";
import CameraBox from "../../../components/CameraBox";
import { FiVideo } from "react-icons/fi";

const TeachersScreen = () => {
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
        heading="Teachers"
        horizontalLine={
          <div className="border-t border-[#1C5C2E]  w-[35%] mt-[15px] mx-4"></div>
        }
        text={
          <p className="text-[#1C5C2E] font-medium  text-[18px]">Preview:</p>
        }
        btn={
          <div onClick={() => setShowModal(true)} className="ml-[350px]">
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
        <div className="m-10 space-y-10">
          <Box
            absoluteDiv={
              <div className="w-[80px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold "> Heading</p>
              </div>
            }
            subHeading={`Teacher`}
            line={<div className="border border-t-1 border-[#1C5C2E] mt-4" />}
            div={
              <div className="flex justify-between">
                <CameraBox
                  icon={<FiVideo color="#1C5C2E" size={20} />}
                  text={
                    <p>
                      Upload & Drag <br /> From Here
                    </p>
                  }
                />
                <p className="text-gray text-[14px] w-[75%]">
                  Body copy style for white text on dark or gradient backgrounds
                  (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Mauris placerat euismod porttitor.
                </p>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[120px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Related Content</p>
              </div>
            }
            div={
              <div className="flex flex-col space-y-5">
                <div className="w-[100%] flex justify-end">
                  <Button
                    text={`+ Add Related Content`}
                    bgColor={`#1C5C2E`}
                    color={`#fff`}
                    borderRadius={10}
                  />
                </div>
                <div className="flex justify-between space-x-10">
                  <div className="h-[60px]">
                    {" "}
                    <CameraBox
                      icon={<FiVideo color="#1C5C2E" size={20} />}
                      text={
                        <p>
                          Upload & Drag <br /> From Here
                        </p>
                      }
                    />
                  </div>
                  <div className="w-[300px] h-[120px] border border-[#1C5C2E] rounded-[18px]">
                    <p className="text-gray m-5">Details.....</p>
                    <div className="border border-t-1 border-[#1C5C2E] mt-10" />
                    <p className="text-gray mt-[2px] px-4">
                      #Tags #Tags #Tags #Tags
                    </p>
                  </div>
                </div>
                <div className="flex justify-between space-x-10">
                  <div className="h-[60px]">
                    {" "}
                    <CameraBox
                      icon={<FiVideo color="#1C5C2E" size={20} />}
                      text={
                        <p>
                          Upload & Drag <br /> From Here
                        </p>
                      }
                    />
                  </div>
                  <div className="w-[300px] h-[120px] border border-[#1C5C2E] rounded-[18px]">
                    <p className="text-gray m-5">Details.....</p>
                    <div className="border border-t-1 border-[#1C5C2E] mt-10" />
                    <p className="text-gray mt-[2px] px-4">
                      #Tags #Tags #Tags #Tags
                    </p>
                  </div>
                </div>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[120px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Nightlight Reels</p>
              </div>
            }
            div={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className="w-[200px] h-[120px] border border-[#1C5C2E] rounded-[18px] ">
                  <p className="m-2">Link Display name</p>
                  <div className="border border-t-1 border-[#1C5C2E] mt-2" />
                  <p className="text-gray text-[14px] m-2">
                    Column Body Copy - same as default body copy style. Lorem
                    ipsum dolor sit amet
                  </p>
                </div>
                <div className="w-[200px] h-[120px] border border-[#1C5C2E] rounded-[18px] ml-4">
                  <p className="m-2">Link Display name</p>
                  <div className="border border-t-1 border-[#1C5C2E] mt-2" />
                  <p className="text-gray text-[14px] m-2">
                    Column Body Copy - same as default body copy style. Lorem
                    ipsum dolor sit amet
                  </p>
                </div>

                <div className="w-[200px] h-[120px] border border-[#1C5C2E] rounded-[18px] mt-4">
                  <p className="m-2">Link Display name</p>
                  <div className="border border-t-1 border-[#1C5C2E] mt-2" />
                  <p className="text-gray text-[14px] m-2">
                    Column Body Copy - same as default body copy style. Lorem
                    ipsum dolor sit amet
                  </p>
                </div>

                <div className="w-[200px] h-[120px] border border-[#1C5C2E] rounded-[18px] ml-4 mt-4">
                  <p className="m-2">Link Display name</p>
                  <div className="border border-t-1 border-[#1C5C2E] mt-2" />
                  <p className="text-gray text-[14px] m-2">
                    Column Body Copy - same as default body copy style. Lorem
                    ipsum dolor sit amet
                  </p>
                </div>
              </div>
            }
          />
        </div>
        <div>
          <img src={teacher} alt="teacher screen" />
        </div>
      </div>
    </>
  );
};

export default TeachersScreen;
