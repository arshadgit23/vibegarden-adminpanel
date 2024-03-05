import React from "react";
import BackButton from "../../../components/BackButton";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import footer from "./webScreenImages/footer.png";
import Box from "../../../components/Box";
import CameraBox from "../../../components/CameraBox";
import { FiCamera, FiVideo } from "react-icons/fi";

const FooterScreen = () => {
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
        heading="Footer Screen"
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
              <div className="w-[90px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Logo Text</p>
              </div>
            }
            text={
              <p className="mt-5 m-10">
                Lorem ipsum dolor sit amet, <br /> consetetur sadipscing elitr,
                sed diam.
              </p>
            }
          />
          <Button
            text={`Button Text`}
            border={`1px solid #1C5C2E`}
            width={180}
            borderRadius={10}
          />
          <Box
            absoluteDiv={
              <div className="w-[120px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Contact Us</p>
              </div>
            }
            text={
              <div className="m-10 space-y-5">
                <p className="">Email@mail.com</p>
                <p className="">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                </p>
                <p className="">+222-333-4568</p>
              </div>
            }
          />
          <Box
            absoluteDiv={
              <div className="w-[140px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">News Letter Text</p>
              </div>
            }
            text={
              <p className="mt-4 mt-4 m-10">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
              </p>
            }
          />

          <Box
            absoluteDiv={
              <div className="w-[120px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Copyright Text</p>
              </div>
            }
            text={
              <p className="mt-4 mt-4 m-10">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
              </p>
            }
          />
        </div>
        <div>
          <h1 className="text-[#1C5C2E] text-[24px] mb-5">Previwe:</h1>
          <img src={footer} alt="footer" />
        </div>
      </div>
    </>
  );
};

export default FooterScreen;
