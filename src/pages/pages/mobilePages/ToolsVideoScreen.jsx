import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components'
import BackButton from '../../../components/BackButton'
import Box from '../../../components/Box'
import MobileScreenHeader from '../../../components/MobileScreenHeader'
import toolsVideo from "./screenImages/toolsVideo.png"
const ToolsVideoScreen = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate("/Pages")
    }
    return (
        <>
            <div onClick={handleBack}>
                <BackButton />
            </div>
            <MobileScreenHeader heading="Tool Video Screen"
            horizontalLine={<div className="border-t border-[#1C5C2E]  w-[68%] mt-[15px] mx-4"></div>}
                btn={<div > <Button text="Update Site" bgColor="#1C5C2E" borderRadius={10} width={150} color="#fff" /> </div>}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className='m-10 space-y-10'>
                    <Box
                      absoluteDiv={
                        <div className='w-[140px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                            <p className='font-semibold '>Descriptive Text</p>
                        </div>
                    }
                        heading="Descriptive Text"
                        description="Did you try this Tools?"
                    />
                    <Box
                      absoluteDiv={
                        <div className='w-[60px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                            <p className='font-semibold '>Text</p>
                        </div>
                    }
                        heading=" Text"
                        description="Additional Resonance"
                    />
                </div>
                <div>
                    <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
                    <div className="w-[300px] h-[550px] flex flex-col  rounded-[40px] mt-10">
                        <img src={toolsVideo} alt="mobileImg" className="rounded-[40px] relative" width={'100%'} height={'100%'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToolsVideoScreen