import React, { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import apicall from "../../assets/api/axios";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import SingleVideoCard from "../../components/SingleVideoCard";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";

const BloomsVideos = () => {
  const [loading, setLoading] = useState(false);
  const [bloomData, setBloomData] = useState([]);
  const [error, setError] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const getAllBloomVideos = async () => {
      try {
        setLoading(true);
        const response = await apicall.get("/videos?videoType=bloom", {
          params: { search: filterTerm },
        });
        setBloomData(response?.data?.data);
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
    getAllBloomVideos();
  }, [filterTerm]);

  return (
    <Container
      addButton={true}
      addButtonText={"+ Add Video"}
      addButtonLink={"/addBloomVideo"}
      // isLoading={false}
      // error={false}
    >
      <div className="flex justify-between items-center flex-wrap mb-10">
        <SectionTitle>Freshbloom Videos:</SectionTitle>
        <div className="flex justify-between items-center gap-4">
          <input
            type="text"
            value={filterTerm}
            placeholder="Search here"
            className="rounded bg-[#E5ECE7] md:w-[32rem] w-[90%] h-[50px] font-[14px] focus:outline-none px-5 "
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          {/* <Button
            icon={<BiFilterAlt color="#1C5C2E" size={20} />}
            bgColor="#E5ECE7"
            borderRadius="10px"
          /> */}
        </div>
      </div>
      <div className=" flex flex-wrap gap-3 ">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : bloomData.length === 0 ? (
          <h1>No Video Found</h1>
        ) : (
          bloomData.map((data) => (
            <SingleVideoCard key={data._id} data={data} />
          ))
        )}
      </div>
    </Container>
  );
};

export default BloomsVideos;
