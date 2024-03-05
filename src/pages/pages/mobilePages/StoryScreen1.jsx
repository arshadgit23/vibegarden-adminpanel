import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import BackButton from "../../../components/BackButton";
import Box from "../../../components/Box";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import story1 from "./screenImages/story1.png";

// onClick={() => setShowModal(true)}
const StoryScreen1 = () => {
  const [file, setFile] = useState();
  const [Text, setText] = useState("");
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
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
        <div className="m-10">
          <div className="w-[] h-[300px] ">
            <Input
              color="teal"
              size="lg"
              type="file"
              label="Back Ground Image"
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
              <div className="w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
                <p className="font-semibold ">Screen Text</p>
              </div>
            }
            heading="Screen Text"
            description={
              <textarea
                rows="5"
                type="text"
                value={Text}
                onChange={(e) => setText(e.target.value)}
                className="outline-none w-[80%]"
                placeholder="Lorem ipsum dolor sit amet, conseteturn sadipscing "
              />
            }
          />
        </div>
        <div>
          <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
          <div className="w-[300px] h-[510px] flex flex-col rounded-[40px] mt-10">
            <img
              src={story1}
              alt="mobileImg"
              className="rounded-[40px] relative"
              width={"100%"}
              height={"100%"}
            />
            <div className="w-[80%]">
              <p className="text-[#1C5C2E]  text-center mt-10">{Text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryScreen1;
