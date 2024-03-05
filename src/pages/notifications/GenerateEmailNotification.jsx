import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import BackButton from '../../components/BackButton'

const GenerateEmailNotification = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/notification")
    }
    const handleClickNext = () => {
        navigate("/sendNotification")
    }
    return (
        <>
            <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[90%] h-[500px] rounded-[20px] m-10 overflow-y-auto mb-10">
            <div className='flex flex-row justify-between px-4 py-3'>
                <div className='m-2 '>
                    <h1 className='font-medium text-[#1C5C2E] text-[24px] px-5 py-' style={{ marginTop: 20 }}>Generate Notifications</h1>
                    <div className='mt-5 px-5'>
                        <label class="inline-flex items-center">
                            <input type="radio" class="form-radio border-2 text-[#1C5C2E]" name="radio-colors" value="1" checked />
                            <span class="ml-2 font-semibold">Tools Recommendations</span>
                        </label>
                    </div>
                    <div className='mt-5 px-5'>
                        <label class="inline-flex items-center">
                            <input type="radio" class="form-radio border-2 text-[#1C5C2E]" name="radio-colors" value="1" />
                            <span class="ml-2 font-semibold">Vibeguide Updates</span>
                        </label>
                    </div>
                    <div className='mt-5 px-5'>
                        <label class="inline-flex items-center">
                            <input type="radio" class="form-radio border-2 text-[#1C5C2E]" name="radio-colors" value="1" />
                            <span class="ml-2 font-semibold">Surveys</span>
                        </label>
                    </div>
                    <div className='mt-[200px] ml-5' onClick={() => handleClickNext()}>
                        <Button text="Continue" bgColor="#359D9E" borderRadius={10} color="white" width={150} />
                    </div>
                </div>
                <div onClick={() => handleClick()}><BackButton /></div>
                </div>
            </div>
        </>
    )
}

export default GenerateEmailNotification