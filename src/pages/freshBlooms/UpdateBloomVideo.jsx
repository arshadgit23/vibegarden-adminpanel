import { useParams } from "react-router-dom";
import apicall from "../../assets/api/axios";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import BloomForm from "../../components/BloomForm";
import { useState } from "react";
import { useEffect } from "react";

const UpdateBloomVideo = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await apicall.patch(`videos/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["getBloomById"],
  //   queryFn: async () => {
  //     return await apicall.get(`/videos/${id}`);
  //   },
  // });

  useEffect(() => {
    const getBloomById = async () => {
      setIsLoading(true);
      try {
        const response = await apicall.get(`videos/${id}`);
        setData(response);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error.message
        );
      }
    };
    getBloomById();
  }, []);

  const updateFunction = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <BloomForm
      freshBloomData={data?.data?.data}
      updateFunction={updateFunction}
      videoUrl={mutation.data?.data?.data?.url}
    />
  );
};

export default UpdateBloomVideo;
