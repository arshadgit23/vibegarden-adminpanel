import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components'
import BackButton from '../../../components/BackButton'
import Box from '../../../components/Box'
import MobileScreenHeader from '../../../components/MobileScreenHeader'
import initialBloomSelection from "./screenImages/initialBloomSelection.png"



const InitialBloomSelectionScreen = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate("/Pages")
    }
    return (
        <>
            <div onClick={handleBack}>
                <BackButton />
            </div>
            <MobileScreenHeader heading="Bloom Selection Screen"
                horizontalLine={<div className="border-t border-[#1C5C2E]  w-[60%] mt-[15px] mx-4"></div>}
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
                        description="Finally, How Bloomed Is Your Vibe Today… "
                        div={
                            <div className='w-[100%] h-[100px] bg-[#E5ECE7] rounded-lg mt-5'>
                                <p className='text-[14px] text-center mt-2 text-[gray]' >Meaning,How Connected to your fell to your light, your unique essence?</p>
                            </div>
                        }
                    />
                    <Box
                     absoluteDiv={
                        <div className='w-[220px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                            <p className='font-semibold '>Dial It In If You Have Any Wish:</p>
                        </div>
                    }
                        heading="Dial It In If You Have Any Wish:"
                        description="Dial It In If You Have Any Wish:"
                    />
                </div>
                <div>
                    <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
                    <div className="w-[300px] h-[550px] flex flex-col  rounded-[40px] mt-10">
                        <img src={initialBloomSelection} alt="mobileImg" className="rounded-[40px] relative" width={'100%'} height={'100%'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default InitialBloomSelectionScreen