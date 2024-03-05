import React from "react";
import BackButton from "../../../components/BackButton";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "../../../components/Box";
import bloomCheck from "./screenImages/bloomCheck.png";

const BloomCheckScreen = () => {
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
        heading="Blooms Check Screen"
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
        <div className="m-10 space-y-10">
          <Box
            heading=" Descriptive Text"
            absoluteDiv={
              <div className="w-[140px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Descriptive Text</p>
              </div>
            }
            div={
              <div className="flex flex-col  w-[100%] space-y-5">
                <div className="w-[50%] h-[50px] bg-[#E5ECE7] rounded-lg">
                  <p className="text-[14px] m-4 text-[gray]">Blooms Check</p>
                </div>
                <div className="w-[100%] h-[80px] bg-[#E5ECE7] rounded-lg">
                  <p className="text-[14px] m-4 text-[gray]">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore
                  </p>
                </div>{" "}
                <div className="w-[100%] h-[50px] bg-[#E5ECE7] rounded-lg">
                  <p className="text-[14px] m-4 text-[gray]">
                    Refine Your Vibe:
                  </p>
                </div>
              </div>
            }
          />
        </div>
        <div>
          <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
          <div className="w-[300px] h-[550px] flex flex-col rounded-[40px] mt-10">
            <img
              src={bloomCheck}
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

export default BloomCheckScreen;
