import React from "react";
import { Button } from "../../components";
import btn_icon from "../../assets/icons/btn-icon.svg";
import img from "../../assets/images/Rectangle 303.png";
import heart from "../../assets/icons/heart-icon.svg";
import { ImageUrl } from "../../assets/api/axios";

const GroundWork = ({ data }) => {
  // const data = [
  //     {
  //         img: img,
  //         img2 : heart ,
  //         title : "Groundworks" ,
  //         desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
  //         rating : "4.5 (Rating)",
  //         views: "2.3M Views"
  //     },
  //     {
  //         img: img,
  //         img2 : heart ,
  //         title : "Groundworks" ,
  //         desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
  //         rating : "4.5 (Rating)",
  //         views: "2.3M Views"
  //     },  {
  //         img: img,
  //         img2 : heart ,
  //         title : "Groundworks" ,
  //         desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
  //         rating : "4.5 (Rating)",
  //         views: "2.3M Views"
  //     },  {
  //         img: img,
  //         img2 : heart ,
  //         title : "Groundworks" ,
  //         desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
  //         rating : "4.5 (Rating)",
  //         views: "2.3M Views"
  //     },  {
  //         img: img,
  //         img2 : heart ,
  //         title : "Groundworks" ,
  //         desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
  //         rating : "4.5 (Rating)",
  //         views: "2.3M Views"
  //     },  {
  //         img: img,
  //         img2 : heart ,
  //         title : "Groundworks" ,
  //         desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
  //         rating : "4.5 (Rating)",
  //         views: "2.3M Views"
  //     },  {
  //         img: img,
  //         img2 : heart ,
  //         title : "Groundworks" ,
  //         desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
  //         rating : "4.5 (Rating)",
  //         views: "2.3M Views"
  //     },  {
  //         img: img,
  //         title : "Groundworks" ,
  //         desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
  //         rating : "4.5 (Rating)",
  //         views: "2.3M Views"
  //     },
  // ]

  return (
    <div className="mt-10 ml-10">
      <div className="bg-[white] w-[100%] h-[350px] rounded-[20px] shadow-lg shadow-[#00000029]-500/50 overflow-y-auto">
        <div className="flex justify-between">
          <div className="m-5">
            <p className="font-bold text-[20px] text-[030303]">
              Top Groundworks
            </p>
          </div>
          {/* <div className="m-5">
            <Button
              bgColor="#1C5C2E"
              borderRadius={6}
              icon={<img src={btn_icon} alt="btn-icon" />}
            />
          </div> */}
        </div>
        <hr className="mx-5" />
        {!data?.length ? (
          <h1 className="mx-5 my-2">No Top Groundworks Found</h1>
        ) : (
          data?.map((val, ind) => (
            <div
              key={ind}
              className=" flex w-[450px] h-[95px] bg-[white] mx-5 mt-5 rounded-[10px] shadow-lg shadow-[#00000029]-500/50"
            >
              <div className="w-[140px]">
                <img
                  src={`${ImageUrl}${val?.thumbnail}`}
                  width="80px"
                  className="ml-2 mt-2 h-[55px]"
                />
              </div>
              <div className="w-[340px]">
                <p className="font-bold text-[16px] text-[030303]">
                  {val?.title}
                  {/* <span className="text-[#1C5C2E]">+</span>{" "}
                  <span>2.5k</span> */}
                </p>
                <p className="text-[12px]">
                  {val?.description.length < 20
                    ? val?.description
                    : val?.description.substring(0, 120) + " ..."}
                </p>
              </div>
              <div className="w-[120px]">
                <p className="text-[#1C5C2E] text-[16px]">
                  {val?.comments[0]?.rating
                    ? `${val?.comments[0]?.rating} (Rating)`
                    : `0 (Rating)`}
                </p>
                {/* <p className="text-[gray] text-[12px] m-2 mt-8">{val.views}</p> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GroundWork;
