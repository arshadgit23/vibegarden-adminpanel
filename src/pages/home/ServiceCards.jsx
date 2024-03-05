import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";

import { Stacked, Pie, Button, LineChart, SparkLine } from "../../components";
import {
  earningData,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";
// import product9 from "../data/product9.jpg";
import Card from "../../components/Card";
import user_check from "../../assets/icons/user-check.svg";
import user_plus from "../../assets/icons/user-plus.svg";
import video from "../../assets/icons/video.svg";
import user_x from "../../assets/icons/user-x.svg";

const ServiceCards = ({ data }) => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <div className="mt-16">
      <div>
        <div class="grid grid-cols-1 gap-y-3 gap-x-10 md:grid-cols-2 lg:grid-cols-2 ml-5">
          <div className="bg-[#359d9e] w-[280px] h-[120px] rounded-[10px] justify-around flex items-center">
            <div className="bg-[#359d9e]  ">
              <img src={user_check} />
            </div>
            <div>
              <h1 className="text-white text-[32px] font-bold">
                {data?.totalUsers}
              </h1>
              <p className="text-white">Total Users</p>
            </div>
          </div>
          <div className="bg-[#7CE495] w-[280px] h-[120px] rounded-[10px] justify-around flex items-center">
            <div className="bg-[#7CE495]">
              <img src={user_x} />
            </div>
            <div>
              <h1 className="text-white text-[32px] font-bold">
                {data?.blockedUsers}
              </h1>
              <p className="text-white">Blocked Users</p>
            </div>
          </div>

          <div className="bg-[#215273] w-[280px] h-[120px] rounded-[10px] justify-around flex items-center">
            <div className="bg-[#215273]">
              <img src={user_check} />
            </div>
            <div>
              <h1 className="text-white text-[32px] font-bold">
                {data?.totalPaidUsers}
              </h1>
              <p className="text-white">Paid Users</p>
            </div>
          </div>
          <div className="bg-[#55C595] w-[280px] h-[120px] rounded-[10px] justify-around flex items-center">
            <div className="bg-[#55C595]">
              <img src={user_x} />
            </div>
            <div>
              <h1 className="text-white text-[32px] font-bold">
                {data?.totalUnpaidUsers}
              </h1>
              <p className="text-white">Unpaid Users</p>
            </div>
          </div>

          <div className="bg-[#7CE495] w-[280px] h-[120px] rounded-[10px] justify-around flex items-center">
            <div className="bg-[#7CE495]  ">
              <img src={video} />
            </div>
            <div>
              <h1 className="text-white text-[32px] font-bold">
                {data?.totalVideos}
              </h1>
              <p className="text-white">Total Videos</p>
            </div>
          </div>
          <div className="bg-[#215273] w-[280px] h-[120px] rounded-[10px] justify-around flex items-center">
            <div className="bg-[#215273]  ">
              <img src={user_plus} />
            </div>
            <div>
              <h1 className="text-white text-[32px] font-bold">
                {/* {data?.avgBloomCheck} */}
                {data?.averageBloomPercentage?.toFixed(0)}
              </h1>
              <p className="text-white">
                Blooms <br /> Check User
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;
