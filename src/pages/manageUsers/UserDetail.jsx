import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "../../components";
import ButtonsHeader from "../../components/ButtonsHeader";
import roundImg from "../../assets/images/profileImg.png";
import { FiMonitor, FiUser } from "react-icons/fi";
import { GrCycle } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import apicall from "../../assets/api/axios";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
const moment = require("moment");

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/manageUser");
  };

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userStatus, setUserStatus] = useState(data?.isActive);

  useEffect(() => {
    const getSingleUser = async () => {
      try {
        setLoading(true);
        const response = await apicall.get(`users/detail/${id}`);
        setData(response.data.data);
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
    getSingleUser();
  }, [userStatus]);

  const handleUserStatus = async () => {
    try {
      setLoading(true);
      await apicall.patch(`/users/activate-deactivate/${id}`, {
        status: data?.isActive ? false : true,
      });
      setLoading(false);
      setUserStatus(data?.isActive ? false : true);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-10 flex justify-between mx-10">
        <ButtonsHeader />
        <div className="flex ml-5" onClick={() => handleClick()}>
          <BsArrowLeft color="#0069FF" size={25} style={{ marginTop: 12 }} />
          <Button
            text="Back"
            color="#0069FF"
            borderRadius="10px"
            height="20px"
            // width="150px"
          />
        </div>
      </div>
      <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[95%] h-[600px] rounded-[20px] m-10 overflow-y-auto ">
        <div className="flex flex-row justify-between m-5">
          <h1
            className=" font-medium text-[#1C5C2E] text-[24px] px-5 py-3"
            style={{ marginTop: 20 }}
          >
            User Details:
          </h1>
          <div className="flex flex-row px-5 py-3 space-x-4">
            <Button
              handleClick={handleUserStatus}
              text={data?.isActive ? "De-activate" : "Activate"}
              bgColor={data?.isActive ? "#EF3A71" : "green"}
              color="#fff"
              width={150}
              height={50}
              borderRadius={5}
            />
            {/* <Button
              text="Edit"
              bgColor="#55C595"
              color="#fff"
              width={150}
              height={50}
              borderRadius={5}
            /> */}
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <>
            <div className="flex flex-row justify-between m-5">
              <div className="flex flex-row justify-between ">
                {data?.avatar && (
                  <img
                    src={`https://vibe-garden-development.s3.ap-south-1.amazonaws.com/${data?.avatar?.image}`}
                    alt="userImg"
                    className="w-100 h-40 object-contain"
                  />
                )}

                <div className="flex flex-col  m-5">
                  <p>{data?.firstName}</p>
                  <p>{data?.package?.name}</p>
                  <p>{data?.isActive ? "Active" : "De-Activated"}</p>
                  <p>
                    Last Login:{" "}
                    <span>
                      {moment(data?.lastLogin).format("DD - MMM - YY")}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                {/* <div className="flex flex-row justify-around mt-5">
              <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[160px] h-[120px] rounded-[10px] m-2">
                <div className="ml-5 bg-[#E5ECE7] rounded-full mt-2 w-[35px] h-[35px] flex justify-center items-center">
                  <FiUser color="#1C5C2E" size={20} />
                </div>
                <p className="text-[gray] text-[14px] ml-5 mt-2">
                  Avg.Monthly User
                </p>
                <p className="font-bold text-[16px] ml-5 mt-2">15654879</p>
              </div>
              <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[160px] h-[120px] rounded-[10px] m-2">
                <div className="ml-5 bg-[#E5ECE7] rounded-full mt-2 w-[35px] h-[35px] flex justify-center items-center">
                  <GrCycle color="#1C5C2E" size={20} />
                </div>
                <p className="text-[gray] text-[14px] ml-5 mt-2">
                  Average Visit
                </p>
                <p className="font-bold text-[16px] ml-5 mt-2">1532000</p>
              </div>
              <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[160px] h-[120px] rounded-[10px] m-2">
                <div className="ml-5 bg-[#E5ECE7] rounded-full mt-2 w-[35px] h-[35px] flex justify-center items-center">
                  <FiMonitor color="#1C5C2E" size={20} />
                </div>
                <p className="text-[gray] text-[14px] ml-5 mt-2">
                  Avg.Session Length
                </p>
                <p className="font-bold text-[16px] ml-5 mt-2">98/Hr</p>
              </div>
            </div> */}
              </div>
            </div>
            <hr className="mx-5" />
            <h1
              className=" font-medium text-[#1C5C2E] text-[18px] px-5 py-3"
              style={{ marginTop: 20 }}
            >
              Personal Details
            </h1>
            <div className="flex flex-row flex-wrap justify-between mx-5 w-[25%]">
              <p className="font-semibold text-[14px] leading-loose ">
                Email Address <br />{" "}
                <span className="text-[#1C5C2E] mt-2">{data?.email}</span>
              </p>
              <p className="font-semibold text-[14px] leading-loose ">
                Billings Date <br />{" "}
                <span className="text-[#1C5C2E] mt-2">
                  {moment(data?.packageEndDate).format("DD - MMM - YY")}
                </span>
              </p>
            </div>
            <h1
              className=" font-medium text-[#1C5C2E] text-[18px] px-5 py-3"
              style={{ marginTop: 20 }}
            >
              Account Details
            </h1>
            <div className="flex flex-row flex-wrap justify-between mx-5 w-[25%]">
              <p className="font-semibold text-[14px] leading-loose ">
                User Type <br />{" "}
                <span className="text-[#1C5C2E] mt-2">{data?.userType}</span>
              </p>
              {/* <p className="font-semibold text-[14px] leading-loose ">
                Total number of blooms <br />{" "}
                <span className="text-[#1C5C2E] mt-2">25</span>
              </p> */}
              <p className="font-semibold text-[14px] leading-loose ">
                Current bloom <br />{" "}
                <span className="text-[#1C5C2E] mt-2">
                  {data?.bloomPercentage}%
                </span>
              </p>
            </div>
            {/* <h1
              className=" font-medium text-[#1C5C2E] text-[18px] px-5 py-3"
              style={{ marginTop: 20 }}
            >
              Notification Prefrences
            </h1>
            <div className="flex flex-row justify-between m-5 w-[25%]">
              <p className="font-semibold text-[14px] leading-loose ">
                In App Notification{" "}
              </p>
              <p className="font-semibold text-[14px] leading-loose ">
                Email Notification{" "}
              </p>
            </div> */}
          </>
        )}
      </div>
    </>
  );
};

export default UserDetail;
