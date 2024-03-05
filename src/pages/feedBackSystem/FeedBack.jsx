import React from 'react'
import Tabs from './Tabs'
import Table from './Table'
import NestedTabs from './NestedTabs'
import { useState} from 'react'
const FeedBack = () => {
    const [deviceTabs, setDeviceTabs] = useState('');
    
    
    const deviceTabHandler = (tab) => {
        setDeviceTabs(tab);
    }
    
    return (
        <>
            <Tabs onToggle={deviceTabHandler} />
            <NestedTabs deviceTabs={deviceTabs} />
        </>
    )
}

export default FeedBack