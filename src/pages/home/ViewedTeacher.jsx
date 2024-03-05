
import React from 'react'
import { Button } from '../../components'
import down_arrow from "../../assets/icons/down-arrow.svg";
import arrow_up from "../../assets/icons/arrow-up.svg";
import img from "../../assets/images/Rectangle 303.png";
import roundImg from "../../assets/images/profileImg.png";


const ViewedTeacher = () => {
  const data = [
    { img: roundImg, name: "Harry", time: "350k Times" },
    { img: roundImg, name: "Larry", time: "350k Times" },
    { img: roundImg, name: "Craylon", time: "350k Times" },
    { img: roundImg, name: "Lori", time: "350k Times" },
    { img: roundImg, name: "Debra", time: "350k Times" },
    { img: roundImg, name: "Rose", time: "350k Times" },
    { img: roundImg, name: "John", time: "350k Times" },
  ]
  return (
    <div className=' ml-10 md:-mt-[320px]'>
      <div className='bg-[white] w-[100%] lg:w-[50%] md:w-[50%] h-auto rounded-[20px] shadow-lg shadow-[#00000029]-500/50 overflow-y-auto'>
        <div className='flex justify-between mt-5'>
          <div className='m-5'>
            <p className='font-bold text-[20px] text-[030303]'>Most Viewed Teacher</p>
          </div>
          <div className='m-5'>
            <Button text="Past 30 days" color="white" bgColor="#1C5C2E" borderRadius="25px" size={14} width="120px"
            // icon={<img src={down_arrow} alt="btn-icon"  />}
            />
          </div>
        </div>
        <div>
          {/* <p className='text-[16px] ml-5 mb-5 flex'>Number Of People Who Complete Resonance Finder : <span className='font-bold'> 30k </span> <img src={arrow_up} className="ml-2"/> </p> */}
          {data.map((val, ind) => (
            <>
              <div className='flex justify-between mx-5 mb-[15px]'>
                <div className='flex'>
                  <img src={val.img} className="rounded-full" width="40px" height="40px" />
                  <span className='ml-[7px] mt-[5px] text-[#1c5c2e] font-medium'>{val.name}</span>
                </div>
                <div>
                  <p className='text-[#359d9e] font-medium'>{val.time}</p>
                </div>
              </div>
              <hr className='mx-5 bg-[black] mb-[15px] mt-[5px]' />
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ViewedTeacher