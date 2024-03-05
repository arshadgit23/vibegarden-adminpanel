import React, { useState, useEffect } from "react";
import { BsFillChatLeftFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ModalComponent from "./Modal";
import "./style.css";
import Modal from "react-overlays/Modal";
// import { Modal } from "react-modal-overlay";
// import "react-modal-overlay/dist/index.css";
import { Button } from "../../components";
import moment from "moment/moment";
import apicall from "../../assets/api/axios";
import Loader from "../../components/Loader";

const Table = ({
  name,
  trash,
  data,
  onStatusUpdate,
  commentUpdateCallback,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showData, setShowData] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");
  const [showFullComment, setShowFullComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  var handleClose = () => setShowModal(false);

  const updateCommentHandler = async () => {
    try {
      setLoading(true);
      const response = await apicall.patch(`/comment/${showData._id}`, {
        comment: updatedComment,
      });
      if (response?.data?.data) {
        setShowModal(false);
        setLoading(false);
        commentUpdateCallback();
      }
    } catch (error) {
      setLoading(false);
      setError(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message
      );
    }
  };

  const renderBackdrop = (props) => <div className="backdrop" {...props} />;
  const navigate = useNavigate();
  const handleVideoDetail = () => {
    navigate("/videoDetail");
  };

  const statusUpdateHandler = async (e) => {
    const id = e.target.id;
    const status = e.target.innerHTML.trim();

    onStatusUpdate({ id, status });
  };

  const comments = data?.map((comment) => ({
    ...comment,
    rating: () => {
      const ratings = [];

      for (let i = 0; i < comment?.rating; i++) {
        ratings.push(i);
      }
      return ratings;
    },
    status:
      comment?.status === "pending"
        ? { commentStatus: "approved", isTrash: "trash" }
        : comment?.status === "approved"
        ? { commentStatus: "unapproved", isTrash: "trash" }
        : comment?.status === "trash"
        ? { commentStatus: "restore", isTrash: "delete" }
        : { commentStatus: "", isTrash: "" },
  }));

  const ShowFullCommentModal = (
    <Modal
      style={{
        position: "absolute",
        top: "50%",
        left: " 50%",
        transform: "translate(-50%, -50%)",
        minWidth: "50vw",
      }}
      className="modal overflow-auto p-3"
      show={showFullComment}
      onHide={() => setShowFullComment(false)}
      renderBackdrop={renderBackdrop}
    >
      <div className="flex flex-col gap-4 mx-4">
        <h1>asdsadsads</h1>
      </div>
    </Modal>
  );
  return (
    <div>
      {/* {ShowFullCommentModal} */}
      <div class="container mx-auto px-4 sm:px-8">
        <div class="py-8">
          <div>
            <h2 class="text-2xl text-[#1C5C2E] font-semibold leading-tight">
              Comments
            </h2>
          </div>

          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow-md  overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr className="bg-[#E5ECE7]">
                    <th class="px-3 py-3   text-left text-sm font-semibold capitalize tracking-wider">
                      Name
                    </th>
                    <th class="px-3 py-3   text-left text-sm font-semibold capitalize tracking-wider">
                      Rating
                    </th>
                    <th class="px-3 py-3   text-left text-sm font-semibold capitalize tracking-wider"></th>
                    <th class="px-3 py-3   text-left text-sm font-semibold capitalize tracking-wider">
                      Video
                    </th>
                    {/* <th class="px-3 py-3   text-left text-sm font-semibold capitalize tracking-wider">
                      Comment
                    </th> */}
                    <th class="px-3 py-3   text-left text-sm font-semibold capitalize tracking-wider">
                      Submitted on
                    </th>

                    <th class="px-3 py-3   text-left text-sm font-semibold capitalize tracking-wider">
                      {/* Billing Date */}
                    </th>
                    <th class="px-3 py-3   text-left text-sm font-semibold capitalize tracking-wider">
                      {/* Status */}
                    </th>
                    <th class="px-3 py-3   text-left text-sm font-semibold capitalize tracking-wider">
                      {/* Action */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comments?.map((commentData, i) => (
                    <tr>
                      <td key={i} class="px-5 py-5   bg-white text-sm">
                        <p class=" font-semibold whitespace-no-wrap">
                          {commentData?.user?.firstName}
                        </p>
                      </td>
                      {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p class="text-gray-900 whitespace-no-wrap"></p>

                                        </td> */}
                      <td class="px-5 py-5  bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          <div class="flex items-center">
                            {commentData?.rating()?.map((rate) => (
                              <svg
                                key={rate}
                                class="w-5 h-5 text-[#FFC300]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}

                            <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                              {" "}
                              {commentData?.rating()?.length}
                            </p>
                          </div>
                        </p>
                      </td>
                      <td class="px-5 py-5  bg-white text-sm">
                        <p className=" text-[#1C5C2E] font-semibold flex items-center">
                          <span
                            onClick={statusUpdateHandler}
                            id={commentData?._id}
                            className="cursor-pointer"
                          >
                            {commentData?.status?.commentStatus}
                          </span>
                          <div className=" h-[20px] border-r flex px-2"></div>
                          <span
                            onClick={statusUpdateHandler}
                            id={commentData?._id}
                            className="flex px-4 text-gray-700"
                          >
                            {" "}
                            {commentData?.status?.isTrash}{" "}
                          </span>
                        </p>
                      </td>
                      <td class="px-5 py-5  bg-white text-sm flex">
                        <p className="cursor-pointer  text-[#0069FF] font-semibold  flex items-center">
                          {commentData?.video?.title}{" "}
                        </p>
                        <span className="px-2 cursor-pointer">
                          <BsFillChatLeftFill
                            color="#979B9F"
                            size={20}
                            onClick={() => {
                              setShowModal(true);
                              setShowData(commentData);
                              setUpdatedComment(commentData?.comment);
                            }}
                          />
                        </span>
                      </td>

                      {/* <td class="px-5 py-5  bg-white text-sm relative">
                        <p className="text-[#4D4D4D] whitespace-no-wrap">
                          {commentData?.comment?.length < 20 ? (
                            commentData?.comment
                          ) : (
                            <>
                              {commentData?.comment?.slice(0, 12)}
                              <div className="cursor-pointer">
                                <p onClick={() => setShowFullComment(true)}>
                                  see more
                                </p>
                                {showFullComment && (
                                  <Modal
                                    style={{
                                      position: "absolute",
                                      top: "50%",
                                      left: " 50%",
                                      transform: "translate(-50%, -50%)",
                                      maxWidth: "30vw",
                                      maxHeight: "30vh",
                                    }}
                                    className="modal overflow-auto p-3"
                                    show={showFullComment}
                                    onHide={() => setShowFullComment(false)}
                                    renderBackdrop={renderBackdrop}
                                  >
                                    <div className="flex flex-col gap-4 mx-4">
                                      <h1>Comment</h1>
                                      <p className="text-[#4D4D4D] whitespace-no-wrap">
                                        {commentData?.comment}
                                      </p>
                                    </div>
                                  </Modal>
                                )}
                              </div>
                            </>
                          )}
                        </p>
                      </td> */}

                      <td class="px-5 py-5  bg-white text-sm ">
                        <p className=" text-[#4D4D4D] whitespace-no-wrap">
                          {moment(commentData?.createdAt).format("M/D/YYYY")}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="modal"
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        <div>
          <div className="modal-header">
            <div className="text-2xl text-[#1C5C2E] font-semibold leading-tight m-5">{`${
              showData && showData?.user?.firstName
            } ${
              showData && showData?.user?.lastName
                ? showData?.user?.lastName
                : ""
            } Comment`}</div>
          </div>
          <div className="modal-desc">
            <p className="font-bold m-5 -mt-2">Name</p>
            <p className="font-medium ml-5 -mt-2">
              {showData && showData?.user?.firstName}
            </p>
            <p className="font-bold m-5 ">Rating</p>
            <div class="flex items-center m-5">
              {showData &&
                showData?.rating()?.map((rate) => (
                  <svg
                    key={rate}
                    class="w-5 h-5 text-[#FFC300]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}

              <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {" "}
                {showData && showData?.rating()?.length}
              </p>
            </div>
            <p className="font-bold m-5 -mt-2">Comment</p>
            {/* <div className="w-[550px] h-[100px] bg-[white] shadow-lg shadow-[#00000029]-500/50 flex flex-center ml-5 pl-1 rounded-lg">
              <p className="text-[14px] text-center mt-2">
                {showData && showData?.comment}
              </p>
            </div> */}

            <textarea
              onChange={(e) => setUpdatedComment(e.target.value)}
              value={showData && updatedComment}
              className="w-[90%] h-[100px] bg-[white] shadow-lg shadow-[#00000029]-500/50 flex flex-center ml-5 p-3 pl-1 rounded-lg"
            ></textarea>
          </div>

          <div className="modal-footer" onClick={updateCommentHandler}>
            <Button
              text={loading ? <Loader /> : "Update"}
              bgColor="#359D9E"
              color="#fff"
              borderRadius={10}
              width={150}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Table;
