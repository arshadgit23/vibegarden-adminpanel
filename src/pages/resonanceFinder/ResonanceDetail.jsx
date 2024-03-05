import React from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import BackButton from "../../components/BackButton";
import ButtonsHeader from "../../components/ButtonsHeader";
import classes from "./style.module.css";
import { useState } from "react";
import apicall from "../../assets/api/axios";
import Loader from "../../components/Loader";
import { useEffect } from "react";
import { ImageUrl } from "../../assets/api/axios";

const ResonanceDetail = () => {
  const [inputs, setInputs] = useState({
    direction: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resonanceDetails, setResonanceDetails] = useState();
  const [change, setChange] = useState(false);
  const navigate = useNavigate();
  const handleClickNext = () => {
    navigate("/resonanceQuestion");
  };

  useEffect(() => {
    const getResonanceDetails = async () => {
      try {
        setLoading(true);
        const response = await apicall.get("/resonance-finder");
        setResonanceDetails(response?.data?.data);
        setInputs({
          direction: response?.data?.data?.direction,
        });
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message
            ? error.response?.data?.message
            : error.message
        );
        setLoading(false);
      }
    };
    getResonanceDetails();
  }, [change]);

  const inputsHandler = (e) => {
    const { name, value, files } = e.target;
    setInputs((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "direction",
      inputs.direction ? inputs.direction : resonanceDetails?.direction
    );
    formData.append(
      "thumbnail",
      inputs.image ? inputs.image : resonanceDetails?.thumbnail
    );

    try {
      setLoading(true);
      setError("");
      setMessage("");
      const response = await apicall.patch(
        "/resonance-finder/update",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.data) {
        setLoading(false);
        setMessage("Details Added");
        setChange(!change);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    setInputs((prev) => ({ ...prev, direction: "", image: "" }));
  };

  return (
    <>
      <div className="md:flex md:justify-between m-10">
        <ButtonsHeader />
        <BackButton />
      </div>
      <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[95%]  rounded-[20px] m-10 overflow-y-auto">
        <form onSubmit={submitHandler}>
          <div className="flex justify-between mx-10 my-5">
            <h1
              className=" font-semibold text-[#1C5C2E] text-[24px]"
              style={{ marginTop: 20 }}
            >
              Resonance Finder details:
            </h1>
            <div onClick={() => handleClickNext()}>
              {" "}
              <Button
                text="Question For Resonance Finder"
                color="#1C5C2E"
                outLine="underLine"
              />
            </div>
            <div onClick={() => navigate("/resonance-all-questions")}>
              {" "}
              <Button
                text="All Questions"
                color="#1C5C2E"
                outLine="underLine"
              />
            </div>
          </div>
          <div className="md:flex md:justify-between m-10">
            <div className="bg-[#f0f5f1] shadow-lg shadow-[#00000029]-500/50 w-[75%] h-[300px] rounded-[20px] overflow-y-auto">
              <div className="md:flex justify-between m-10">
                <label
                  htmlFor="direction"
                  className="text-[#979B9F] text-[16px] font-medium"
                >
                  Direction
                </label>
                <p className="text-[#979B9F] text-[16px] font-medium">
                  Same for all question
                </p>
              </div>
              <textarea
                id="direction"
                onChange={inputsHandler}
                name="direction"
                className={classes.direction}
                value={inputs?.direction}
              />
            </div>
            <div>
              <div
                className="w-[200px] h-[220px] rounded-lg bg-[#f0f5f1]  mt-5"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  className="w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <input
                    accept="image/*"
                    onChange={inputsHandler}
                    type="file"
                    name="image"
                    className={classes.img}
                  />
                  {inputs.image || resonanceDetails?.thumbnail ? (
                    <img
                      src={
                        inputs.image
                          ? URL.createObjectURL(inputs.image)
                          : `${ImageUrl}${resonanceDetails?.thumbnail}`
                      }
                      className={classes.imgTag}
                      alt="resonance"
                    />
                  ) : (
                    <div
                      className="w-[100px] h-[100px] bg-[#E5ECE7] rounded-[15px]"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <FiImage color="#1C5C2E" size={40} />
                    </div>
                  )}
                </div>
                <p className="text-[#979B9F] text-[14px] text-center mt-5">
                  <span className="underline text-[#1C5C2E] font-medium ">
                    {" "}
                    Upload{" "}
                  </span>{" "}
                  or Drag Category <br /> Icon Here
                </p>
              </div>
            </div>
          </div>
          <div className="m-10 space-x-4 flex">
            <Button
              text="Cancel"
              bgColor="white"
              shadow={`1px 2px 9px #00000029`}
              color="#EF3A71"
              width={150}
              borderRadius={10}
            />
            <Button
              type="submit"
              text={loading ? <Loader /> : "Save"}
              bgColor="#359D9E"
              color="white"
              width={150}
              borderRadius={10}
            />
            {error && (
              <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
            )}
            {message && <p style={{ fontWeight: "bold" }}>{message}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default ResonanceDetail;
