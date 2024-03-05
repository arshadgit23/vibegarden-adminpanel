import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../../components/BackButton'
import MobileScreenHeader from '../../../components/MobileScreenHeader'
import { Button } from '../../../components'
import Box from '../../../components/Box'
import manageSubcription from "./screenImages/manageSubcription.png"
const ManageSubcriptionScreen = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate("/Pages")
    }
    return (
        <>
            <div onClick={handleBack}>
                <BackButton />
            </div>
            <MobileScreenHeader heading="Manage Subscription Screen"
                horizontalLine={<div className="border-t border-[#1C5C2E]  w-[60%] mt-[15px] mx-4"></div>}
                btn={<div > <Button text="Update Site" bgColor="#1C5C2E" borderRadius={10} width={150} color="#fff" /> </div>}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className='m-10 space-y-10'>
                    <Box
                    absoluteDiv={
                        <div className='w-[160px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                            <p className='font-semibold '>Manage Subscription</p>
                        </div>
                    }
                        heading="Manage Subscription"
                        div={
                            <div className='flex justify-between'>
                                
                                <div className='flex flex-col space-y-10'>
                                    <input placeholder='Subscription Info' type="text" className='bg-[#E5ECE7] w-[180px] h-[40px] rounded-[9px] placeholder-ml-5 outline-none' />
                                    <input placeholder='Subscription Date' type="text" className='bg-[#E5ECE7] w-[180px] h-[40px] rounded-[9px] outline-none' />
                                    <input placeholder='Next Billing date' type="text" className='bg-[#E5ECE7] w-[180px] h-[40px] rounded-[9px] outline-none' />
                                    <input placeholder='Package Selected' type="text" className='bg-[#E5ECE7] w-[180px] h-[40px] rounded-[9px]  outline-none' />
                                    <input placeholder='Billing Info' type="text" className='bg-[#E5ECE7] w-[180px] h-[40px] rounded-[9px] outline-none' />
                                </div>
                                <div className='w-[250px] h-[320px] border-t-2 border-b-2 border-gray mt-[15px] ml-2'></div>
                            </div>
                        }
                    />

                </div>
                <div>
                    <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
                    <div className="w-[300px] h-[550px] flex flex-col rounded-[40px] mt-10">
                        <img src={manageSubcription} alt="mobileImg" className="rounded-[40px] relative" width={'100%'} height={'100%'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageSubcriptionScreen