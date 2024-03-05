import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import roundImg from "../../assets/images/profileImg.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import apicall from "../../assets/api/axios";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

const VibeGuides = () => {
  const [loading, setLoading] = useState(false);
  const [overlayOptions, setOverlayOptions] = useState("");
  const [options, setOptions] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [vibeGuides, setVibeguides] = useState([]);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [menuId, setMenuId] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const getVibeguides = async () => {
      try {
        setLoading(true);
        const response = await apicall.get("/users?role=vibe-guide", {
          params: { search: filterTerm },
        });
        setVibeguides(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error.message
        );
        setLoading(false);
      }
    };
    getVibeguides();
  }, [reload, filterTerm]);

  const handleClick = () => {
    navigate("/addVibeGuide");
  };

  const deleteTeacher = async (id) => {
    setLoading(true);
    try {
      const response = await apicall.delete(`users/delete-vibe-guide/${id}`);
      setReload(!reload);
      setConfirm(false);
      setLoading(false);
    } catch (error) {
      setError(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message
      );
      setLoading(false);
    }
  };

  const handleMenuClick = (id) => {
    setMenuId(id);
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="bg-[#F7F9F8] shadow-lg shadow-[#00000029]-500/50 w-[90%] h-[500px] rounded-[20px] m-10 overflow-y-auto mb-10">
        <div className="md:flex justify-between m-10 flex-wrap items-center">
          <h1
            className="font-medium text-[] text-[24px] "
            style={{ marginTop: 10 }}
          >
            VibeGarden Vibe Guides
          </h1>
          <div className="flex justify-between flex-wrap gap-4">
            <input
              type="text"
              value={filterTerm}
              placeholder="Search here"
              className="rounded bg-[#E5ECE7] md:w-[20rem] w-[90%] h-[50px] font-[14px] focus:outline-none px-5 "
              onChange={(e) => setFilterTerm(e.target.value)}
            />
            <div onClick={() => handleClick()}>
              <Button
                text="+ Add Vibe Guide"
                color="white"
                bgColor="#359D9E"
                width={200}
                borderRadius={10}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="ml-3">
            <Loader />
          </div>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : vibeGuides.length === 0 ? (
          <h1 className="ml-10">No Vibe Guide Found</h1>
        ) : (
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 m-10">
            {vibeGuides?.map((val, ind) => (
              <div
                key={ind}
                className="relative bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[95%] h-[200px] rounded-[20px]  overflow-y-auto mb-5"
              >
                <div className="flex flex-row justify-between">
                  <div className="flex items-center justify-center gap-5">
                    <div className="flex m-5">
                      <img
                        src={`https://vibe-garden-development.s3.ap-south-1.amazonaws.com/${val?.photo}`}
                        alt="image"
                        className="rounded-full w-[70px] h-[70px]"
                      />
                      <p className="font-semibold text-[16px] mt-5 ml-5">
                        {val?.vibeGuideName}
                      </p>
                    </div>
                    <div
                      onClick={() => navigate(`/schedulings/${val?._id}`)}
                      style={{
                        color: "#1C5C2E",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      <p>My Scheduling</p>
                    </div>
                  </div>
                  <div className="flex m-5">
                    <p className="font-semibold text-[14px] text-[#0069FF] underline mt-5 ml-2">
                      {val.number}
                    </p>
                    <p className="font-semibold text-[14px] text-[#1C5C2E] underline mt-5 ml-5">
                      {val.schedule}
                    </p>

                    {/* <div
                    className=" relative cursor-pointer "
                    onClick={() => {
                      setOverlayOptions(val.id);
                      setOptions(!options);
                    }}
                  >
                    <BsThreeDotsVertical
                      size={20}
                      color="#4D4D4D"
                      className="ml-2"
                    />
                  </div> */}

                    <div
                      onClick={() => handleMenuClick(val.id)}
                      className="relative cursor-pointer"
                    >
                      <BsThreeDotsVertical size="20" />
                      {val.id === menuId && showMenu ? (
                        <div className="w-[132px] h-[92px] bg-[#FFFFFF] shadow-lg rounded-lg absolute right-1 top-30 flex flex-col justify-center pl-2">
                          <p
                            onClick={() =>
                              navigate(`/edit-vibeguide/${val?.id}`)
                            }
                          >
                            Update
                          </p>
                          <p
                            onClick={() => {
                              setConfirm(!confirm);
                              setOverlayOptions(val?.id);
                            }}
                          >
                            Remove
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <p className="text-[#4D4D4D] text-[12px] px-4 py-3">
                  {val?.description}
                </p>

                {overlayOptions === val.id && options && (
                  <div
                    className=" absolute backdrop-blur-sm h-full w-full p-2 shadow-xl top-0 left-0 flex justify-center items-center rounded-xl"
                    onClick={() => setOptions(!options)}
                  >
                    <button
                      className=" bg-red-500 py-2 px-4 rounded-md mx-1"
                      onClick={() => setConfirm(!confirm)}
                    >
                      Delete
                    </button>
                    <button
                      className="py-2 px-4 rounded-md w-[25%] mx-1"
                      style={{ background: "#55C595", color: "#fff" }}
                      onClick={() => navigate(`/edit-vibeguide/${val?.id}`)}
                    >
                      Edit
                    </button>
                  </div>
                )}

                {overlayOptions === val.id && confirm && (
                  <div className=" absolute top-0 left-0 h-full w-full backdrop-blur-lg flex flex-col justify-center items-center rounded-xl ">
                    <h1 className=" my-5">Delete Confirm?</h1>
                    <div className=" flex">
                      <button
                        className=" bg-amber-500 py-2 px-4 rounded-md mx-2"
                        onClick={() => deleteTeacher(val.id)}
                      >
                        Yes
                      </button>
                      <button
                        className=" bg-teal-500 py-2 px-4 rounded-md"
                        onClick={() => setConfirm(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VibeGuides;
