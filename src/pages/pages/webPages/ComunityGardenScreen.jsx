import React from 'react'
import { useNavigate } from 'react-router-dom'
import guides from "./webScreenImages/guides.png"
import BackButton from '../../../components/BackButton'
import MobileScreenHeader from '../../../components/MobileScreenHeader'
import { Button } from '../../../components'
import bannerimg from "./webScreenImages/bannerImg.png"
import Box from '../../../components/Box'
import { Switch } from '@material-tailwind/react'
import CameraBox from '../../../components/CameraBox'
import { FiCamera, FiLink, FiVideo } from 'react-icons/fi'

const ComunityGardenScreen = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate("/Pages")
    }
    return (
        <>
            <div onClick={handleBack}>
                <BackButton />
            </div>
            <MobileScreenHeader heading="Community Garden"
                horizontalLine={<div className="border-t border-[#1C5C2E]  w-[68%] mt-[15px] mx-4"></div>}
                btn={<div > <Button text="Update Site" bgColor="#1C5C2E" borderRadius={10} width={150} color="#fff" /> </div>}
            />
            <div className='flex px-5 justify-between w-[50%]'>
                <div class="mb-3  ">
                    <label htmlFor="">Banner Type:</label>
                    <select className='bg-[#1C5C2E] text-white outline-none border-none w-[120px] h-[40px] rounded-[25px]' data-te-select-init>
                        <option className='bg-white text-[#1C5C2E] outline-none border-nonew-[120px] h-[40px] rounded-[25px]' value="1">01 Banner</option>
                        <option className='bg-white text-[#1C5C2E] outline-none border-nonew-[120px] h-[40px] rounded-[25px]' value="2">02 Banner</option>
                        <option className='bg-white text-[#1C5C2E] outline-none border-none w-[120px] h-[40px] rounded-[25px]' value="3">013 Banner</option>
                    </select>
                </div>
                <p className='text-[#1C5C2E] font-medium  text-[18px]'>
                    Preview:
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className='m-10 space-y-10'>
                    <Box absoluteDiv={
                        <div className='w-[80px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                            <p className='font-semibold '>Heading</p>
                        </div>
                    }
                        div={
                            <img src={bannerimg} />
                        } />
                    <div className='flex justify-between m-5'>
                        <p>Ad Section</p>
                        <Switch />
                    </div>
                    <Box
                        absoluteDiv={
                            <div className='w-[150px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                                <p className='font-semibold '>Write Content Here</p>
                            </div>
                        }
                        div={
                            <div className='flex flex-col'>
                                <div className='flex '>
                                    <p className='text-gray text-[14px] w-[80%]'>Body copy style for white text on dark or gradient backgrounds
                                        (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Mauris placerat euismod porttitor.
                                        Body copy style for white text on dark or gradient
                                        backgrounds (Medium Weight) Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit. Mauris placerat euismod.</p>
                                    <div>
                                        <CameraBox
                                            icon={
                                                <FiCamera size={20} color="#1C5C2E" />
                                            }
                                            text={
                                                <p>Upload & Drag <br /> From Here</p>
                                            } />
                                    </div>
                                </div>
                                <div className='border border-[#0069FF] px-4 py-2 rounded-[50px] h-[40px] mt-4 flex'>
                                    <FiLink color='#0069FF' size={20} />
                                    <p className='text-gray ml-5'>https://abc.com</p>
                                </div>
                            </div>
                        } />
                    <Box
                        absoluteDiv={
                            <div className='w-[120px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                                <p className='font-semibold '>Main Qoutation</p>
                            </div>
                        }
                        description={
                            <p className='text-gray w-[42%]'>
                                “There is a sun within every person; the you we call campanion.” – Thich Nhat Hahn  Hi, You"
                            </p>
                        } />

                    <Box
                        absoluteDiv={
                            <div className='w-[80px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                                <p className='font-semibold '>Heading</p>
                            </div>
                        }
                        subHeading="Lorem ipsum dolor sit"
                        line={
                            <div className='border border-t-1 border-[#1C5C2E] mt-4' />
                        }
                        div={
                            <div className='flex justify-between -mt-5 w-[100%]'>
                                <p className='text-gray text-[14px] w-[70%] m-2'>
                                    Body copy style for white text on dark or gradient
                                    backgrounds (Medium Weight) Lorem ipsum dolor sit
                                    amet, consectetur adipiscing elit. Mauris placerat
                                    euismod porttitor.
                                </p>
                                <div className='mt-[40px]'>
                                    <CameraBox
                                        icon={
                                            <FiVideo size={20} color="#1C5C2E" />
                                        }
                                        text={
                                            <p>Upload & Drag <br /> From Here</p>
                                        } />
                                </div>
                            </div>
                        }
                    />
                    <Box
                        absoluteDiv={
                            <div className='w-[130px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                                <p className='font-semibold '>Before Video Text</p>
                            </div>
                        }
                        subHeading="Lorem ipsum dolor sit"
                        line={
                            <div className='border border-t-1 border-[#1C5C2E] mt-4' />

                        }

                        div={
                            <div className='flex flex-col w-[100%]'>
                                <div className=' w-[90px]'>
                                    <CameraBox
                                        icon={<FiVideo size={20} color="#1C5C2E" />}
                                        text={<p>Upload & Drag <br /> From Here</p>} /></div>
                                <div className='w-[100%] flex mt-10'>
                                    <div className='border border-t-1 border-[#1C5C2E] relative mt- w-[100%]'>
                                        <div className='w-[80px] h-[40px] bg-[white] shadow-lg shadow-[#00000029]-500/50  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                                            <p className='font-semibold '>Heading 1</p>
                                        </div>
                                    </div>
                                </div>
                                <p className='mt-10'>Lorem ipsum dolor sit</p>
                                <div className='w-[100%] flex mt-10'>
                                    <div className='border border-t-1 border-[#1C5C2E] relative mt- w-[100%]'>
                                        <div className='w-[80px] h-[40px] bg-[white] shadow-lg shadow-[#00000029]-500/50  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                                            <p className='font-semibold '>Heading 2</p>
                                        </div>
                                    </div>
                                </div>
                                <p className='mt-10'>Lorem ipsum dolor sit</p>
                                <div className='w-[100%] flex mt-10'>
                                    <div className='border border-t-1 border-[#1C5C2E] relative mt- w-[100%]'>
                                    </div>
                                </div>
                                <p className='text-gray mt-5 text-[14px] w-[85%]'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo</p>
                            </div>

                        }
                    />
                    <Box
                        absoluteDiv={
                            <div className='w-[80px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                                <p className='font-semibold '>Teachers</p>
                            </div>
                        }
                        line={
                            <div className='border border-t-1 border-[#1C5C2E] mt-10' />
                        }
                        div={
                            <div className='w-[100%] flex flex-col'>
                                <div className='flex justify-between w-[100%]'>
                                    <input type="text" placeholder='Text' className='outline-none border-none -mt-10' />
                                    <CameraBox
                                        icon={<FiVideo size={20} color="#1C5C2E" />}
                                        text={<p>Upload & Drag <br /> From Here</p>} />
                                </div>
                                <div className='w-[100%] flex justify-end  mt-10'>
                                    <Button text="Button Text" border={`1px solid #1C5C2E`} borderRadius={18} width={180} />
                                </div>
                            </div>
                        }
                    />
                    <Box
                        absoluteDiv={
                            <div className='w-[250px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                                <p className='font-semibold '>Interested In Become Vibeguide?</p>
                            </div>
                        }
                        subHeading={
                            <p className='mt-5'>Heading</p>
                        }
                        line={
                            <div className='border border-t-1 border-[#1C5C2E] mt-10' />
                        }
                        div={
                            <div className='w-[100%] flex  justify-end  mt-10'>
                                <Button text="Button Text" border={`1px solid #1C5C2E`} borderRadius={18} width={180} />
                            </div>
                        } />

                </div>
                <div>
                    <img src={guides} alt="groundwork page" />
                </div>
            </div>
        </>
    )
}

export default ComunityGardenScreen