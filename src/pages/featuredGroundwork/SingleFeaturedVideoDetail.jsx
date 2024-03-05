import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import BackButton from "../../components/BackButton";
import ButtonsHeader from "../../components/ButtonsHeader";
import img from "../../assets/images/Rectangle 302.png";
import teacherImg from "../../assets/images/profileImg.png";
import { BsPlusCircleFill } from "react-icons/bs";
import Modal from "react-overlays/Modal";
import "./modalStyle.css";
import { useParams } from "react-router-dom";
import apicall from "../../assets/api/axios";
import { ImageUrl } from "../../assets/api/axios";
import cancelIcon from "../../assets/cancel.png";

const SingleFeaturedVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [isRecommendedAdded, setIsRecomnmendedAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendedVideoData] = recommendedVideos?.filter(
    (recommendedVideo) => recommendedVideo?._id === id
  );
  const [videoType, setVideoType] = useState("tool");
  const [videos, setVideos] = useState([]);
  const [videosId, setVideosId] = useState([]);
  const [insertVideosRes, setInsertVideosRes] = useState([]);

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
        const response = await apicall.get(
          `/videos/featured?videoType=groundwork`
        );
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
  }, [insertVideosRes, isRecommendedAdded]);

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
      const response = await apicall.patch(`/videos/${id}`, {
        recommendedContent: videosId,
      });

      setInsertVideosRes(response?.data?.data);
      setIsRecomnmendedAdded(!isRecommendedAdded);
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

  const deleteRecommendedContentVideo = async () => {
    try {
      setLoading(true);
      const response = await apicall.patch(`/videos/${id}`, {
        isFeatured: false,
      });

      if (response?.data?.data) {
        setShowModal(false);
        navigate("/FeaturedGroundwork");
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

  const handleClick = () => {
    navigate("/feedBack");
  };
  const handleEditVideo = () => {
    navigate("/editVideoDetail");
  };
  const relatedContent = [
    {
      img: img,
      title: "Title",
      categ: "Category",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
      btn: "lorem",
    },
    {
      img: img,
      title: "Title",
      categ: "Category",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
      btn: "lorem",
    },
    {
      img: img,
      title: "Title",
      categ: "Category",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
      btn: "lorem",
    },
    {
      img: img,
      title: "Title",
      categ: "Category",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
      btn: "lorem",
    },
  ];
  const recomendedContent = [
    {
      img: img,
      title: "Title",
      categ: "Category",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
      btn: "lorem",
    },
    {
      img: img,
      title: "Title",
      categ: "Category",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
      btn: "lorem",
    },
    {
      img: img,
      title: "Title",
      categ: "Category",
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
      btn: "lorem",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  var handleClose = () => setShowModal(false);

  const renderBackdrop = (props) => <div className="backdrop2" {...props} />;

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: " 50%",
    transform: "translate(-50%, -50%)",
    minWidth: "65vw",
  };

  const modalHelper = (
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
                  : val?.description.substring(0, 70) + " ..."}
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
  );

  return (
    <>
      {modalHelper}
      <div className="flex justify-between m-10">
        <ButtonsHeader />
        <div onClick={handleClick}>
          <BackButton />
        </div>
      </div>
      <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[95%] h-[600px] rounded-[20px] m-10 overflow-y-auto">
        <div className="flex justify-between mx-10 my-5">
          <h1 className=" font-semibold text-[#1C5C2E] text-[24px] py-4">
            Video Details:
          </h1>
          <div className="space-x-4 flex">
            <div onClick={() => deleteRecommendedContentVideo()}>
              {" "}
              <Button
                text="Delete"
                bgColor="#EF3A71"
                borderRadius="10px"
                color="#fff"
                width={150}
              />
            </div>
            {/* <div onClick={handleEditVideo}> <Button text="Edit" bgColor="#55C595" borderRadius="10px" color="#fff" width={150} /></div> */}
          </div>
        </div>
        <div className="flex m-10">
          <div>
            <img
              src={`${ImageUrl}${recommendedVideoData?.thumbnail}`}
              alt="video thumbnail"
              width={300}
              height={320}
            />
          </div>
          <div className="md:w-[60%] ml-5">
            <h3 className="text-[#1C5C2E] text-[24px] font-semibold pb-2">
              {recommendedVideoData?.title}
            </h3>
            {/* <p className='text-[#979B9F] text-[18px] font-medium pb-2'>Category</p> */}
            <p className="text-[#1C5C2E] text-[20px] font-semibold pb-2">
              Description
            </p>
            <p className="text-[14px] text-gray-700">
              {recommendedVideoData?.description}
            </p>
            <div className="flex mt-2">
              {recommendedVideoData?.tags?.map((tag, i) => (
                <p
                  key={i}
                  className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]"
                >
                  {tag?.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h1 className=" font-semibold text-[#1C5C2E] text-[24px] m-10">
            Related Content:
          </h1>
          <div class="grid grid-cols-4 gap-2 -mt-5">
            {/* {relatedContent.map((val, ind) => (
                            <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[230px] h-[300px] rounded-[20px] m-5 ">
                                <div className='flex justify-center items-center'>
                                    <img src={val.img} width="94%" />
                                </div>
                                <div className='flex justify-between mt-[5px] m-[5px]'>
                                    <p className='text-[14px]'>{val.title}</p>
                                    <p className='text-[14px] text-[#75997E]'>{val.categ}</p>
                                </div>
                                <p className='text-[11px] m-[5px]'>{val.desc}</p>
                                <div className='flex'>
                                    <p className='bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]'>{val.btn}</p>
                                    <p className='bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]'>{val.btn}</p>
                                    <p className='bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]'>{val.btn}</p>
                                    <p className='bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]'>{val.btn}</p>
                                </div>
                            </div>
                        ))} */}

            {recommendedVideoData?.relatedContent?.map((val, ind) => (
              <div
                id={val?._id}
                key={ind}
                className={`p-3 cursor-pointer bg-[white] shadow-lg shadow-[#00000029]-500/50 w-auto h-[300px] rounded-[20px] m-5 `}
              >
                <div>
                  <img
                    id={val?._id}
                    className="w-[100%] h-[20vh]"
                    src={`${ImageUrl}${val?.thumbnail}`}
                  />
                </div>
                <div className="flex justify-between mt-[5px] m-[5px]">
                  <p className="text-[14px]">{val?.title}</p>
                  <p className="text-[14px] text-[#75997E] capitalize">
                    {val?.videoType}
                  </p>
                </div>
                <p className="text-[11px] m-[5px]">{val?.description}</p>
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
        </div>
        <div>
          <h1 className=" font-semibold text-[#1C5C2E] text-[24px] m-10">
            Recomended Content:
          </h1>
          <div class="grid grid-cols-4 gap-2 -mt-5">
            {recommendedVideoData?.recommendedContent?.map((val, ind) => {
              return (
                <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[230px] h-[300px] rounded-[20px] m-5 ">
                  <div className="flex justify-center items-center">
                    <img src={`${ImageUrl}${val?.thumbnail}`} width="94%" />
                  </div>
                  <div className="flex justify-between mt-[5px] m-[5px]">
                    <p className="text-[14px]">{val?.title}</p>
                    <p className="text-[14px] text-[#75997E]">
                      {val?.videoType}
                    </p>
                  </div>
                  <p className="text-[11px] m-[5px]">{val?.description}</p>
                  <div className="flex">
                    {val?.tags?.map((tag, i) => (
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
            })}
            <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[230px] h-[300px]  flex flex-col justify-center items-center rounded-[20px] m-5 ">
              <div onClick={() => setShowModal(true)} className="">
                {" "}
                <BsPlusCircleFill color="#979B9F" size={40} />
              </div>
              <p>Add Recommended Content</p>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal
                className="modal"
                show={showModal}
                onHide={handleClose}
                renderBackdrop={renderBackdrop}
            >
                <div>
                    <div className="md:flex flex-row justify-between">
                        <div className="flex m-2">
                            <BackButton />
                            <p className='text-2xl  font-semibold leading-tight mt-[5px]'>Add Recommended Content Videos:</p>
                        </div>
                        <div className='m-5'>
                            <select id="small" class="block p-2 mb-6 w-full text-md  text-[white] bg-[#1C5C2E] rounded-lg outline-none">
                                <option className='bg-[white] text-[black] py-4 rounded-lg' selected>Tools</option>
                                <option className='bg-[white] text-[black] rounded-lg' >Groundwork</option>
                                <option className='bg-[white] text-[black] rounded-lg' >Fresh Bloom</option>
                            </select>
                        </div>

                    </div>
                    <div class="md:grid grid-cols-4 gap-2 overflow-y-auto">
                        {relatedContent.map((val, ind) => (
                            <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[200px] h-[300px] rounded-[20px] m-5 ">
                                <div>
                                    <img src={val.img} width="100%" />
                                </div>
                                <div className='flex justify-between mt-[5px] m-[5px]'>
                                    <p className='text-[14px]'>{val.title}</p>
                                    <p className='text-[14px] text-[#75997E]'>{val.categ}</p>
                                </div>
                                <p className='text-[11px] m-[5px]'>{val.desc}</p>
                                <div className='flex'>
                                    <p className='bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]'>{val.btn}</p>
                                    <p className='bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]'>{val.btn}</p>
                                    <p className='bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]'>{val.btn}</p>
                                    <p className='bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]'>{val.btn}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="md:flex justify-end px-4 mt-5" onClick={handleClose}>
                        <Button text="Insert Videos" bgColor="#359D9E" color="#fff" borderRadius={10} width={150} height={50}/>
                    </div>
                </div>
            </Modal> */}
    </>
  );
};

export default SingleFeaturedVideo;
