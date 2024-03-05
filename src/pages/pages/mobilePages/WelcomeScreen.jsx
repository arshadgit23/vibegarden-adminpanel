import React from 'react'
import { FiCamera } from 'react-icons/fi'
import { Button } from '../../../components'
import BackButton from '../../../components/BackButton'
import Box from '../../../components/Box'
import MobileScreenHeader from '../../../components/MobileScreenHeader'
import welcome from "./screenImages/welcome.png"
const WelcomeScreen = () => {
    return (
        <>
            <div>
                <BackButton />
            </div>
            <MobileScreenHeader heading="log in flow Screen"
                horizontalLine={<div className="border-t border-[#1C5C2E]  w-[68%] mt-[15px] mx-4"></div>}
                btn={<div > <Button text="Update Site" bgColor="#1C5C2E" borderRadius={10} width={150} color="#fff" /> </div>}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className='m-10'>
                    <Box heading="Text"
                      absoluteDiv={
                        <div className='w-[60px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                            <p className='font-semibold '>Text</p>
                        </div>
                    }
                        display="flex"
                        justify="center"
                        center="center"
                        div={<div className='flex flex-col bg-[] justify-center items-center -mt-5 space-y-5 -ml-5  w-[100%]'>
                            <div className='w-[80px] h-[80px] border border-[#00000029] rounded-lg ml- mt-5 space-y-2 flex flex-col justify-center items-center'>
                                <FiCamera color='#1C5C2E' size={20}/>
                                <p className='text-[10px] text-center'>Upload & Drag From Here</p>
                            </div>
                            <p className='text-[#00000029] text-center w-[200px]'>Welcome vibe Gardner Huzzah! Its you're first time visiting Vibe Garden Mobile App!</p>
                            <Button text="Button Text" border={`1px solid #1C5C2E`} borderRadius={18} width={200} height={50} />
                        </div>}

                    />
                </div>
                <div>
                <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
                    <div className="w-[300px] h-[550px] flex flex-col  rounded-[40px] mt-10">
                        <img src={welcome} alt="mobileImg" className="rounded-[40px] relative" width={'100%'} height={'100%'} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default WelcomeScreen