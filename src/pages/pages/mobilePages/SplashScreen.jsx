import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { Button } from "../../../components";
import BackButton from "../../../components/BackButton";
import Box from "../../../components/Box";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import Modal from "react-overlays/Modal";
import splash from "./screenImages/splash.png";
import "./style1.css";
import { useNavigate } from "react-router-dom";
const SplashScreen = () => {
  const [file, setFile] = useState();
  const [Text, setText] = useState({
    btnText1: "",
    btnText2: "",
    description: "",
  });
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const [showModal, setShowModal] = useState(false);
  var handleClose = () => setShowModal(false);

  var handleSave = () => {
    console.log("success");
  };

  const renderBackdrop = (props) => <div className="backdrop" {...props} />;
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/Pages");
  };
  return (
    <>
      <div onClick={handleBack}>
        <BackButton />
      </div>
      <MobileScreenHeader
        heading="Splash Screen"
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
          <div className="w-[] h-[300px] ">
            <Input
              color="teal"
              size="lg"
              type="file"
              label="Outlined"
              name="image"
              onChange={handleChange}
              style={{ height: 200 }}
              className="block w-full text-sm text-slate-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-violet-50 file:text-violet-700
                                      hover:file:bg-violet-100"
            />
          </div>
          <Box
            absoluteDiv={
              <div className="w-[130px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Main Qoutation</p>
              </div>
            }
            description={
              <p contentEditable="true" className="m-2">
                {Text.description}
              </p>
            }
            inputBtn={
              <input
                type="text"
                placeholder="Button Text"
                value={Text.btnText1}
                onChange={(e) => setText(e.target.value)}
                className="border border-gray rounded-[18px] h-[50px] placeholder:text-center focus:outline-none "
              />
            }
            inputBtn2={
              <input
                type="text"
                placeholder="Button Text"
                value={Text.btnText2}
                onChange={(e) => setText(e.target.value)}
                className="border border-gray rounded-[18px] h-[50px] placeholder:text-center focus:outline-none "
              />
            }
          />
        </div>
        <div>
          <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
          <div className="w-[300px] h-[510px] flex flex-col  rounded-[40px] mt-10">
            <img
              src={splash}
              alt="mobileImg"
              className=""
              width="100%"
              height={"100%"}
            />
            {/* <div className="flex flex-col  items-center my-4 absloute top-10 space-y-4">
                            <Button text={Text.btnText1} bgColor="pink" color="#fff" width={250} height={50} borderRadius={20} />
                            <Button text={Text.btnText2} bgColor="pink" border={`1px solid #fff`} color="#fff" width={250} height={50} borderRadius={20} />
                        </div> */}
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
          <Button
            text="Close"
            bgColor="#1C5C2E"
            color="#fff"
            borderRadius={5}
            width={100}
          />
        </div>
      </Modal>
    </>
  );
};

export default SplashScreen;
