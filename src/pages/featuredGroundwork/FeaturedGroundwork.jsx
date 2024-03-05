import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import ButtonsHeader from "../../components/ButtonsHeader";
import img from "../../assets/images/Rectangle 302.png";
import { Select, Option } from "@material-tailwind/react";
import Modal from "react-overlays/Modal";
import "./modalStyle.css";
import BackButton from "../../components/BackButton";
import apicall from "../../assets/api/axios";
import { ImageUrl } from "../../assets/api/axios";
import Loader from "../../components/Loader";
import cancelIcon from "../../assets/cancel.png";
import ErrorMessage from "../../components/ErrorMessage";

const FeaturedGroundwork = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [videosId, setVideosId] = useState([]);
  const [groundworkVideos, setGroundworkVideos] = useState([]);
  const [insertVideosRes, setInsertVideosRes] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  var handleClose = () => setShowModal(false);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        const response = await apicall.get(`/videos?videoType=groundwork`);
        setVideos(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error.message
        );
        setLoading(false);
      }
    };

    getVideos();
  }, []);

  useEffect(() => {
    const getGroundworkVideos = async () => {
      try {
        setLoading(true);
        const response = await apicall.get(
          `/videos/featured?videoType=groundwork`,
          { params: { search: filterTerm } }
        );
        setGroundworkVideos(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error.message
        );
        setLoading(false);
      }
    };
    getGroundworkVideos();
  }, [insertVideosRes, filterTerm]);

  const selectVideoHandler = (id) => {
    setVideosId((prev) => {
      if (prev.includes(id)) {
        return prev.filter((videoId) => videoId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const insertVideoHandler = async (e) => {
    try {
      setLoading(true);
      const response = await apicall.patch("/videos/featured/groundwork", {
        featuredGroundworkIds: videosId,
      });

      setInsertVideosRes(response?.data?.data);
      if (response?.data?.data) {
        setShowModal(false);
      }
    } catch (error) {
      setLoading(false);
      setError(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message
      );
    }
  };

  const renderBackdrop = (props) => <div className="backdrop2" {...props} />;
  const navigate = useNavigate();
  const handleVideoDetail = (id) => {
    navigate(`/featuredGroundworkVideoDetail/${id}`);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: " 50%",
    transform: "translate(-50%, -50%)",
    minWidth: "65vw",
  };

  return (
    <>
      <div className="mt-10 flex justify-between mx-10">
        <ButtonsHeader />
        <div onClick={() => setShowModal(true)}>
          <Button
            text="+ Add Featured Groundwork"
            bgColor="#359D9E"
            color="#fff"
            borderRadius="10px"
            height="50px"
            width="250px"
          />
        </div>
      </div>
      <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[95%] h-[600px] rounded-[20px] m-10 overflow-y-auto">
        <div className="md:flex justify-between mx-10 my-5 items-center flex-wrap">
          <h1
            className=" font-semibold text-[#1C5C2E] text-[24px]"
            style={{ marginTop: 20 }}
          >
            Featured Groundwork Videos:
          </h1>
          <input
            type="text"
            value={filterTerm}
            placeholder="Search here"
            className="rounded bg-[#E5ECE7] md:w-[32rem] w-[90%] h-[50px] font-[14px] focus:outline-none px-5 "
            onChange={(e) => setFilterTerm(e.target.value)}
          />
        </div>
        {loading ? (
          <div className="mt-1 ml-3">
            <Loader />
          </div>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : groundworkVideos.length === 0 ? (
          <h1 className="ml-10">No Featured Groundwork Found</h1>
        ) : (
          <div class="md:grid grid-cols-4 gap-2 ">
            {groundworkVideos?.map((val, ind) => (
              <div
                key={ind}
                onClick={() => handleVideoDetail(val?._id)}
                className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[230px] h-[300px] rounded-[20px] m-5 "
              >
                <div>
                  <img
                    src={`${ImageUrl}${val?.thumbnail}`}
                    className="w-full h-40 object-contain"
                  />
                </div>
                <div className="flex justify-between mt-[5px] m-[5px]">
                  <p className="text-[14px]">{val?.title}</p>
                  <p className="text-[14px] text-[#75997E]">{val?.videoType}</p>
                </div>
                <p className="text-[11px] m-[5px]">
                  {val?.description.length < 20
                    ? val?.description
                    : val?.description.substring(0, 120) + " ..."}
                </p>
                <div className="flex">
                  {val?.tags?.map((tag) => (
                    <p
                      key={tag?._id}
                      className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]"
                    >
                      {tag?.name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        style={modalStyle}
        className="modal overflow-auto p-3 "
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        <div>
          <div className="md:flex flex-row justify-between">
            <div className="flex m-2">
              {/* <BackButton /> */}
              <p className="text-2xl  font-semibold  mt-[5px]">
                Choose From All Groundwork Videos
              </p>
              <p className="text-[#979B9F] mt-[10px] ml-2">
                (You can select 6 videos)
              </p>
            </div>
          </div>
          <div class="md:grid grid-cols-4 gap-2 overflow-y-auto">
            {videos?.map((val, ind) => (
              <div
                id={val?._id}
                key={ind}
                onClick={() => selectVideoHandler(val?._id)}
                className={`bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[200px] h-[300px] rounded-[20px] cursor-pointer m-5 ${
                  videosId.includes(val?._id) && "relative"
                }`}
              >
                {videosId.includes(val?._id) && (
                  <img
                    className="absolute top-[-8px] right-[-13px] bg-#359D9E h-[35px] w-[35px]"
                    src={cancelIcon}
                  />
                )}
                <div>
                  <img
                    src={`${ImageUrl}${val?.thumbnail}`}
                    className="w-[100%] h-[20vh]"
                  />
                </div>
                <div className="flex justify-between mt-[5px] m-[5px]">
                  <p className="text-[14px]">{val?.title}</p>
                  <p className="text-[14px] text-[#75997E]">{val?.videoType}</p>
                </div>
                <p className="text-[11px] m-[5px]">
                  {val?.description.length < 20
                    ? val?.description
                    : val?.description.substring(0, 120) + " ..."}
                </p>
                <div className="flex">
                  {val?.tags?.map((tag) => (
                    <p
                      key={tag?._id}
                      className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]"
                    >
                      {tag?.name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className="md:flex justify-end px-4 mt-5"
            onClick={insertVideoHandler}
          >
            <Button
              text="Insert Videos"
              bgColor="#359D9E"
              color="#fff"
              borderRadius={10}
              width={150}
              height={50}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FeaturedGroundwork;
