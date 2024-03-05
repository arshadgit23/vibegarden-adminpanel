import "./style.css";
import { useParams } from "react-router-dom";
import apicall from "../../assets/api/axios";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import BloomForm from "../../components/BloomForm";
import ToolForm from "./ToolForm";
import { useState } from "react";
import { useEffect } from "react";

const UpdateToolVideo = (props) => {
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
  //   queryKey: ["getToolById"],
  //   queryFn: async () => {
  //     return await apicall.get(`videos/${id}`);
  //   },
  // });

  useEffect(() => {
    const getToolById = async () => {
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
    getToolById();
  }, []);

  const updateFunction = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <ToolForm
      freshBloomData={data?.data?.data}
      updateFunction={updateFunction}
      videoUrl={mutation.data?.data?.data?.url}
    />
  );
};

export default UpdateToolVideo;
