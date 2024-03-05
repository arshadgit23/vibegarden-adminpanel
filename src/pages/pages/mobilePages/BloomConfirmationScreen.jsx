import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components'
import BackButton from '../../../components/BackButton'
import Box from '../../../components/Box'
import MobileScreenHeader from '../../../components/MobileScreenHeader'
import bloomConfirmation from "./screenImages/bloomConfirmation.png"


const BloomConfirmationScreen = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate("/Pages")
    }
    return (
        <>
            <div onClick={handleBack}>
                <BackButton />
            </div>
            <MobileScreenHeader heading="Bloom Confirmation Screen"
                horizontalLine={<div className="border-t border-[#1C5C2E] w-[60%] mt-[15px] mx-4"></div>}
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
                        heading=" Descriptive Text"
                        description="Bloom Confirmation Screen "
                        div={
                            <div className='flex flex-col justify-center items-center w-[100%] space-y-5'><div className='w-[100%] h-[100px] bg-[#E5ECE7] rounded-lg mt-5'>
                                <p className='text-[14px] text-center mt-2 text-[gray]'>Meaning,How Connected to your fell to your light, your unique essence?</p>
                            </div>
                                <div>
                                    <Button text="Take Me to the garden" borderRadius={30} border={`1px solid #1C5C2E`} />
                                </div></div>
                        }

                    />
                </div>
                <div>
                    <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
                    <div className="w-[300px] h-[550px] flex flex-col rounded-[40px] mt-10">
                        <img src={bloomConfirmation} alt="mobileImg" className="rounded-[40px] relative" width={'100%'} height={'100%'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BloomConfirmationScreen