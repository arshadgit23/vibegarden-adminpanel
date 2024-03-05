import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../../components/BackButton'
import MobileScreenHeader from '../../../components/MobileScreenHeader'
import { Button } from '../../../components'
import Box from '../../../components/Box'
import { FiCamera } from 'react-icons/fi'
import contactUs from "./screenImages/contactUs.png"


const ContactUsScreen = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate("/Pages")
    }
    return (
        <>
            <div onClick={handleBack}>
                <BackButton />
            </div>
            <MobileScreenHeader heading="Contact Us Screen"
                horizontalLine={<div className="border-t border-[#1C5C2E]  w-[60%] mt-[15px] mx-4"></div>}
                btn={<div > <Button text="Update Site" bgColor="#1C5C2E" borderRadius={10} width={150} color="#fff" /> </div>}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className='m-5 space-y-10'>
                    <Box
                        heading="Descriptive Text" absoluteDiv={
                            <div className='w-[140px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                                <p className='font-semibold '>Descriptive Text</p>
                            </div>
                        }
                        div={
                            <div className='m-10 flex flex-col justify-center items-center w-[100%] space-y-10'>
                                <p className='text-gray'>Contact Us</p>
                                <p className='text-gray w-[200px] text-center'>Please Feel Free To Reach Out  To Us To Directly</p>
                                <input
                                    type="text"
                                    name="" id=""
                                    placeholder='Bloomsupport@vibgarden.com'
                                    className='w-[250px] h-[50px] border border-[#1C5C2E] rounded-[18px] text-center' />
                                <div className='w-[80px] h-[80px] border border-[#00000029] rounded-lg ml- mt-5 space-y-2 flex flex-col justify-center items-center'>
                                    <FiCamera color='#1C5C2E' size={20} />
                                    <p className='text-[10px] text-center'>Upload & Drag From Here</p>
                                </div>
                            </div>
                        }
                    />

                </div>
                <div>
                    <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
                    <div className="w-[300px] h-[550px] flex flex-col rounded-[40px] mt-10">
                        <img src={contactUs} alt="mobileImg" className="rounded-[40px] relative" width={'100%'} height={'100%'} />
                    </div>
                </div>
            </div>
        </>
    )

}

export default ContactUsScreen