import React, { useEffect } from "react";
import Loader from "../../components/Loader";
import { useState } from "react";
import apicall from "../../assets/api/axios";

const ZoomAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");

  const bookingId = localStorage.getItem("bookingId");

  useEffect(() => {
    const confirmSchedule = async () => {
      try {
        setLoading(true);
        const response = await apicall.get(`/booking/confirm/booking`, {
          params: {
            bookingId,
            code,
          },
        });
        setLoading(false);
      } catch (error) {
        setError(
          error?.response.data?.message
            ? error?.response?.data?.message
            : error.message
        );
        setLoading(false);
      }
      setLoading(false);
    };
    confirmSchedule();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <h1 className="text-center">Authentication in process...</h1>
    </div>
  );
};

export default ZoomAuth;
