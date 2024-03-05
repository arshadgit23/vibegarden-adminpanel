import React from "react";
import BackButton from "../../../components/BackButton";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import search from "./webScreenImages/search.png";
import Box from "../../../components/Box";
import CameraBox from "../../../components/CameraBox";
import { FiCamera, FiVideo } from "react-icons/fi";

const SearchScreen = () => {
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
        heading="Search Result"
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
              <div className="w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Screen Image</p>
              </div>
            }
            div={
              <div className="flex justify-center items-center w-[100%] h-[180px]">
                <CameraBox
                  icon={<FiCamera color="#1C5C2E" size={20} />}
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
              <div className="w-[140px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Bottom Image Text</p>
              </div>
            }
            text={
              <p className="mt-4 text-center">
                Join the quest & won your vibe Got the free VibeBloom App
              </p>
            }
          />
        </div>
        <div>
          <h1 className="text-[#1C5C2E] text-[24px] mb-5">Previwe:</h1>
          <img src={search} alt="signup screen" />
        </div>
      </div>
    </>
  );
};

export default SearchScreen;
