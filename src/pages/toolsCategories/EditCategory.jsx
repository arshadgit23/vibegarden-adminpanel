import React from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components";
import BackButton from "../../components/BackButton";
import ButtonsHeader from "../../components/ButtonsHeader";
import apicall from "../../assets/api/axios";
import { useState } from "react";
import { useEffect } from "react";

const EditCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    title: "",
    icon: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await apicall.get(`categories/${id}`);
        if (response.status === 200) {
          setCategory(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("title", category.title);
    updatedData.append("description", category.description);
    updatedData.append("icon", category.icon);

    try {
      const response = await apicall.patch(`categories/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setMessage("Category Updated");
        setTimeout(() => navigate(`/ToolsCategories`), 800);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mt-10 flex justify-between mx-10">
        <ButtonsHeader />
        <div className="flex ml-5">
          <BackButton />
        </div>
      </div>
      <div className="bg-[white] shadow-lg w-[85%] h-[600px] rounded-[20px] m-10 overflow-y-auto ">
        <h1
          className=" font-medium text-[#1C5C2E] text-[24px] px-5 py-3"
          style={{ marginTop: 20 }}
        >
          Update Category Details
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
                  width: "12vw",
                  height: "15vh",
                  opacity: 0,
                }}
                onChange={(e) => {
                  setCategory({ ...category, icon: e.target.files[0] });
                  setImage(e.target.files[0]);
                }}
                id="icon"
              />
              <div className=" rounded-lg p-5 bg-[#f0f5f1] flex flex-col items-center justify-center">
                {image ? (
                  <img src={image && URL.createObjectURL(image)} width={120} />
                ) : (
                  <img
                    src={`https://vibe-garden-development.s3.ap-south-1.amazonaws.com/${category.icon}`}
                    width={120}
                  />
                )}
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
                value={category.title}
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
                value={category.description}
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
              text="Update"
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
      </div>
    </>
  );
};

export default EditCategory;
