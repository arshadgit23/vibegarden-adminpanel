import React from "react";
import BackButton from "../../../components/BackButton";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "../../../components/Box";
import freshBlooms from "./webScreenImages/freshBlooms.png";
import bannerimg from "./webScreenImages/bannerImg.png";
import { Switch } from "@material-tailwind/react";
import CameraBox from "../../../components/CameraBox";
import { FiCamera, FiLink, FiVideo } from "react-icons/fi";

const FreshBloomsScreen = () => {
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
        heading="Fresh Blooms"
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
              <div className="w-[120px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Page Heading</p>
              </div>
            }
            subHeading={`Heading text....`}
          />
          <Box
            absoluteDiv={
              <div className="w-[120px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Main Qoutation</p>
              </div>
            }
            description={
              <p className="text-gray w-[42%]">
                “There is a sun within every person; the you we call campanion.”
                – Thich Nhat Hahn Hi, You"
              </p>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Heading</p>
              </div>
            }
            subHeading={
              <div className="flex justify-between mx-5 my-2">
                <p className="mt-2"> Headline.....</p>
              </div>
            }
            line={<div className="border border-t-1 border-[#1C5C2E]" />}
            div={
              <div>
                <div className="flex justify-between">
                  <p className="text-gray text-[14px] w-[75%]">
                    Body copy style for white text on dark or gradient
                    backgrounds (Medium Weight) Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Mauris placerat euismod
                    porttitor.
                  </p>
                  <CameraBox
                    icon={<FiVideo color="#1C5C2E" size={20} />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                </div>
                <div className="border border-t-1 border-[#1C5C2E] relative mt-5 w-[100%]"></div>
                <p className="text-gray mt-4 px-4">#Tags #Tags #Tags</p>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Heading</p>
              </div>
            }
            subHeading={
              <div className="flex justify-between mx-5 my-2">
                <p className="mt-2"> Headline.....</p>
              </div>
            }
            line={<div className="border border-t-1 border-[#1C5C2E]" />}
            div={
              <div>
                <div className="flex justify-between">
                  <p className="text-gray text-[14px] w-[75%]">
                    Body copy style for white text on dark or gradient
                    backgrounds (Medium Weight) Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Mauris placerat euismod
                    porttitor.
                  </p>
                  <CameraBox
                    icon={<FiVideo color="#1C5C2E" size={20} />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                </div>
                <div className="border border-t-1 border-[#1C5C2E] relative mt-5 w-[100%]"></div>
                <p className="text-gray mt-4 px-4">#Tags #Tags #Tags</p>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Heading</p>
              </div>
            }
            subHeading={
              <div className="flex justify-between mx-5 my-2">
                <p className="mt-2"> Headline.....</p>
              </div>
            }
            line={<div className="border border-t-1 border-[#1C5C2E]" />}
            div={
              <div>
                <div className="flex justify-between">
                  <p className="text-gray text-[14px] w-[75%]">
                    Body copy style for white text on dark or gradient
                    backgrounds (Medium Weight) Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Mauris placerat euismod
                    porttitor.
                  </p>
                  <CameraBox
                    icon={<FiVideo color="#1C5C2E" size={20} />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                </div>
                <div className="border border-t-1 border-[#1C5C2E] relative mt-5 w-[100%]"></div>
                <p className="text-gray mt-4 px-4">#Tags #Tags #Tags</p>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Heading</p>
              </div>
            }
            subHeading={
              <div className="flex justify-between mx-5 my-2">
                <p className="mt-2"> Headline.....</p>
              </div>
            }
            line={<div className="border border-t-1 border-[#1C5C2E]" />}
            div={
              <div>
                <div className="flex justify-between">
                  <p className="text-gray text-[14px] w-[75%]">
                    Body copy style for white text on dark or gradient
                    backgrounds (Medium Weight) Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Mauris placerat euismod
                    porttitor.
                  </p>
                  <CameraBox
                    icon={<FiVideo color="#1C5C2E" size={20} />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                </div>
                <div className="border border-t-1 border-[#1C5C2E] relative mt-5 w-[100%]"></div>
                <p className="text-gray mt-4 px-4">#Tags #Tags #Tags</p>
              </div>
            }
          />
        </div>
        <div>
          <img src={freshBlooms} alt="" />
        </div>
      </div>
    </>
  );
};

export default FreshBloomsScreen;
