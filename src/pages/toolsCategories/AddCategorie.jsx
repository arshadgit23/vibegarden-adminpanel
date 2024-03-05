import React, { useState, useEffect } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import BackButton from "../../components/BackButton";
import ButtonsHeader from "../../components/ButtonsHeader";
import apicall from "../../assets/api/axios";
import Container from "../../components/Container";

const AddCategorie = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState({
    title: "",
    icon: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [setToken]);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const categoryFormData = new FormData();
    categoryFormData.append("title", category.title);
    categoryFormData.append("icon", category.icon);
    categoryFormData.append("description", category.description);
    categoryFormData.append("categoryType", "tools");

    try {
      const response = await apicall.post("/categories", categoryFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      if (response.status === 201) {
        setMessage("Category Added");
        setTimeout(() => navigate("/ToolsCategories"), 800);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container backButton={true}>
      <h1
        className=" font-medium text-[#1C5C2E] text-[24px] px-5 py-3"
        style={{ marginTop: 20 }}
      >
        Enter Category Details
      </h1>
      <form onSubmit={(e) => handleAddCategory(e)}>
        <div className="flex flex-row">
          <label
            htmlFor="icon"
            className="relative flex justify-center items-center w-1/3"
          >
            <input
              type="file"
              style={{
                background: "black",
                position: "absolute",
                left: 100,
                width: "13vw",
                height: "25vh",
                opacity: 0,
              }}
              onChange={(e) =>
                setCategory({ ...category, icon: e.target.files[0] })
              }
              id="icon"
            />
            <div className=" rounded-lg p-5 bg-[#f0f5f1] flex flex-col items-center justify-center">
              {category.icon ? (
                <img src={URL.createObjectURL(category.icon)} width={120} />
              ) : (
                <div className=" flex flex-col justify-center items-center">
                  <div
                    className="w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
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
                  </div>
                  <p className="text-[#979B9F] text-[14px] text-center mt-5">
                    <span className="underline text-[#1C5C2E] font-medium ">
                      Upload
                    </span>
                    or Drag Category <br /> Icon Here
                  </p>
                </div>
              )}
              {/* {thumbnail ? (
                  <img src={URL.createObjectURL(thumbnail)} width={120} />
                ) : (
                  <div className=" flex flex-col justify-center items-center">
                    <div
                      className="w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
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
                    </div>
                    <p className="text-[#979B9F] text-[14px] text-center mt-5">
                      <span className="underline text-[#1C5C2E] font-medium ">
                        Upload
                      </span>
                      or Drag Category <br /> Icon Here
                    </p>
                  </div>
                )} */}
            </div>
          </label>

          <div className=" w-2/3 flex flex-col gap-3 p-3">
            <input
              type="text"
              placeholder="Title"
              className="px-4 py-3 rounded focus:outline-none bg-[#f0f5f1] shadow-lg shadow-[#00000029]-500/50"
              style={{
                height: 50,
                border: " none ",
                borderRadius: 5,
              }}
              onChange={(e) =>
                setCategory({ ...category, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="px-4 py-3 focus:outline-none  resize-y rounded-md bg-[#f0f5f1] shadow-lg shadow-[#00000029]-500/50"
              style={{
                height: 150,
                border: " none",
                borderRadius: 5,
              }}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end px-5 py-3">
          <Button
            text="Cancel"
            bgColor="#fff"
            color="#EF3A71"
            borderRadius={10}
            width={150}
            handleClick={() => navigate(-1)}
          />
          <Button
            text="Add"
            bgColor="#359D9E"
            color="#fff"
            borderRadius={10}
            width={150}
            type="submit"
          />
        </div>
      </form>
      {message && (
        <p className=" my-3 text-center text-xl text-green font-semibold">
          {message}
        </p>
      )}
    </Container>
  );
};

export default AddCategorie;
