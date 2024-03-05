import React from "react";
import { Button } from "../../components";
import down_arrow from "../../assets/icons/down-arrow.svg";
import arrow_up from "../../assets/icons/arrow-up.svg";
import img from "../../assets/images/Rectangle 303.png";
import roundImg from "../../assets/images/profileImg.png";
import { ImageUrl } from "../../assets/api/axios";
const moment = require("moment");

const Resonancefinder = ({ data }) => {
  //   const data = [
  //     { img: roundImg, name: "Harry", time: "30 mins ago" },
  //     { img: roundImg, name: "Larry", time: "30 mins ago" },
  //     { img: roundImg, name: "Craylon", time: "30 mins ago" },
  //     { img: roundImg, name: "Lori", time: "30 mins ago" },
  //     { img: roundImg, name: "Debra", time: "30 mins ago" },
  //     { img: roundImg, name: "Rose", time: "30 mins ago" },
  //     { img: roundImg, name: "John", time: "30 mins ago" },
  //   ];

  return (
    <div className="mt-10 ml-10">
      <div className="bg-[white] w-[100%] h-[385px] rounded-[20px] shadow-lg shadow-[#00000029]-500/50 overflow-y-auto">
        <div className="flex justify-between">
          <div className="m-5">
            <p className="font-bold text-[20px] text-[030303]">
              Resonance Finder
            </p>
          </div>
          <div className="m-5">
            <Button
              text="Past 30 days"
              color="white"
              bgColor="#1C5C2E"
              borderRadius="25px"
              size={14}
              width="120px"
              // icon={<img src={down_arrow} alt="btn-icon"  />}
            />
          </div>
        </div>
        <div>
          <p className="text-[16px] ml-5 mb-5 flex">
            Number Of People Who Complete Resonance Finder :
            <span className="font-bold"> {data?.length} </span>
            <img src={arrow_up} className="ml-2" />
          </p>
          {data?.map((val, ind) => (
            <React.Fragment key={ind}>
              <div className="flex justify-between mx-5 mb-[15px]">
                <div className="flex">
                  <img
                    src={`${ImageUrl}${val?.avatar?.image}`}
                    className="rounded-full"
                    width="40px"
                    height="40px"
                  />
                  <span className="ml-[7px] mt-[5px] text-[#1c5c2e] font-medium">
                    {val?.firstName}
                  </span>
                </div>
                <div>
                  <p className="text-[14px] mt-[5px]">
                    {val?.resonanceResultDate &&
                      moment(val?.resonanceResultDate).fromNow()}
                  </p>
                </div>
              </div>
              <hr className="mx-5 bg-[black] mb-[15px]" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resonancefinder;
