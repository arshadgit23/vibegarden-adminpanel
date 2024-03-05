import React from 'react'
import Button from './Button'
import { FiCamera } from 'react-icons/fi'

const Box = ({
    icon,
    bgColor,
    color,
    bgHoverColor,
    size,
    heading,
    borderRadius,
    width,
    height,
    outLine,
    description,
    image,
    subHeading,
    btnTxt,
    line,
    img_button,
    inputBtn,
    div,
    inputBtn2,
    display,
    justify,
    center,
    text,
    absoluteDiv,
    div2,
    line2
}) => {
    return (
        <div className='w-[95%]  bg-[] border border-[#1C5C2E] rounded-[25px] relative '
        style={{display , justifyContent: justify , alignItems: center}}>
            {absoluteDiv}
            {/* <div className='w-[120px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center '>
                <p className='font-semibold '>{heading}</p>
            </div> */}
          
            <p className='mt-5 font-semibold text-[14px] ml-5'>{subHeading}</p>

            {line}
            {text}
            {line2}

            <p className='mt-5 text-[#979B9F]  text-[14px] ml-5'>{description}</p>
            <div className='md:flex justify-between m-5 mt-10'>
                {img_button}
                {div}
                {div2}
                {inputBtn}
                {inputBtn2}
            </div>

        </div>
    )
}

export default Box