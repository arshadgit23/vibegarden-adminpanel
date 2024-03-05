import React, { useState } from 'react'
import "../feedBackSystem/style.css"
import MobilePages from './mobilePages/MobilePages';
import WebPages from './webPages/WebPages';
const Pages = () => {
    const [ToggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    };
  
    const getActiveClass = (index, className) =>
      ToggleState === index ? className : "";
  
    return (
      <>
      <div className="tab-container">
        <ul className="tab-list">
          <li
            className={`tabs ${getActiveClass(1, "active-tabs1")}`}
            onClick={() => toggleTab(1)}
          >
            Website Pages
          </li>
          <li
            className={`tabs ${getActiveClass(2, "active-tabs2")}`}
            onClick={() => toggleTab(2)}
          >
            Mobile Pages
          </li>
        </ul>
      </div>
        <div className="w-100">
          <div className={`content ${getActiveClass(1, "active-content")}`}>
            <WebPages />
          </div>
          <div className={`content ${getActiveClass(2, "active-content")}`}>
          <MobilePages />
            
          </div>
        </div>
        </>
  
    );
}

export default Pages