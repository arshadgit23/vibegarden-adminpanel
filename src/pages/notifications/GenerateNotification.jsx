import React from 'react'
import { Button } from '../../components'
import { FaMobileAlt } from 'react-icons/fa'
import { HiOutlineBell } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const GenerateNotification = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/emailNotification")
    }
    return (
        <>
            <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[95%] h-[300px] rounded-[20px] m-10 overflow-y-auto ">
                <div className='flex flex-row justify-between px-4 py-3'>
                    <div className='m-2 '>
                        <h1 className='font-medium text-[#1C5C2E] text-[24px] px-5 py-' style={{ marginTop: 20 }}>Generate Notifications</h1>
                        <div className='mt-5 px-5'>
                            <label class="inline-flex items-center">
                                <input type="radio" class="form-radio border-2 text-[#1C5C2E]" name="radio-colors" value="1" checked />
                                <span class="ml-2">Email</span>
                            </label>
                        </div>
                        <div className='mt-5 px-5'>
                            <label class="inline-flex items-center">
                                <input type="radio" class="form-radio border-2 text-[#1C5C2E]" name="radio-colors" value="1" />
                                <span class="ml-2">Push</span>
                            </label>
                        </div>
                        <div className='mt-[60px]' onClick={() => handleClick()}>
                            <Button text="Continue" bgColor="#359D9E" borderRadius={10} color="white" width={150} />
                        </div>
                    </div>
                    <div className='bg-[#FF4053] flex flex-row justify-center items-center w-[300px] h-[100px] rounded-[20px] mt-5'>
                        <div className='w-[50px] h-[50px] bg-white rounded-lg  flex flex-row justify-center items-center'>
                            <FaMobileAlt size={30} color='#1C5C2E' />
                        </div>
                        <p className='text-white text-[14px] ml-5'>Mobile Push Notification Users <br />345 Users</p>
                    </div>
                </div>
            </div>
            <div className='m-10'>
                <div className='flex flex-row'>
                    <div className='w-[50px] h-[50px] bg-[#1C5C2E] rounded-lg  flex flex-row justify-center items-center'>
                        <HiOutlineBell size={30} color="white" />
                    </div>
                    <p className='text-[16px] ml-5 mt-2 font-semibold'>Recent Sent Notifications</p>
                </div>
                <hr className='mt-5' />
                <div className='grid grid-cols-3 gap-4 mt-5'>
                    <div className='border rounded-[20px] w-[300px] h-[120px]  flex flex-row justify-center items-center'>
                        <div className='w-[50px] h-[50px] bg-gray-400 rounded-lg  flex flex-row justify-center items-center'>
                        </div>
                        <p className=' text-[14px] ml-5 font-semibold'> Lorem ipsum dolor sit.<br /> <span className='font-light text-gray-600'>09:00-AM - Nov-21-2022</span></p>
                        <div className='border border-[red] rounded-full w-[25px] h-[25px] text-[red] flex flex-row justify-center items-center ml-5 mb-20'>
                            X</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GenerateNotification