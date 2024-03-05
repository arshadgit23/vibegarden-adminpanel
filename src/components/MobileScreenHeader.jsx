import React from 'react'

const MobileScreenHeader = ({ heading, btn, horizontalLine  , text}) => {
    return (
        <>
            <div className='flex flex-row m-10'>
                <p className='text-[#1C5C2E] font-medium  text-[18px]'>{heading}</p>
                {horizontalLine}
                {text}
                <div className='text-[#1C5C2E] font-semibold text-lg -mt-[5px]'>{btn}</div>
            </div>

        </>
    )
}

export default MobileScreenHeader