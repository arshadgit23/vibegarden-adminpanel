import React from "react";
import { Button } from "../../components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import apicall, { ImageUrl } from "../../assets/api/axios";
import { useEffect } from "react";
import moment from "moment";

const VibeGuideSchedules = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sheduling, setSheduling] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getSchedules = async () => {
      try {
        setLoading(true);
        const response = await apicall.get(`/booking/vibe-guide/${params?.id}`);

        setSheduling(response.data.data);
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
    getSchedules();
  }, []);

  const deleteSchedule = async (id) => {
    try {
      setLoading(true);
      const response = await apicall.patch(`/booking/${id}`, {
        status: "rejected",
      });
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

  // ZOOM API (Deprecated)

  // const confirmSchedule = async (id) => {
  //   setLoading(true);
  //   try {
  //     localStorage.setItem("bookingId", id);
  //     const response = await apicall.get(`/booking/keys`);
  //     window.open(response?.data?.data);
  //     setLoading(false);
  //   } catch (error) {
  //     setError(
  //       error?.response?.data?.message
  //         ? error?.response?.data?.message
  //         : error.message
  //     );
  //     setLoading(false);
  //   }
  // };

  const confirmSchedule = async (id) => {
    try {
      setLoading(true);
      const response = await apicall.patch(`/booking/${id}`, {
        status: "confirmed",
      });
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

  return (
    <>
      <div className="md:flex justify-between m-10 flex-wrap items-center">
        <h1
          className="font-medium text-[] text-[24px] "
          style={{ marginTop: 10 }}
        >
          My Scheduling
        </h1>

        <div onClick={() => navigate("/addVibeGuide")}>
          <Button
            text="+ Add Vibe Guide"
            color="white"
            bgColor="#359D9E"
            width={200}
            borderRadius={10}
          />
        </div>
      </div>

      {loading ? (
        <div className="ml-3">
          <Loader />
        </div>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : sheduling.length === 0 ? (
        <h1 className="ml-10">No Scheduling Found</h1>
      ) : (
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 m-10">
          {sheduling?.map((val, ind) => (
            <div className="mb-5 p-4 bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[95%] h-[200px] rounded-[20px] overflow-y-auto ">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img
                    src={`${ImageUrl}${val?.user?.avatar?.image}`}
                    alt="image"
                    className="rounded-full w-[70px] h-[70px]"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-[16px] mt-5 ml-3">
                      {val?.user?.firstName}
                    </p>
                    <p className="mt-2 ml-3">{val?.user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Button
                    handleClick={() => deleteSchedule(val?._id)}
                    text="cancel"
                    color="#FF0034"
                    borderRadius={10}
                    outLine={"underline"}
                  />
                  <Button
                    handleClick={() =>
                      val?.status == "confirmed"
                        ? null
                        : confirmSchedule(val?._id)
                    }
                    text={val?.status == "confirmed" ? "Confirmed" : "Confirm"}
                    color="white"
                    bgColor={val?.status == "confirmed" ? "#1C5C2E" : "#359D9E"}
                    width={151}
                    height={49}
                    borderRadius={10}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <div>
                  <p>Time:</p>
                  <small>{val?.bookingTime}</small>
                </div>
                <div>
                  <p>Date:</p>
                  <small>
                    {moment(val?.bookingDate).format("MMMM-DD-YYYY")}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default VibeGuideSchedules;
