import React from 'react'
import { FiImage, FiVideo , FiLink} from 'react-icons/fi';
import { HiPlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import roundImg from "../../assets/images/profileImg.png";
import { BsArrowLeft } from 'react-icons/bs';

const EditVideoDetail = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/videoDetail")
    }
    return (
        <>
            <div className="mt-10 flex justify-between mx-10">
               
                <div className='flex ml-5' onClick={() => handleClick()}>
                    <BsArrowLeft color="#0069FF" size={25} style={{ marginTop: 12 }} />
                    <Button
                        text="Back"
                        color="#0069FF"
                        borderRadius="10px"
                        height="20px"
                    // width="150px"
                    />
                </div>
            </div>
            <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[90%]  rounded-[20px] m-10 overflow-y-auto mb-10">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <div class=" bg-[] w-[]">
                        <h1 className='font-medium text-[#1C5C2E] text-[24px] m-5 mt-5'>Edit Video Details</h1>
                        <input type="text" placeholder='Title' className='px-4 py-3 rounded focus:outline-none '
                            style={{ width: "80%", height: 50, border: " 1px solid grey", borderRadius: 5, marginLeft: 20, marginTop: 20 }} />

                        <select id=""
                            class="form-select px-4 py-3 rounded text-[gray] focus:outline-none " placeholder='Category'
                            style={{ width: "80%", height: 50, border: " 1px solid grey", borderRadius: 5, marginLeft: 20, marginTop: 30 }}>
                            <option selected>Category</option>
                            <input type="checkbox" />
                            <option value="US">Essents</option>
                            <option value="CA">Build Blocks</option>
                            <option value="FR">Deep Dives</option>
                        </select>

                        <textarea placeholder='Description' className='px-4 py-3 rounded focus:outline-none  resize-y rounded-md'
                            style={{ width: "80%", height: 150, border: " 1px solid grey", borderRadius: 5, marginLeft: 20, marginTop: 30 }}></textarea>
                        <input type="text" placeholder='Add Tags & Topic' className='px-4 py-3 rounded focus:outline-none '
                            style={{ width: "80%", height: 50, border: " 1px solid grey", borderRadius: 5, marginLeft: 20, marginTop: 30 }} />
                        <div className='px-4 py-3 '
                            style={{ width: "80%", height: 115, border: " 1px solid grey", borderRadius: 5, marginLeft: 20, marginTop: 30 }}>
                            <p className='text-[gray]'>Related Content</p>
                            <div className='w-[60px] h-[60px] bg-[#E5ECE7] rounded-lg mt-[5px]'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <FiVideo color='#1C5C2E' size={25} />
                                <p className='text-[#1C5C2E] font-medium text-[12px]'>Add</p>
                            </div>
                        </div>

                        <div className='px-4 py-3 rounded focus:outline-none  resize-y rounded-md'
                            style={{ width: "80%", border: " 1px solid grey", borderRadius: 5, marginLeft: 20, marginTop: 30 }} >
                            <p className='text-[gray]'>Additional Resources</p>
                            <div className='flex justify-between mt-[5px]'>
                                <p className='text-[#1C5C2E] font-medium text-[16px]'>Title</p>
                                <p className='flex flex-row text-[#1C5C2E] font-medium text-[16px]'>< FiLink color='#1C5C2E' size={20} style={{ marginLeft: 5 }} /> Link</p>
                            </div>
                            <p className='text-[gray] text-[12px] md:text-[14px] mt-[10px]'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                            </p>
                        </div>
                        <div className='md:flex m-10 space-x-4'>
                            <div onClick={() => handleClick()}>
                                <Button
                                    text="Update"
                                    bgColor="#359D9E"
                                    color="#fff"
                                    borderRadius="10px"
                                    height="50px"
                                    width="150px"
                                /></div>
                            <Button text="Cancle" bgColor="white" shadow={`1px 2px 9px #00000029`} color="#EF3A71" width={150} borderRadius={10} />
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-around mt-5 bg-[]">
                            <div className='w-[220px] h-[220px] rounded-lg bg-[#E5ECE7]'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <div className='w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]'
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <FiImage color='#1C5C2E' size={40} />
                                </div>
                                <p className='text-[gray] text-[14px] text-center mt-5'><span className='underline text-[#1C5C2E] font-medium '> Upload </span> or Drag Thumbnail <br /> Image Here</p>
                            </div>
                            <div className='w-[220px] h-[220px] rounded-lg bg-[#E5ECE7]'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <div className='w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]'
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: -15 }}>
                                    <FiVideo color='#1C5C2E' size={40} />
                                </div>
                                <p className='text-[gray] text-[14px] text-center mt-5'>
                                    <span className='underline text-[#1C5C2E] font-medium '> Upload </span> or Drag Video Here</p>
                            </div>
                        </div>
                        <div className='w-[470px] h-[580px] border-solid border border-[gray] rounded-lg px-4 py-3 mt-5 ml-[18px]'>
                            <p className='text-[#1C5C2E] font-medium text-[20px] px-4 py-3'>Add Suggested Teachers</p>
                            <div className='flex flex-row'>
                                <input type="checkbox" className='ml-5 bg-[#1C5C2E]' />
                                <div className='flex w-[380px] h-[100px] bg-[white] shadow-lg shadow-[#00000029]-500/50 rounded-lg ml-5 px-4 py-5'>
                                    <img src={roundImg} alt="img" className='rounded-full mt-[10px]' width="50" height="50" />
                                    <span className='ml-5 mt-5 font-bold'>Alexa</span>
                                    <p className='text-[#0069FF]  mt-10 text-[14px] flex px-10'><HiPlusCircle size={20} /> Edit Notes & Links</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditVideoDetail