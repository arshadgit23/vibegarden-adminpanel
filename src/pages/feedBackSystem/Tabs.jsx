import React, { useState } from "react";
import NestedTabs from "./NestedTabs";
// import ReactDOM from "https://cdn.skypack.dev/react-dom";
import "./style.css";
import Table from "./Table";
import { useEffect } from "react";

const Tabs = (props) => {
  const [ToggleState, setToggleState] = useState("website");

  useEffect(() => {
    props.onToggle(ToggleState);
  }, [ToggleState]);

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
            className={`tabs ${getActiveClass("website", "active-tabs1")}`}
            onClick={() => toggleTab("website")}
          >
            Website Comments
          </li>
          <li
            className={`tabs ${getActiveClass("mobile", "active-tabs2")}`}
            onClick={() => toggleTab("mobile")}
          >
            Mobile Comments
          </li>
        </ul>
      </div>
      <div className="w-100">
        <div className={`content ${getActiveClass(1, "active-content")}`}>
          {/* <Table /> */}
        </div>
        <div className={`content ${getActiveClass(2, "active-content")}`}>
          {/* <Table /> */}
        </div>
      </div>
    </>
  );
};

export default Tabs;
