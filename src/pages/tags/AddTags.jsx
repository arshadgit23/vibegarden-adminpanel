import React from "react";
import { Button } from "../../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apicall from "../../assets/api/axios";
import Container from "../../components/Container";
import { useMutation } from "@tanstack/react-query";
import Loader from "../../components/Loader";

const AddTags = () => {
  const navigate = useNavigate();
  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const [tagType, setTagType] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const tagData = {
      name: tagName,
      description: tagDescription,
    };

    try {
      setLoading(true);
      const response = await apicall.post("/tags", tagData);
      setMessage("tag successfully added");
      setLoading(false);
      setTimeout(() => {
        navigate(-1);
      }, 800);
    } catch (error) {
      setError(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
      setLoading(false);
    }
  };

  return (
    <Container backButton={true}>
      <div className="py-6 ">
        <h1 className=" text-center py-4 text-3xl uppercase">Add Tags</h1>
        <div className=" mx-auto w-96 py-10 px-8 rounded-xl ">
          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col gap-4">
              <input
                type="text"
                placeholder="Tag Name"
                className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                onChange={(e) => setTagName(e.target.value)}
                value={tagName}
              />

              {/* <input
                type="text"
                placeholder="Description"
                className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                onChange={(e) => setTagDescription(e.target.value)}
                value={tagDescription}
              /> */}

              <textarea
                type="text"
                placeholder="Description"
                className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
                onChange={(e) => setTagDescription(e.target.value)}
                value={tagDescription}
              ></textarea>

              {/* <select
                onChange={(e) => setTagType(e.target.value)}
                value={tagType}
                className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
              >
                <option value="">Please Select</option>
                <option value="bloom">Bloom</option>
                <option value="tool">Tools</option>
                <option value="groundwork">Ground Work</option>
              </select> */}
            </div>

            <div className=" flex justify-between mt-10">
              <Button
                text={loading ? <Loader /> : "Save"}
                bgColor="#359D9E"
                color="#fff"
                borderRadius="10px"
                height="50px"
                width="150px"
                type="submit"
              />
              <Button
                text="Cancel"
                bgColor="white"
                shadow={`1px 2px 9px #00000029`}
                color="#EF3A71"
                width={150}
                borderRadius={10}
                handleClick={() => navigate(-1)}
              />
            </div>
            {message && (
              <p className=" text-green font-semibold text-lg mt-3 text-center capitalize">
                {message}
              </p>
            )}
            {error && (
              <p className=" text-red-500 font-semibold text-lg mt-3 text-center">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </Container>
  );
};

export default AddTags;
