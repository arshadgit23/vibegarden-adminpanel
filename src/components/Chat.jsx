import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { chatData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import img from "../assets/images/Rectangle 303.png";
import smallImg from "../assets/images/profileImg.png";
import ButtonsHeader from "./ButtonsHeader";
const Chat = () => {
  const { currentColor } = useStateContext();
  const data = [
    {
      img: img,
      title: "Tools ",
      name: "Rubias Albus",
      smallImg: smallImg,
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
      rating: "4.5 (Rating)",
      views: "2.3M Views"
    },
    {
      img: img,
      title: "Tools ",
      name: "Rubias Albus",
      smallImg: smallImg,
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
      rating: "4.5 (Rating)",
      views: "2.3M Views"
    }, {
      img: img,
      title: "Tools ",
      name: "Rubias Albus",
      smallImg: smallImg,
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
      rating: "4.5 (Rating)",
      views: "2.3M Views"
    }, {
      img: img,
      title: "Tools ",
      name: "Rubias Albus",
      smallImg: smallImg,
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
      rating: "4.5 (Rating)",
      views: "2.3M Views"
    }, {
      img: img,
      title: "Tools ",
      name: "Rubias Albus",
      smallImg: smallImg,
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
      rating: "4.5 (Rating)",
      views: "2.3M Views"
    }, {
      img: img,
      title: "Tools ",
      name: "Rubias Albus",
      smallImg: smallImg,
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
      rating: "4.5 (Rating)",
      views: "2.3M Views"
    }, {
      img: img,
      title: "Tools ",
      name: "Rubias Albus",
      smallImg: smallImg,
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
      rating: "4.5 (Rating)",
      views: "2.3M Views"
    }, {
      img: img,
      title: "Tools ",
      name: "Rubias Albus",
      smallImg: smallImg,
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
      rating: "4.5 (Rating)",
      views: "2.3M Views"
    },
    {
      img: img,
      title: "Tools ",
      name: "Rubias Albus",
      smallImg: smallImg,
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
      rating: "4.5 (Rating)",
      views: "2.3M Views"
    }, {
      img: img,
      title: "Tools ",
      name: "Rubias Albus",
      smallImg: smallImg,
      desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
      rating: "4.5 (Rating)",
      views: "2.3M Views"
    },

  ]
  return (

    <div>
      <div className="flex mx-10 mt-10">
        <ButtonsHeader />
      </div>
      <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[90%] h-[600px] rounded-[20px] m-10 overflow-y-auto">
        <h1 className="m-10 font-bold" style={{ marginTop: 20 }}>Latest Comments</h1>
        {data.map((val, ind) => (
          <>
            <div key={ind} className=' md:flex m-10 w-[95%] md:h-[90px]  bg-[white] mx-5 mt-10 rounded-[10px] shadow-lg shadow-[#00000029]-500/50 '>
              <div className='w-[12%]'>
                <img src={val.img} width="80px" height="80px" className='ml-2 mt-2' />

              </div>
              <div className='w-[75%]'>
                <p className='font-bold text-[16px] text-[030303]'>{val.title} </p>
                <p className="flex">
                  <img src={val.smallImg} width="20px" height="20px" className="rounded-full" />
                  <span className="ml-[5px] font-medium text-[16px]">{val.name}</span>
                </p>
                <p className='text-[12px] mt-[8px]'>{val.desc}</p>
              </div>
              <Button text="Edit" color="#1C5C2E" outLine="underLine" />
              <Button text="Delete" color="#EF3A71" outLine="underLine" />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Chat;
