import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import BackButton from "../../components/BackButton";
import ButtonsHeader from "../../components/ButtonsHeader";
import img from "../../assets/images/Rectangle 302.png";
import teacherImg from "../../assets/images/profileImg.png";
import { ImageUrl } from "../../assets/api/axios";
import Video from "../../components/Video";

const VideoDetail = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/feedBack");
  };
  const handleEditVideo = () => {
    navigate("/editVideoDetail");
  };
  const cardData = [
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

  return (
    <>
      {/* <div className="flex justify-between m-10">
        <ButtonsHeader />
        <div onClick={handleClick}>
          <BackButton />
        </div>
      </div> */}
      <div>
        {/* <div className="flex justify-between mx-10 my-5">
          <h1 className=" font-semibold text-[#1C5C2E] text-[24px] py-4">
            Video Details:
          </h1>
          <div className="space-x-4 flex">
            <div>
              {" "}
              <Button
                text="Delete"
                bgColor="#EF3A71"
                borderRadius="10px"
                color="#fff"
                width={150}
              />
            </div>
            <div onClick={handleEditVideo}>
              {" "}
              <Button
                text="Edit"
                bgColor="#55C595"
                borderRadius="10px"
                color="#fff"
                width={150}
              />
            </div>
          </div>
        </div>
        <div className="flex m-10">
          <div>
            <img src={img} alt="video thumbnail" width={300} height={320} />
          </div>
          <div className="md:w-[60%] ml-5">
            <h3 className="text-[#1C5C2E] text-[24px] font-semibold pb-2">
              Title
            </h3>
            <p className="text-[#979B9F] text-[18px] font-medium pb-2">
              Category
            </p>
            <p className="text-[#1C5C2E] text-[20px] font-semibold pb-2">
              Description
            </p>
            <p className="text-[14px] text-gray-700">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempo.
            </p>
            <div className="flex mt-2">
              <p className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]">
                lorem
              </p>
              <p className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]">
                lorem
              </p>
              <p className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]">
                lorem
              </p>
              <p className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]">
                lorem
              </p>
            </div>
          </div>
        </div> */}

        {data?.relatedContent.length !== 0 && (
          <div>
            <h1 className=" font-semibold text-[#1C5C2E] text-[24px] m-10">
              Related Content:
            </h1>
            <div class="grid grid-cols-4 gap-2 -mt-5">
              {data?.relatedContent?.map((val, ind) => (
                <div
                  key={ind}
                  className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[230px] h-[300px] rounded-[20px] m-5 "
                >
                  <div className="flex justify-center items-center">
                    {/* <img src={`${ImageUrl}${val.thumbnail}`} width="94%" /> */}
                    <Video data={val} className="relative w-full h-[20vh]" />
                  </div>
                  <div className="flex justify-between mt-[5px] m-[5px]">
                    <p className="text-[14px]">{val.title}</p>
                    <p className="text-[14px] text-[#75997E]">
                      {data?.category?.title}
                    </p>
                  </div>
                  <p className="text-[11px] m-[5px]">
                    {val?.description.length < 20
                      ? val?.description
                      : val?.description.substring(0, 120) + " ..."}
                  </p>
                  <div className="flex">
                    {data?.tags?.map((tag, ind) => {
                      return (
                        <p
                          key={ind}
                          className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]"
                        >
                          {tag.name}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data?.additionalResources?.title &&
          data?.additionalResources?.description &&
          data?.additionalResources?.link && (
            <div class="grid grid-cols-2 gap-2 mt-5 m-10">
              <div className="md:w-[90%] flex flex-col">
                <h1 className=" font-semibold text-[#1C5C2E] text-[24px] ">
                  Additional Resources:
                </h1>
                <p className="font-bold mt-[10px]">
                  {" "}
                  {data?.additionalResources?.title}
                </p>
                <div className="flex">
                  <p className="text-[12px] text-[#979B9F] w-[85%] mt-[10px]">
                    {data?.additionalResources?.description}
                  </p>
                  <a
                    target="_blank"
                    href={
                      data?.additionalResources?.link?.includes("http")
                        ? data?.additionalResources?.link
                        : "https://" + data?.additionalResources?.link
                    }
                    className="flex justify-end mt-5 underline text-[#1C5C2E]"
                  >
                    Link
                  </a>
                </div>

                {/* <h1 className=" font-semibold text-[#1C5C2E] text-[24px] mt-10">
              Related Teacher:
            </h1>
            <div className="flex mt-5">
              <img
                src={teacherImg}
                alt="teacher img"
                className="rounded h-[80px]"
              />
              <div>
                <p className="text-[14px] w-[85%] mt-[10px] ml-2">
                  Teacher Name
                </p>
                <p className="text-[12px] text-[#979B9F] w-[85%] mt-[10px] ml-2">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam
                </p>
              </div>
            </div> */}

                <h1 className=" font-semibold text-[#1C5C2E] text-[24px] mt-5">
                  Reviews:
                </h1>
                {!data?.comments?.length ? (
                  <h1 className="my-2">No Reviews Found</h1>
                ) : (
                  data?.comments?.map((val, ind) => (
                    <div key={ind} className="flex w-[450px] items-center mt-5">
                      <div className="w-[140px]">
                        <img
                          src={`${ImageUrl}${val?.user?.avatar?.image}`}
                          width="80px"
                          className="h-[55px]"
                        />
                      </div>
                      <div className="w-[340px]">
                        <p className="font-bold text-[16px] text-[030303]">
                          {val?.user?.firstName}
                        </p>
                        <p className="text-[12px]"> {val?.comment}</p>
                      </div>
                      <div className="w-[120px]">
                        <p className="text-[#1C5C2E] text-[16px]">
                          {`${val?.rating.toFixed(1)} (Rating)`}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {data?.teachers.length !== 0 && (
                <div>
                  <div className="md:w-[90%] border border-[#030303] rounded-[10px] h-[500px] ml-5">
                    <p className="text-[#1C5C2E] font-medium text-[20px] px-4 py-3 mt-2">
                      Selected Teachers
                    </p>
                    {data?.teachers?.map((teacher, ind) => {
                      return (
                        <div className="flex flex-row">
                          <div className="flex w-[280px] h-[100px] bg-[white] shadow-lg shadow-[#00000029]-500/50 rounded-lg ml-5 px-4 py-5">
                            <img
                              src={`${ImageUrl}${teacher?.teacherId?.photo}`}
                              alt="img"
                              className="rounded-full mt-[10px]"
                              width="50"
                              height="50"
                            />
                            <span className="ml-5 mt-5 font-bold">
                              {teacher?.teacherId?.teacherName}
                            </span>
                          </div>
                          {/* <input
                            type="checkbox"
                            className="ml-5 bg-[#1C5C2E]"
                            checked
                          /> */}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </>
  );
};

export default VideoDetail;
