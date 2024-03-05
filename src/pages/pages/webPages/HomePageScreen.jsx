import React from "react";
import BackButton from "../../../components/BackButton";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "../../../components/Box";
import homePage from "./webScreenImages/homePage.png";
import bannerimg from "./webScreenImages/bannerImg.png";
import { Switch } from "@material-tailwind/react";
import CameraBox from "../../../components/CameraBox";
import { FiCamera, FiLink, FiVideo } from "react-icons/fi";

const HomePageScreen = () => {
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
      <div>
        <BackButton />
      </div>

      <MobileScreenHeader
        heading="Home Page"
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
                <p className="font-semibold ">Heading</p>
              </div>
            }
            div={<img src={bannerimg} />}
          />
          <div className="flex justify-between m-5">
            <p>Ad Section</p>
            <Switch />
          </div>
          <Box
            absoluteDiv={
              <div className="w-[150px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Write Content Here</p>
              </div>
            }
            div={
              <div className="flex flex-col">
                <div className="flex ">
                  <p className="text-gray text-[14px] w-[80%]">
                    Body copy style for white text on dark or gradient
                    backgrounds (Medium Weight) Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Mauris placerat euismod
                    porttitor. Body copy style for white text on dark or
                    gradient backgrounds (Medium Weight) Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Mauris placerat euismod.
                  </p>
                  <div>
                    <CameraBox
                      icon={<FiCamera size={20} color="#1C5C2E" />}
                      text={
                        <p>
                          Upload & Drag <br /> From Here
                        </p>
                      }
                    />
                  </div>
                </div>
                <div className="border border-[#0069FF] px-4 py-2 rounded-[50px] h-[40px] mt-4 flex">
                  <FiLink color="#0069FF" size={20} />
                  <p className="text-gray ml-5">https://abc.com</p>
                </div>
              </div>
            }
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
              <div className="w-[80px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Heading</p>
              </div>
            }
            subHeading="Embodying your Fullness"
            line={<div className="border border-t-1 border-[#1C5C2E] mt-4" />}
            text={
              <p className="text-gray text-[14px] m-2">
                Body copy style for white text on dark or gradient backgrounds
                (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Mauris placerat euismod porttitor.
              </p>
            }
            div={
              <div className="flex justify-between -mt-5 w-[100%]">
                <Button
                  text="Button Text"
                  color="#1C5C2E"
                  border={`1px solid #1C5C2E`}
                  borderRadius={25}
                  height={50}
                  width={160}
                />
                <div className="-mt-[20px]">
                  <CameraBox
                    icon={<FiCamera size={20} color="#1C5C2E" />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                </div>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[80px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Heading</p>
              </div>
            }
            subHeading="Coming Home Together"
            line={<div className="border border-t-1 border-[#1C5C2E] mt-4" />}
            text={
              <p className="text-gray text-[14px] m-2">
                Body copy style for white text on dark or gradient backgrounds
                (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Mauris placerat euismod porttitor.
              </p>
            }
            div={
              <div className="flex justify-between -mt-5 w-[100%]">
                <Button
                  text="Button Text"
                  color="#1C5C2E"
                  border={`1px solid #1C5C2E`}
                  borderRadius={25}
                  height={50}
                  width={160}
                />
                <div className="-mt-[20px]">
                  <CameraBox
                    icon={<FiCamera size={20} color="#1C5C2E" />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                </div>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[180px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">How Its Work Section</p>
              </div>
            }
            div={
              <div className="grid grid-cols-1 gap- md:grid-cols-2 gap- lg:grid-cols-2 gap-6 ">
                <div className="flex flex-col justify-center items-center space-y-2">
                  <CameraBox
                    icon={<FiCamera size={20} color="#1C5C2E" />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                  <div className="w-[220px] h-[110px] border border-[#1C5C2E] rounded-[18px]">
                    <p className="text-center mt-[10px]">Column Header Green</p>
                    <div className="border border-t-1 border-[#1C5C2E] mt-2" />
                    <p className="text-gray text-center text-[14px]">
                      Column Body Copy - same as default body copy style. Lorem
                      ipsum dolor sit amet
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center space-y-2">
                  <CameraBox
                    icon={<FiCamera size={20} color="#1C5C2E" />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                  <div className="w-[220px] h-[110px] border border-[#1C5C2E] rounded-[18px]">
                    <p className="text-center mt-[10px]">Column Header Green</p>
                    <div className="border border-t-1 border-[#1C5C2E] mt-2" />
                    <p className="text-gray text-center text-[14px]">
                      Column Body Copy - same as default body copy style. Lorem
                      ipsum dolor sit amet
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center space-y-2">
                  <CameraBox
                    icon={<FiCamera size={20} color="#1C5C2E" />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                  <div className="w-[220px] h-[110px] border border-[#1C5C2E] rounded-[18px]">
                    <p className="text-center mt-[10px]">Column Header Green</p>
                    <div className="border border-t-1 border-[#1C5C2E] mt-2" />
                    <p className="text-gray text-center text-[14px]">
                      Column Body Copy - same as default body copy style. Lorem
                      ipsum dolor sit amet
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center space-y-2">
                  <CameraBox
                    icon={<FiCamera size={20} color="#1C5C2E" />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                  <div className="w-[220px] h-[110px] border border-[#1C5C2E] rounded-[18px]">
                    <p className="text-center mt-[10px]">Column Header Green</p>
                    <div className="border border-t-1 border-[#1C5C2E] mt-2" />
                    <p className="text-gray text-center text-[14px]">
                      Column Body Copy - same as default body copy style. Lorem
                      ipsum dolor sit amet
                    </p>
                  </div>
                </div>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[85px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Heading #1</p>
              </div>
            }
            subHeading="H3 Headline Style Green"
            line={<div className="border border-t-1 border-[#1C5C2E] mt-4" />}
            text={
              <p className="text-gray text-[14px] m-2">
                Body copy style for white text on dark or gradient backgrounds
                (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Mauris placerat euismod porttitor.
              </p>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[85px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Heading #2</p>
              </div>
            }
            subHeading="H3 Headline Style Green"
            line={<div className="border border-t-1 border-[#1C5C2E] mt-4" />}
            text={
              <p className="text-gray text-[14px] m-2">
                Body copy style for white text on dark or gradient backgrounds
                (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Mauris placerat euismod porttitor.
              </p>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[85px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Heading #3</p>
              </div>
            }
            subHeading="H3 Headline Style Green"
            line={<div className="border border-t-1 border-[#1C5C2E] mt-4" />}
            text={
              <p className="text-gray text-[14px] m-2">
                Body copy style for white text on dark or gradient backgrounds
                (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Mauris placerat euismod porttitor.
              </p>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[85px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Heading #4</p>
              </div>
            }
            subHeading="H3 Headline Style Green"
            line={<div className="border border-t-1 border-[#1C5C2E] mt-4" />}
            text={
              <p className="text-gray text-[14px] m-2">
                Body copy style for white text on dark or gradient backgrounds
                (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Mauris placerat euismod porttitor.
              </p>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[85px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Heading</p>
              </div>
            }
            subHeading="Sample Tools"
          />
          <Box
            absoluteDiv={
              <div className="w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Sample Tool #1</p>
              </div>
            }
            subHeading={
              <div className="flex justify-between mx-5 my-2">
                <p className="mt-2">Gradient Card Headline</p>
                <CameraBox
                  icon={<FiCamera size={20} color="#1C5C2E" />}
                  text={<p>Change Icon</p>}
                />
              </div>
            }
            line={<div className="border border-t-1 border-[#1C5C2E]" />}
            div={
              <div className="flex justify-between">
                <p className="text-gray text-[14px] w-[75%]">
                  Body copy style for white text on dark or gradient backgrounds
                  (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Mauris placerat euismod porttitor.
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
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Sample Tool #1</p>
              </div>
            }
            subHeading={
              <div className="flex justify-between mx-5 my-2">
                <p className="mt-2">Gradient Card Headline</p>
                <CameraBox
                  icon={<FiCamera size={20} color="#1C5C2E" />}
                  text={<p>Change Icon</p>}
                />
              </div>
            }
            line={<div className="border border-t-1 border-[#1C5C2E]" />}
            div={
              <div className="flex justify-between">
                <p className="text-gray text-[14px] w-[75%]">
                  Body copy style for white text on dark or gradient backgrounds
                  (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Mauris placerat euismod porttitor.
                </p>
                <div className="mt-5">
                  <CameraBox
                    icon={<FiVideo color="#1C5C2E" size={20} />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                </div>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[85px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Heading</p>
              </div>
            }
            subHeading="More About Vibe Garden"
          />
          <Box
            absoluteDiv={
              <div className="w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Sample Tool #1</p>
              </div>
            }
            subHeading={
              <div className="flex justify-between mx-2 my-2">
                <p className="mt-2">A Creation Story</p>
              </div>
            }
            line={<div className="border border-t-1 border-[#1C5C2E]" />}
            div={
              <div className="">
                <div className="flex justify-between">
                  <p className="text-gray text-[14px] w-[75%]">
                    Body copy style for white text on dark or gradient
                    backgrounds (Medium Weight) Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Mauris placerat euismod
                    porttitor.
                  </p>
                  <div className="mt-5">
                    <CameraBox
                      icon={<FiVideo color="#1C5C2E" size={20} />}
                      text={
                        <p>
                          Upload & Drag <br /> From Here
                        </p>
                      }
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <Button
                    text="Button Text"
                    color="#1C5C2E"
                    border={`1px solid #1C5C2E`}
                    borderRadius={25}
                    height={50}
                    width={160}
                  />
                </div>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Sample Tool #1</p>
              </div>
            }
            subHeading={
              <div className="flex justify-between mx-2 my-2">
                <p className="mt-2">The Vibe Bloom App</p>
              </div>
            }
            line={<div className="border border-t-1 border-[#1C5C2E]" />}
            div={
              <div className="">
                <div className="flex justify-between">
                  <p className="text-gray text-[14px] w-[75%]">
                    Body copy style for white text on dark or gradient
                    backgrounds (Medium Weight) Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Mauris placerat euismod
                    porttitor.
                  </p>
                  <div className="mt-5">
                    <CameraBox
                      icon={<FiVideo color="#1C5C2E" size={20} />}
                      text={
                        <p>
                          Upload & Drag <br /> From Here
                        </p>
                      }
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <Button
                    text="Button Text"
                    color="#1C5C2E"
                    border={`1px solid #1C5C2E`}
                    borderRadius={25}
                    height={50}
                    width={160}
                  />
                </div>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Sample Tool #1</p>
              </div>
            }
            subHeading={
              <div className="flex justify-between mx-2 my-2">
                <p className="mt-2">Teachers</p>
              </div>
            }
            line={<div className="border border-t-1 border-[#1C5C2E]" />}
            div={
              <div className="">
                <div className="flex justify-between">
                  <p className="text-gray text-[14px] w-[75%]">
                    Body copy style for white text on dark or gradient
                    backgrounds (Medium Weight) Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Mauris placerat euismod
                    porttitor.
                  </p>
                  <div className="mt-5">
                    <CameraBox
                      icon={<FiVideo color="#1C5C2E" size={20} />}
                      text={
                        <p>
                          Upload & Drag <br /> From Here
                        </p>
                      }
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <Button
                    text="Button Text"
                    color="#1C5C2E"
                    border={`1px solid #1C5C2E`}
                    borderRadius={25}
                    height={50}
                    width={160}
                  />
                </div>
              </div>
            }
          />
        </div>
        <div>
          <img src={homePage} alt="home page" />
        </div>
      </div>
    </>
  );
};

export default HomePageScreen;
