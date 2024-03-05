import React from "react";
import { BiFilterAlt } from "react-icons/bi";
import { Button } from "../../components";
import ButtonsHeader from "../../components/ButtonsHeader";
import img from "../../assets/images/Rectangle 302.png";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import SingleVideoCard from "../../components/SingleVideoCard";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import apicall from "../../assets/api/axios";

// const cardData = [
//   {
//     img: img,
//     title: "Title",
//     categ: "Category",
//     desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
//     btn: "lorem",
//   },
//   {
//     img: img,
//     title: "Title",
//     categ: "Category",
//     desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
//     btn: "lorem",
//   },
//   {
//     img: img,
//     title: "Title",
//     categ: "Category",
//     desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
//     btn: "lorem",
//   },
//   {
//     img: img,
//     title: "Title",
//     categ: "Category",
//     desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
//     btn: "lorem",
//   },
//   {
//     img: img,
//     title: "Title",
//     categ: "Category",
//     desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
//     btn: "lorem",
//   },
//   {
//     img: img,
//     title: "Title",
//     categ: "Category",
//     desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
//     btn: "lorem",
//   },
//   {
//     img: img,
//     title: "Title",
//     categ: "Category",
//     desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
//     btn: "lorem",
//   },
//   {
//     img: img,
//     title: "Title",
//     categ: "Category",
//     desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore….",
//     btn: "lorem",
//   },
// ];

const Videos = () => {
  const [loading, setLoading] = useState(false);
  const [toolsVideos, setToolsVideos] = useState([]);
  const [error, setError] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const getToolsVideos = async () => {
      try {
        setLoading(true);
        const response = await apicall.get("/videos?videoType=tool", {
          params: { search: filterTerm },
        });
        setToolsVideos(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message
            ? error.response?.data?.message
            : error.message
        );
        setLoading(false);
      }
    };
    getToolsVideos();
  }, [filterTerm]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/addVideo");
  };

  return (
    // <>
    //   <div className="mt-10 flex justify-between mx-10">
    //     <ButtonsHeader />
    //     <div>
    //       <Button
    //         text="+ Add video"
    //         bgColor="#359D9E"
    //         color="#fff"
    //         borderRadius="10px"
    //         height="50px"
    //         width="150px"
    //         handleClick={() => navigate("/addVideo")}
    //       />
    //     </div>
    //   </div>
    //   <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[95%] h-[600px] rounded-[20px] m-10 overflow-y-auto">
    //     <div className="flex justify-between mx-10 my-5">
    //       <h1
    //         className=" font-bold text-[#1C5C2E] text-[20px]"
    //         style={{ marginTop: 20 }}
    //       >
    //         Tools Video:
    //       </h1>
    //       <Button
    //         icon={<BiFilterAlt color="#1C5C2E" size={20} />}
    //         bgColor="#E5ECE7"
    //         borderRadius="10px"
    //       />
    //     </div>
    //     <div class="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4 ">
    //       {cardData.map((val, ind) => (
    //         <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[230px] h-[300px] rounded-[20px] m-5 ">
    //           <div>
    //             <img src={val.img} width="100%" />
    //           </div>
    //           <div className="flex justify-between mt-[5px] m-[5px]">
    //             <p className="text-[14px]">{val.title}</p>
    //             <p className="text-[14px] text-[#75997E]">{val.categ}</p>
    //           </div>
    //           <p className="text-[11px] m-[5px]">{val.desc}</p>
    //           <div className="flex">
    //             <p className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]">
    //               {val.btn}
    //             </p>
    //             <p className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]">
    //               {val.btn}
    //             </p>
    //             <p className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]">
    //               {val.btn}
    //             </p>
    //             <p className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]">
    //               {val.btn}
    //             </p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </>
    <Container
      addButton={true}
      addButtonText={"+ Add More"}
      addButtonLink={"/addVideo"}
    >
      <div className="flex justify-between items-center my-10 flex-wrap">
        <h1 className=" font-bold text-[#1C5C2E] text-3xl">Tools Videos:</h1>
        <div className="flex justify-between items-center gap-4">
          <input
            type="text"
            value={filterTerm}
            placeholder="Search here"
            className="rounded bg-[#E5ECE7] md:w-[32rem] w-[90%] h-[50px] font-[14px] focus:outline-none px-5 "
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          {/* <Button
            icon={<BiFilterAlt color="#1C5C2E" size={20} />}
            bgColor="#E5ECE7"
            borderRadius="10px"
          /> */}
        </div>
      </div>
      <div className=" flex justify-start flex-wrap gap-3">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : toolsVideos.length == 0 ? (
          <h1>No Video Found</h1>
        ) : (
          toolsVideos.map((val, ind) => {
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/ToolsVideos/${val?._id}`);
                }}
                key={ind}
                className="cursor-pointer bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[230px] h-[300px] rounded-[20px]"
              >
                <div>
                  <img
                    src={`https://vibe-garden-development.s3.ap-south-1.amazonaws.com/${val?.thumbnail}`}
                    className="w-full h-40 object-contain"
                  />
                </div>
                <div className="flex justify-between mt-[5px] m-[5px]">
                  <p className="text-[14px]">{val?.title}</p>
                  <p className="text-[14px] text-[#75997E] capitalize">
                    {val?.videoType}
                  </p>
                </div>
                <p className="text-[11px] m-[5px]">
                  {val?.description.length < 20
                    ? val?.description
                    : val?.description.substring(0, 120) + " ..."}
                </p>
                <div className="flex">
                  {val.tags.map((tag, i) => (
                    <p
                      key={i}
                      className="bg-[#75997E] mx-[5px] text-[12px] text-[#1C5C2E] p-[3px] rounded-[10px]"
                    >
                      {tag?.name}
                    </p>
                  ))}
                </div>
              </div>
            );
            // <SingleVideoCard key={ind} data={val} />
          })
        )}
      </div>
    </Container>
  );
};

export default Videos;
