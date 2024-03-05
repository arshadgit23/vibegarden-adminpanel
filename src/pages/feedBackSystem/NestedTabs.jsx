import React, { useState, useEffect } from "react";
import "./style.css";
import Table from "./Table";
import apicall from "../../assets/api/axios";
import Loader from "../../components/Loader";

const NestedTabs = ({ name, deviceTabs }) => {
  const [ToggleState, setToggleState] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState({
    allCount: 0,
    approvedCount: 0,
    pendingCount: 0,
    trashCount: 0,
  });
  const [updatedStatus, setUpdatedStatus] = useState("");

  //   useEffect(() => {
  //     const getComments = async () => {
  //       try {
  //         setLoading(true);
  //         const response = await apicall.get(
  //           `/comment/admin/all?status=${ToggleState}&commentType=${deviceTabs}`
  //         );
  //         setComments(response.data.data);
  //       } catch (error) {
  //         setError(
  //           error?.response?.data?.message
  //             ? error?.response?.data?.message
  //             : error.message
  //         );
  //         setLoading(false);
  //       }
  //     };
  //     getComments();
  //     setLoading(false);
  //   }, [ToggleState, deviceTabs, updatedStatus]);

  const getComments = async () => {
    try {
      setLoading(true);
      const response = await apicall.get(
        `/comment/admin/all?status=${ToggleState}&commentType=${deviceTabs}`
      );
      setCommentCount({
        allCount: response?.data?.allCount,
        approvedCount: response?.data?.approvedCount,
        pendingCount: response?.data?.pendingCount,
        trashCount: response?.data?.trashCount,
      });
      setComments(response.data.data);
    } catch (error) {
      setError(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComments();
  }, [ToggleState, deviceTabs, updatedStatus]);

  const commentUpdateCallback = () => {
    getComments();
  };

  const statusUpdateHandler = async (data) => {
    try {
      setLoading(true);
      const response = await apicall.patch(`/comment/${data?.id}`, {
        status: data?.status,
      });

      setUpdatedStatus(response?.data?.data);
    } catch (error) {
      setLoading(false);
      setError(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message
      );
    }
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";

  return (
    <>
      <div className="tabs-container">
        <ul className="tabs-list">
          <li className="tabss" onClick={() => toggleTab("all")}>
            <p
              className={` ${getActiveClass("all", "active")}`}
            >{`All (${commentCount?.allCount})`}</p>
          </li>
          <li className={`tabss`} onClick={() => toggleTab("pending")}>
            <p
              className={` ${getActiveClass("pending", "active")}`}
            >{`Pending (${commentCount?.pendingCount})`}</p>
          </li>
          <li className={`tabss`} onClick={() => toggleTab("approved")}>
            <p
              className={` ${getActiveClass("approved", "active")}`}
            >{`Approved (${commentCount?.approvedCount})`}</p>
          </li>
          <li className={`tabss`} onClick={() => toggleTab("trash")}>
            <p
              className={` ${getActiveClass("trash", "active")}`}
            >{`Trash (${commentCount?.trashCount})`}</p>
          </li>
        </ul>
      </div>
      <div className="w-100">
        <div className={`content active-content`}>
          {error && <p className="text-red-900 text-14 text-center">{error}</p>}
          {loading ? (
            <Loader />
          ) : (
            <Table
              onStatusUpdate={statusUpdateHandler}
              data={comments}
              name="John"
              status="Approve"
              trash="Trash"
              commentUpdateCallback={commentUpdateCallback}
            />
          )}
        </div>
        {/* <div className={`content ${getActiveClass('pending', "active-content")}`}>
                    <Table name="Annaa" status="Approve" trash="Trash"/>

                </div>
                <div className={`content ${getActiveClass('approved', "active-content")}`}>
                    <Table name="Harry" status="Unapprove" trash="Trash"/>

                </div>
                <div className={`content ${getActiveClass('trash', "active-content")}`}>
                    <Table name="Liza" status="Restore" trash="Delete"/>

                </div> */}
      </div>
    </>
  );
};

export default NestedTabs;
