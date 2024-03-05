import React from "react";
import { Button } from "../../components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apicall from "../../assets/api/axios";
import { useEffect } from "react";
import Container from "../../components/Container";
import Loader from "../../components/Loader";

const UpdateTag = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const [tagType, setTagType] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagData = {
      name: tagName,
      description: tagDescription,
    };

    try {
      setLoading(true);
      const response = await apicall.patch(`/tags/${params.id}`, tagData);
      setLoading(false);
      setMessage("tag successfully updated");
      setTimeout(() => {
        navigate(-1);
      }, 800);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getTag = async () => {
      const response = await apicall.get(`/tags/${params.id}`);
      setTagName(response.data.data.name);
      setTagDescription(response?.data?.data?.description);
    };
    getTag();
  }, []);

  return (
    <Container backButton={true}>
      <div className="py-6 ">
        <h1 className=" text-center py-4 text-3xl uppercase">Update Tags</h1>
        <div className=" mx-auto w-96 py-10 px-8 rounded-xl shadow-lg border border-[#1C5C2E]">
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
              />   */}

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
                <option value="bloom">Bloom</option>
                <option value="tool">Tools</option>
                <option value="groundwork">Ground Work</option>
              </select> */}
            </div>

            <div className=" flex justify-between mt-10">
              <Button
                text={loading ? <Loader /> : "Update"}
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

export default UpdateTag;
