import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import { Button } from "../../../components";
import innerPage from "./webScreenImages/innerPage.png";
import Box from "../../../components/Box";
import { FiCamera } from "react-icons/fi";
import CameraBox from "../../../components/CameraBox";

const InnerPageScreen = () => {
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
        heading="Inner Page Screen"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="m-10 space-y-10">
          <Box
            absoluteDiv={
              <div className="w-[180px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Rating Option Heading</p>
              </div>
            }
            div={
              <div className="flex flex-col w-[100%]">
                <div className="flex justify-center items-center ">
                  <p className="text-center w-[250px] text-[20px] text-[#aebdb2]">
                    Did This Tool Bloom Your Vibe?
                  </p>
                </div>
                <div className="flex justify-center space-x-2 mt-10">
                  <CameraBox
                    icon={<FiCamera color="#1C5C2E" size={20} />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                  <CameraBox
                    icon={<FiCamera color="#1C5C2E" size={20} />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                  <CameraBox
                    icon={<FiCamera color="#1C5C2E" size={20} />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                  <CameraBox
                    icon={<FiCamera color="#1C5C2E" size={20} />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                </div>
                <div className="flex justify-center space-x-[55px] mt-4">
                  <p className="text-gray">Text</p>
                  <p className="text-gray">Text</p>
                  <p className="text-gray">Text</p>
                  <p className="text-gray">Text</p>
                </div>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[80px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold "> Heading</p>
              </div>
            }
            text={<p className="mt-5 m-10">Additional Resources</p>}
          />
          <Box
            absoluteDiv={
              <div className="w-[80px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold "> Heading</p>
              </div>
            }
            subHeading={<p className="mt-5 ">Link Display</p>}
            line={<div className="border border-t-1 mt-5 border-[#1C5C2E]" />}
            text={
              <p className="mt-5 m-10">
                Body copy style for white text on dark or gradient backgrounds
                (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Mauris placerat euismod porttitor.
              </p>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[80px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold "> Heading</p>
              </div>
            }
            subHeading={<p className="mt-5 ">Link Display</p>}
            line={<div className="border border-t-1 mt-5 border-[#1C5C2E]" />}
            text={
              <p className="mt-5 m-10">
                Body copy style for white text on dark or gradient backgrounds
                (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Mauris placerat euismod porttitor.
              </p>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[80px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold "> Heading</p>
              </div>
            }
            text={<p className="mt-5 m-10">Suggested Teacher</p>}
          />
          <Box
            absoluteDiv={
              <div className="w-[80px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold "> Heading</p>
              </div>
            }
            div={
              <div className="flex flex-col space-y-5">
                <div className="flex w-[100%]">
                  <CameraBox
                    icon={<FiCamera size={20} color="#1C5C2E" />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                  <p className="w-[75%] ml-2">
                    As you grow and heal your feelings of resonance will
                    definitely change as it moves close your the essential
                    resonance!
                  </p>
                </div>
                <div className="flex w-[100%]">
                  <CameraBox
                    icon={<FiCamera size={20} color="#1C5C2E" />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                  <p className="w-[75%] ml-2">
                    As you grow and heal your feelings of resonance will
                    definitely change as it moves close your the essential
                    resonance!
                  </p>
                </div>
              </div>
            }
          />
        </div>
        <div>
          <h1 className="text-[#1C5C2E] text-[24px] mb-5">Previwe:</h1>
          <img src={innerPage} alt="select avatar screen" />
        </div>
      </div>
    </>
  );
};

export default InnerPageScreen;
