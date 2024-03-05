import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../../../components'

const WebPages = () => {
    const screens = [
        {
            title: "Logged Out Pages",
            links: [
                { pageName: "Home Page", linkName: "HomePage"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Ground Work",  linkName: "GroundWorks"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Tools",  linkName: "ToolsWeb"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Guides", linkName: "Guides"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Community Garden", linkName: "CommunityGarden"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
            ]
        },
        {
            title: "Logged In Pages",
            links: [
                { pageName: "Home Page", linkName: "HomePage"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Ground Work", linkName: "GroundWorks"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Tools",  linkName: "Tools"  ,btn:  <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Guides", linkName: "Guides"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Community Garden", linkName: "CommunityGarden"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Fresh Blooms", linkName: "FreshBloomsScreen"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Teacher", linkName: "TeacherScreen"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Select Avatar", linkName: "SelectAvatar"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Select Blooms", linkName: "SelectBlooms"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Blooms Check", linkName: "BloomsCheck"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Blooms Result ", linkName: "BloomsResult"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Signup", linkName: "SignupScreen"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Search Result", linkName: "SearchResult"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Resonance Result", linkName: "ResonanceResult"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Appointment Schedule Page", linkName: "AppointmentSchedulePage"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Footer Screen", linkName: "FooterScreen"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "GroundWork Inner Page", linkName: "GroundWorkInnerPage"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
                { pageName: "Tool Inner Page", linkName: "ToolInnerPage"  , btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
            ]
        }
    ]
    return (
        <>
            <div className='bg-[#F7F9F8] shadow-lg shadow-[#00000029]-500/50 w-[95%] mx-5'>
                {screens.map((item) => (
                    <>
                        <div className='mx-5 my-10'> <p className='text-[#359D9E] font-semibold text-[20px]'>{item.title}</p></div>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4'>
                            {item.links.map((val, ind) => (
                                <div className='bg-[#E5ECE7] space-x- rounded-lg w-[250px] h-[125px] px-4 py-4'>
                                    <div className='w-[200px] h-[50px]'>
                                        <p className='text-[#1C5C2E] font-bold text-[20px]'>{val.pageName}</p>
                                    </div>
                                    <div>
                                        <NavLink to={`/${val.linkName}`}>  <span className='flex justify-end items-end'>{val.btn}</span></NavLink>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default WebPages