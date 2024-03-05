import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../../../components'

const MobilePages = () => {
    const screens = [
        { pageName: "Splash Screen", linkName: "SplashScreen", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Story Screen # 1", linkName: "StoryScreen1", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Story Screen # 2", linkName: "StoryScreen2", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Story Screen # 3", linkName: "StoryScreen3", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Story Screen # 4", linkName: "StoryScreen4", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Story Screen # 5", linkName: "StoryScreen5", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Profile", linkName: "Profile", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Tools", linkName: "Tools", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Groundwork", linkName: "Groundwork", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Garden", linkName: "Garden", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Welcome", linkName: "Welcome", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Tool Video Page", linkName: "ToolVideoPage", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Groundwork Video Page", linkName: "GroundworkVideoPage", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Character Selection Screen", linkName: "CharacterSelectionScreen", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Bloom Selection Screen", linkName: "BloomSelectionScreen", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Initial Bloom Screen", linkName: "InitialBloomSelection", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Bloom Confrimation Screen", linkName: "BloomConfirmationScreen", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Search", linkName: "Search", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Select Your Resonance",linkName : "SelectResonance" ,btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Resonance Finder Results page", linkName: "ResonanceFinderResultspage", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} /> },
        { pageName: "Settings", linkName: "Settings", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Manage Subscriptions", linkName: "ManageSubscriptions", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Contact Us", linkName: "ContactUs", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Privacy policy", linkName: "PrivacyPolicy", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Terms Of Use", linkName: "TermsOfUse", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Email Notifications", linkName: "EmailNotifications", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Push Notifications", linkName: "PushNotifications", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Bloom Check screen", linkName: "BloomCheckScreen", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Big Blooms 2 Petals", linkName: "BigBlooms2Petals", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Big Blooms 4 Petals", linkName: "BigBlooms4Petals", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Big Blooms 6 Petals", linkName: "BigBlooms6Petals", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
        { pageName: "Big Blooms 8 Petals", linkName: "BigBlooms8Petals", btn: <Button text="Edit" bgColor="#0069FF" color="#fff" borderRadius={10} width={80} /> },
    ]
    
    return (
        <>
            <div className='bg-[#F7F9F8] shadow-lg shadow-[#00000029]-500/50 w-[95%] mx-5'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4'>
                    {screens.map((val, ind) => (
                        <div className='bg-[#FFE1EA] space-x- rounded-lg w-[250px] h-[125px] px-4 py-4'>
                            <div className='w-[200px] h-[50px]'>
                                <p className='text-[#EF3A71] font-bold text-[20px]'>{val.pageName}</p>
                            </div>
                            <div>
                                <NavLink to={`/${val.linkName}`}>  <span className='flex justify-end items-end'>{val.btn}</span></NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MobilePages