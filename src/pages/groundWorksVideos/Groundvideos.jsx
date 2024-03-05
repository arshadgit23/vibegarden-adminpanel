import React from "react";
import { BiFilterAlt } from "react-icons/bi";
import { Button } from "../../components";
import ButtonsHeader from "../../components/ButtonsHeader";
import img from "../../assets/images/Rectangle 302.png";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { useState, useEffect } from "react";
import apicall from "../../assets/api/axios";

const Groundvideos = () => {
  const [loading, setLoading] = useState(false);
  const [toolsVideos, setToolsVideos] = useState([]);
  const [error, setError] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const getToolsVideos = async () => {
      try {
        setLoading(true);
        const response = await apicall.get("/videos?videoType=groundwork", {
          params: { search: filterTerm },
        });
        setToolsVideos(response?.data?.data);
        setLoading(false);
      } catch (error) {
        // setError(
        //   error?.response?.data?.message
        //     ? error?.response?.data?.message
        //     : error?.message
        // );
        setLoading(false);
      }
    };
    getToolsVideos();
  }, [filterTerm]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/addVideo");
  };

  return (
    <Container
      addButton={true}
      addButtonText={"+ Add More"}
      addButtonLink={"/addGroundVideo"}
    >
      <div className="flex justify-between items-center my-2">
        <h1 className=" font-bold text-[#1C5C2E] text-3xl">
          Groundwork Videos:
        </h1>
        <div className="flex justify-between items-center gap-4 flex-wrap">
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
      <div className=" flex justify-start flex-wrap gap-3">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : toolsVideos.length == 0 ? (
          <h1>No Video Found</h1>
        ) : (
          toolsVideos?.map((val, ind) => {
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/GroundworkVideos/${val?._id}`);
                }}
                key={ind}
                className="mt-8 cursor-pointer bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[230px] h-[300px] rounded-[20px]"
              >
                <div>
                  <img
                    src={`https://vibe-garden-development.s3.ap-south-1.amazonaws.com/${val?.thumbnail}`}
                    className="w-full h-40 object-contain"
                  />
                </div>
                <div className="flex justify-between mt-[5px] m-[5px]">
                  <p className="text-[14px]">{val?.title}</p>
                  <p className="text-[14px] text-[#75997E] capitalize">
                    {val?.videoType}
                  </p>
                </div>
                <p className="text-[11px] m-[5px]">
                  {val?.description.length < 20
                    ? val?.description
                    : val?.description.substring(0, 120) + " ..."}
                </p>
                <div className="flex">
                  {val?.tags.map((tag, i) => (
                    <p
                      key={i}
                      className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]"
                    >
                      {tag?.name}
                    </p>
                  ))}
                </div>
              </div>
            );
            // <SingleVideoCard key={ind} data={val} />
          })
        )}
      </div>
    </Container>
  );
};

export default Groundvideos;
