import React, { useEffect, useState } from "react";
import { Button } from "../../components";
import ButtonsHeader from "../../components/ButtonsHeader";
import roundImg from "../../assets/images/profileImg.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import apicall from "../../assets/api/axios";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

const Teacher = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [overlayOptions, setOverlayOptions] = useState("");
  const [options, setOptions] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [menuId, setMenuId] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const getTeachers = async () => {
      try {
        setLoading(true);
        const response = await apicall.get("/users?role=teacher", {
          params: { search: filterTerm },
        });
        setTeachers(response.data.data);
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
    getTeachers();
  }, [reload, filterTerm]);

  const deleteTeacher = async (id) => {
    try {
      setLoading(true);
      const response = await apicall.delete(`users/delete-teacher/${id}`);
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
    <Container
      addButton={true}
      addButtonText={"+ Add More"}
      addButtonLink={"/addTeacher"}
      // isLoading={loading}
      // error={error}
    >
      <div className="flex justify-between flex-wrap">
        <SectionTitle>Teachers</SectionTitle>
        <input
          type="text"
          value={filterTerm}
          placeholder="Search here"
          className="rounded bg-[#E5ECE7] md:w-[32rem] w-[90%] h-[50px] font-[14px] focus:outline-none px-5 "
          onChange={(e) => setFilterTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : teachers.length === 0 ? (
        <h1>No Teacher Found</h1>
      ) : (
        <div class=" flex flex-wrap gap-2 px-6">
          {teachers.map((val) => (
            <div
              key={val.id}
              class="bg-[white] w-80 shadow-xl rounded-xl px-10 py-6 relative "
            >
              <div className="w-full flex justify-between items-center ">
                <div className="flex items-center ">
                  <img
                    src={`https://vibe-garden-development.s3.ap-south-1.amazonaws.com/${val.photo}`}
                    alt="teacherImg"
                    className="rounded-full h-20 w-20 object-contain"
                  />
                  <p className="ml-5  font-medium text-xl capitalize">
                    {val.teacherName}
                  </p>
                </div>
                {/* <div
                className=" relative cursor-pointer "
                onClick={() => {
                  setOverlayOptions(val.id);
                  setOptions(!options);
                }}
              >
                <BsThreeDotsVertical size="20" />
              </div> */}

                <div
                  onClick={() => handleMenuClick(val.id)}
                  className="relative cursor-pointer"
                >
                  <BsThreeDotsVertical size="20" />
                  {val.id === menuId && showMenu ? (
                    <div className="w-[132px] h-[92px] bg-[#FFFFFF] shadow-lg rounded-lg absolute right-1 top-30 flex flex-col justify-center pl-2">
                      <p onClick={() => navigate(`/edit-teacher/${val?.id}`)}>
                        Update Profile
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
              <p className="  my-3 text-xl text-gray">{val.description}</p>
              <Link
                to={val.link}
                className=" break-all mt-5 w-full text-md text-[#0069FF]"
              >
                {val.link}
              </Link>
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
                    onClick={() => navigate(`/edit-teacher/${val?.id}`)}
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
    </Container>
  );
};

export default Teacher;
