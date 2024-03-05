import React from "react";
import { FiMonitor, FiUser } from "react-icons/fi";
import { GrCycle } from "react-icons/gr";
import ButtonsHeader from "../../components/ButtonsHeader";
import Example from "./Chart";
import Chart from "./Chart";
import UserTable from "./UserTable";

const ManageUsers = () => {
  return (
    <>
      {/* <div className="mt-10 md:flex justify-between mx-10">
                <div>
                    <ButtonsHeader />
                    <div className='md:flex flex-row md:justify-around justify-center mt-5'>
                        <div className='bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[160px] h-[120px] rounded-[10px] m-2'>
                            <div className='ml-5 bg-[#E5ECE7] rounded-full mt-2 w-[35px] h-[35px] flex justify-center items-center'><FiUser color='#1C5C2E' size={20}/></div>
                            <p className='text-[gray] text-[14px] ml-5 mt-2'>Avg.Monthly User</p>
                            <p className='font-bold text-[16px] ml-5 mt-2'>15654879</p>
                        </div>
                        <div className='bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[160px] h-[120px] rounded-[10px] m-2'>
                        <div className='ml-5 bg-[#E5ECE7] rounded-full mt-2 w-[35px] h-[35px] flex justify-center items-center'><GrCycle color='#1C5C2E' size={20}/></div>
                            <p className='text-[gray] text-[14px] ml-5 mt-2'>Average Visit</p>
                            <p className='font-bold text-[16px] ml-5 mt-2'>1532000</p>
                        </div>
                        <div className='bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[160px] h-[120px] rounded-[10px] m-2'>
                        <div className='ml-5 bg-[#E5ECE7] rounded-full mt-2 w-[35px] h-[35px] flex justify-center items-center'><FiMonitor color='#1C5C2E' size={20}/></div>
                            <p className='text-[gray] text-[14px] ml-5 mt-2'>Avg.Session Length</p>
                            <p className='font-bold text-[16px] ml-5 mt-2'>98/Hr</p>
                        </div>
                    </div>
                </div>
                <Chart />
            </div> */}
      <div>
        <UserTable />
      </div>
    </>
  );
};

export default ManageUsers;
