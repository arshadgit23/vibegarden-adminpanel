import React from "react";
import { Button } from "../../components";
import down_arrow from "../../assets/icons/down-arrow.svg";
import arrow_up from "../../assets/icons/arrow-up.svg";
import img from "../../assets/images/Rectangle 303.png";

const BloomsCheck = ({ data }) => {
  return (
    <div className="mt-10 ml-10">
      <div className="bg-[white] w-[100%] h-[385px] rounded-[20px] shadow-lg shadow-[#00000029]-500/50 overflow-y-auto">
        <div className="flex justify-between">
          <div className="m-5">
            <p className="font-bold text-[20px] text-[030303]">
              Total Blooms Check:
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
          {/* <p className="text-[16px] ml-5 mb-5 flex">
            Average Blooms %: <span className="font-bold"> Increased </span>{" "}
            <img src={arrow_up} className="ml-2" />{" "}
          </p> */}
          <p className="text-[16px] ml-5 mb-5">
            Breakdown of blooms Choosen by user in
          </p>
          <p className="text-[16px] ml-5 mb-5">Past 30 days of [all time]:</p>
          {data?.map((val, ind) => {
            return (
              <p key={ind} className="text-[16px] ml-5 mb-5">
                {val?.title} : {val?.count}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BloomsCheck;
