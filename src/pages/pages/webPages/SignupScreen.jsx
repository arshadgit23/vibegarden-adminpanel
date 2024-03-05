import React from "react";
import BackButton from "../../../components/BackButton";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import signup from "./webScreenImages/signup.png";
import Box from "../../../components/Box";
import CameraBox from "../../../components/CameraBox";
import { FiCamera, FiVideo } from "react-icons/fi";
const SignupScreen = () => {
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
        heading="Signup"
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
              <div className="w-[120px] h-[40px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Page Heading</p>
              </div>
            }
            subHeading={<p className="mt-5">Brilliant Choice You !</p>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 space-y-10">
            <div className="mt-10">
              <Box
                absoluteDiv={
                  <div className="w-[70px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                    <p className="font-semibold ">Point #1</p>
                  </div>
                }
                text={
                  <p className="mt-5 text-gray text-center">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt.
                  </p>
                }
              />
            </div>
            <div>
              <Box
                absoluteDiv={
                  <div className="w-[70px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                    <p className="font-semibold ">Point #1</p>
                  </div>
                }
                text={
                  <p className="mt-5 text-gray text-center">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt.
                  </p>
                }
              />
            </div>
            <div>
              <Box
                absoluteDiv={
                  <div className="w-[70px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                    <p className="font-semibold ">Point #1</p>
                  </div>
                }
                text={
                  <p className="mt-5 text-gray text-center">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt.
                  </p>
                }
              />
            </div>
            <div>
              <Box
                absoluteDiv={
                  <div className="w-[70px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                    <p className="font-semibold ">Point #1</p>
                  </div>
                }
                text={
                  <p className="mt-5 text-gray text-center">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt.
                  </p>
                }
              />
            </div>
            <div>
              <Box
                absoluteDiv={
                  <div className="w-[70px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                    <p className="font-semibold ">Point #1</p>
                  </div>
                }
                text={
                  <p className="mt-5 text-gray text-center">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt.
                  </p>
                }
              />
            </div>
            <div>
              <Box
                absoluteDiv={
                  <div className="w-[70px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                    <p className="font-semibold ">Point #1</p>
                  </div>
                }
                text={
                  <p className="mt-5 text-gray text-center">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt.
                  </p>
                }
              />
            </div>
          </div>
          <Box
            div={
              <div className="flex justify-center items-center w-[100%] h-[180px]">
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
              <div className="w-[80px] h-[40px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold "> Heading</p>
              </div>
            }
            subHeading={`Lorem ipsum dolor sit`}
            line={<div className="border border-t-1 border-[#1C5C2E] mt-4" />}
            text={
              <p className="text-gray text-center mt-2">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo
              </p>
            }
          />
        </div>
        <div>
          <h1 className="text-[#1C5C2E] text-[24px] mb-5">Previwe:</h1>
          <img src={signup} alt="signup screen" />
        </div>
      </div>
    </>
  );
};

export default SignupScreen;
