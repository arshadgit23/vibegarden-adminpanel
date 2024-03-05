import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { Button } from '../../../components'
import BackButton from '../../../components/BackButton'
import Box from '../../../components/Box'
import MobileScreenHeader from '../../../components/MobileScreenHeader'
import smalLogo from "../../../assets/images/smallLogo.svg"
import { HiOutlinePlus } from 'react-icons/hi'
import image from "../../../assets/images/image.png"
import groundwork from "./screenImages/groundwork.png"
import { useNavigate } from 'react-router-dom'


const GroundworkScreen = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate("/Pages")
    }
    return (
        <>
            <div onClick={handleBack}>
                <BackButton />
            </div>
            <MobileScreenHeader heading="Groundwork Screen"
                horizontalLine={<div className="border-t border-[#1C5C2E]  w-[68%] mt-[15px] mx-4"></div>}
                btn={<div > <Button text="Update Site" bgColor="#1C5C2E" borderRadius={10} width={150} color="#fff" /> </div>}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className='m-10'>
                    <Box heading="Sub Header"
                        absoluteDiv={
                            <div className='w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                                <p className='font-semibold '>Sub Header</p>
                            </div>
                        }
                        inputBtn={<input type="text" placeholder='Its Bloom Time' className='border-none outline-none' />} />
                </div>
                <div>
                    <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
                    <div className="w-[300px] h-[550px] flex flex-col  rounded-[40px] mt-10">
                        <img src={groundwork} alt="mobileImg" width={'100%'} height={'100%'} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default GroundworkScreen