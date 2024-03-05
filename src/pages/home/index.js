import React, { useEffect, useState } from "react";
import BloomsCheck from "./BloomsCheck";
import GroundWork from "./GroundWork";
import Resonancefinder from "./Resonancefinder";
import ServiceCards from "./ServiceCards";
import TopFreshBlooms from "./TopFreshBlooms";
import TopTools from "./TopTools";
import ViewedTeacher from "./ViewedTeacher";
import apicall from "../../assets/api/axios";
import Loader from "../../components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const getUsersStats = async () => {
      try {
        setLoading(true);
        const response = await apicall.get("/users/statistics");
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
    getUsersStats();
  }, []);

  return loading ? (
    <Loader styles={{ marginLeft: "20px" }} />
  ) : (
    <>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <ServiceCards data={data} />
        <TopTools data={data?.tools} />
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <BloomsCheck data={data?.totalBloomsCheck} />
        <GroundWork data={data?.groundworks} />
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Resonancefinder data={data?.resonanceFinderUsers} />
        <TopFreshBlooms data={data?.blooms} />
      </div>
      {/* <ViewedTeacher /> */}
    </>
  );
};

export default Home;
