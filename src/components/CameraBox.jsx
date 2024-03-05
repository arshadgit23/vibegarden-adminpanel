import React from 'react'
import { FiCamera } from 'react-icons/fi'

const CameraBox = ({icon, text}) => {
    return (
        <div className='px-2   border border-[#00000029] rounded-lg space-y-1 flex flex-col justify-center items-center'>
            {icon}
            <p className='text-[10px] text-center'>{text}</p>
        </div>
    )
}

export default CameraBox