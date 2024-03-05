import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import { Button } from "../../../components";
import selectAvatar from "./webScreenImages/selectAvatar.png";
import Box from "../../../components/Box";
import { FiCamera } from "react-icons/fi";
import CameraBox from "../../../components/CameraBox";

const SelectAvatarScreen = () => {
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
        heading="Select Avatar"
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
        <div className="m-10">
          <Box
            div={
              <div className="flex flex-col w-[100%]">
                <div className="flex justify-center items-center ">
                  <p className="text-center w-[200px] text-[20px] text-[#aebdb2]">
                    Which of these avatars resonate you most?
                  </p>
                </div>
                <div className="flex justify-around mt-10">
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
                  <CameraBox
                    icon={<FiCamera color="#1C5C2E" size={20} />}
                    text={
                      <p>
                        Upload & Drag <br /> From Here
                      </p>
                    }
                  />
                </div>
                <div className="flex justify-around mt-4">
                  <p className="text-gray">Text</p>
                  <p className="text-gray">Text</p>
                  <p className="text-gray">Text</p>
                  <p className="text-gray">Text</p>
                  <p className="text-gray">Text</p>
                </div>
                <div className="flex justify-center mt-10">
                  <Button
                    text={`Button Text`}
                    border={`1px solid #1C5C2E`}
                    shadow={`1px 2px 9px #00000029`}
                    color={`#1C5C2E`}
                    width={150}
                    borderRadius={10}
                  />
                </div>
              </div>
            }
          />
        </div>
        <div>
          <img src={selectAvatar} alt="select avatar screen" />
        </div>
      </div>
    </>
  );
};

export default SelectAvatarScreen;
