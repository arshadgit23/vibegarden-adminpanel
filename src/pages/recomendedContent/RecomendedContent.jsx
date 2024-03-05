import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import ButtonsHeader from "../../components/ButtonsHeader";
import img from "../../assets/images/Rectangle 302.png";
import { Select, Option } from "@material-tailwind/react";
import Modal from "react-overlays/Modal";
import "./modalStyle.css";
import BackButton from "../../components/BackButton";
import { useEffect, useState } from "react";
import apicall from "../../assets/api/axios";
import { ImageUrl } from "../../assets/api/axios";
import Loader from "../../components/Loader";
import cancelIcon from "../../assets/cancel.png";
import ErrorMessage from "../../components/ErrorMessage";

const RecomendedContent = () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [videoType, setVideoType] = useState("tool");
  const [error, setError] = useState("");
  const [videosId, setVideosId] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [insertVideosRes, setInsertVideosRes] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        const response = await apicall.get(`/videos?videoType=${videoType}`);
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
  }, [videoType]);

  useEffect(() => {
    const getRecommendedVideos = async () => {
      try {
        setLoading(true);
        const response = await apicall.get(`/videos/recommended`, {
          params: { search: filterTerm },
        });
        setRecommendedVideos(response.data.data);
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
    getRecommendedVideos();
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
      const response = await apicall.patch("/videos/recommended/video", {
        recommendVideoIds: videosId,
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

  const [isOpen, setIsOpen] = useState(false);

  var handleClose = () => setShowModal(false);

  var handleSave = () => {
    console.log("success");
  };
  const renderBackdrop = (props) => <div className="backdrop2" {...props} />;

  const handleVideoDetail = (id) => {
    navigate(`/reomendedVideoDetail/${id}`);
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
            text="+ Add Videos For Recommended Content"
            bgColor="#359D9E"
            color="#fff"
            borderRadius="10px"
            height="50px"
            width="300px"
          />
        </div>
      </div>
      <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[95%] h-[600px] rounded-[20px] m-10 overflow-y-auto">
        <div className="md:flex justify-between mx-10 my-5 items-center flex-wrap">
          <h1
            className=" font-semibold text-[#1C5C2E] text-[24px]"
            style={{ marginTop: 20 }}
          >
            Recommended Content:
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
        ) : recommendedVideos.length === 0 ? (
          <h1 className="ml-10">No Recommended Content Found</h1>
        ) : (
          <div class="md:grid grid-cols-4 gap-2 ">
            {recommendedVideos?.map((val, ind) => (
              <div
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
              <p className="text-2xl  font-semibold leading-tight mt-[5px]">
                Add Videos For Recommended Content:
              </p>
            </div>
            <div className="m-5">
              <select
                id="small"
                onChange={(e) => {
                  setVideoType(e.target.value);
                }}
                class="block p-2 mb-6 w-full text-md  text-[white] bg-[#1C5C2E] rounded-lg outline-none"
              >
                <option
                  className="bg-[white] text-[black] py-4 rounded-lg"
                  value="tool"
                  selected
                >
                  Tools
                </option>
                <option
                  className="bg-[white] text-[black] rounded-lg"
                  value="groundwork"
                >
                  Groundwork
                </option>
                <option
                  className="bg-[white] text-[black] rounded-lg"
                  value="bloom"
                >
                  Bloom
                </option>
              </select>
            </div>
          </div>
          <div class="md:grid grid-cols-4 gap-2 overflow-y-auto">
            {videos?.map((val, ind) => (
              <div
                id={val?._id}
                onClick={() => selectVideoHandler(val?._id)}
                key={ind}
                className={`p-3 cursor-pointer bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[200px] h-[300px] rounded-[20px] m-5 ${
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
                    className="w-full h-40 object-contain"
                    src={`${ImageUrl}${val?.thumbnail}`}
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
                    : val?.description.substring(0, 100) + " ..."}
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
      {error && <p className="text-red-900 text-14">{error}</p>}
    </>
  );
};

export default RecomendedContent;
