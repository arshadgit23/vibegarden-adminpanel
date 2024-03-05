import "./style.css";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import apicall from "../../assets/api/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Video from "../../components/Video";
import Container from "../../components/Container";
import Button from "../../components/Button";
import TagComponent from "../../components/TagComponent";
import VideoDetail from "../../pages/feedBackSystem/VideoDetail";

const SingleVideo = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [element, setElement] = useState(false);
  const getSingleToolVideo = async () => {
    return await apicall.get(`videos/${id}`);
  };
  const { error, isLoading, data } = useQuery(
    {
      queryKey: ["singleToolVideo"],
      queryFn: getSingleToolVideo,
    },
    {
      enabled: true,
      cacheTime: 0,
      staleTime: 0,
    }
  );

  const deleteQuery = useMutation(async (id) => {
    return await apicall.delete(`videos/${id}`);
  });

  const originalDate = new Date(data?.data?.data?.createdAt);
  const options = { month: "long", day: "numeric", year: "2-digit" };
  const formattedDate = originalDate.toLocaleDateString("en-US", options);

  function handleDelete(id) {
    deleteQuery.mutate(id);
    navigate("/ToolsVideos");
  }

  return (
    <Container
      backButton={true}
      isLoading={isLoading || deleteQuery.isLoading}
      error={error}
    >
      <div>
        <div className=" flex justify-between items-center">
          <h1 className=" text-4xl text-[#1C5C2E]">Video Details:</h1>
          <div className=" relative flex gap-3 items-center">
            <Button
              text="Delete"
              bgColor="#EF3A71"
              color="#fff"
              borderRadius="10px"
              height="50px"
              width="150px"
              handleClick={() => setElement(true)}
            />
            <a href={`/updateToolVideo/${id}`}>
              <Button
                text="Edit"
                bgColor="#55C595"
                color="#fff"
                borderRadius="10px"
                height="50px"
                width="150px"
                // handleClick={() => redirect(``)}
              />
            </a>
            {element && (
              <div className=" absolute top-0 left-0 w-full h-full bg-white flex gap-2 items-center justify-center">
                Confirm Delete?
                <Button
                  text="Yes"
                  bgColor="#EF3A71"
                  color="#fff"
                  borderRadius="10px"
                  height="30px"
                  width="50px"
                  handleClick={() => handleDelete(data?.data?.data?._id)}
                />
                <Button
                  text="No"
                  bgColor="#55C595"
                  color="#fff"
                  borderRadius="10px"
                  height="30px"
                  width="50px"
                  handleClick={() => setElement(false)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="h-96 flex justify-start items-start my-12">
          <div className=" w-2/5 h-full">
            <Video
              data={data?.data?.data}
              className="relative w-full h-[35vh]"
            />
          </div>
          <div className="  w-3/5 h-full p-5 flex flex-col gap-3">
            <h1 className=" capitalize text-[#1C5C2E] text-4xl font-bold">
              {data?.data?.data?.title}
            </h1>
            <p className=" text-[#979B9F]">Posted Date: {formattedDate}</p>
            <h2 className="text-[#1C5C2E] font-bold text-xl">Description</h2>
            <p className=" text-[#979B9F] text-sm">
              {data?.data?.data?.description}
            </p>
            <div className=" flex gap-2">
              {data?.data?.data?.tags.map((tag) => (
                <TagComponent key={tag._id} tagName={tag.name} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <VideoDetail data={data?.data?.data} />
    </Container>
  );
};

export default SingleVideo;
