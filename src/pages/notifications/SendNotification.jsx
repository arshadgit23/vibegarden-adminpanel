import React from 'react'
import { FiCamera } from 'react-icons/fi'
import { Button } from '../../components'
import Box from '../../components/Box'
import bannerImg from "../../assets/images/bannerImg.png";
import Preview from './Preview';
import { BiEdit } from 'react-icons/bi';

const SendNotification = () => {
    return (
        <>
            <div className='flex flex-row justify-between m-10'>
                <div className='flex flex-row'>
                    <p className='text-[#1C5C2E] font-semibold text-lg'>Tools Recommendations</p>
                    <div className="border-t border-[#1C5C2E] w-[150px] mt-[15px] mx-4"></div>
                    <p className='text-[#1C5C2E] font-semibold text-lg'>Preview:</p>
                </div>
                <div><Button text="Send Notification" bgColor="#359D9E" color="white" width={200} borderRadius={10} /></div>
            </div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2'>
                <div className='m-10 flex flex-col space-y-10'>
                    <div className='w-[95%] h-[200px]  bg-[] border border-[#1C5C2E] rounded-[25px] relative '>
                        <div className='w-[120px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                            <p className='font-semibold'>Banner 1</p>
                        </div>
                        <div className='relative '>
                            <img src={bannerImg} alt="banner img" className='w-[95%] h-[75%] mt-[28px] ml-2' />
                            <div className='absolute -top-2 right-5 w-[100px] h-[30px] bg-[white] rounded-[11px] flex justify-center items-center px-4 py-4'>
                                <BiEdit color='#47A6E5' size={20}/>
                                <p className='text-[#47A6E5] text-[12px]'>change</p>
                            </div>
                        </div>
                    </div>
                    <Box heading="Banner 1" subHeading="Coming Home Together"
                        line={<div className="border-t border-[#1C5C2E]  mt-[15px] "></div>}
                        description="“There is a sun within every person; the you we call campanion.” – Thich Nhat Hahn Hi, You"
                        button={<Button text="Button Text" border={`1px solid #1C5C2E`} color="#979B9F" borderRadius={25} width={150} height={45} />}
                        icon={<FiCamera size={25} color="#1C5C2E" />}
                        btnTxt="Upload & Drag From Here" />
                    <Box heading="Heading" subHeading="Coming Home Together"
                        line={<div className="border-t border-[#1C5C2E]  mt-[15px] "></div>}
                        description="“There is a sun within every person; the you we call campanion.” – Thich Nhat Hahn Hi, You"
                        button={<Button text="Button Text" border={`1px solid #1C5C2E`} color="#979B9F" borderRadius={25} width={150} height={45} />}
                        icon={<FiCamera size={25} color="#1C5C2E" />}
                        btnTxt="Upload & Drag From Here" />
                    <Box heading="Heading" subHeading="Coming Home Together"
                        line={<div className="border-t border-[#1C5C2E]  mt-[15px] "></div>}
                        description="“There is a sun within every person; the you we call campanion.” – Thich Nhat Hahn Hi, You"
                        button={<Button text="Button Text" border={`1px solid #1C5C2E`} color="#979B9F" borderRadius={25} width={150} height={45} />}
                        icon={<FiCamera size={25} color="#1C5C2E" />}
                        btnTxt="Upload & Drag From Here" />
                    <Box heading="Heading" subHeading="Coming Home Together"
                        line={<div className="border-t border-[#1C5C2E]  mt-[15px] "></div>}
                        description="“There is a sun within every person; the you we call campanion.” – Thich Nhat Hahn Hi, You"
                        button={<Button text="Button Text" border={`1px solid #1C5C2E`} color="#979B9F" borderRadius={25} width={150} height={45} />}
                        icon={<FiCamera size={25} color="#1C5C2E" />}
                        btnTxt="Upload & Drag From Here" />
                </div>
                <div className='w-[95%] flex justify-center bg-white shadow-2xl shadow-white-500/50'>
                    <Preview /> 
                </div>
            </div>

        </>
    )
}

export default SendNotification