import React, { useState, useEffect } from "react";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { CgTrashEmpty } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import apicall from "../../assets/api/axios";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

const Tags = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [reload, setReload] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const getAllTags = async () => {
      try {
        setLoading(true);
        const response = await apicall.get("/tags/admin/all", {
          params: { search: filterTerm },
        });
        if (response.status === 200) {
          setCategories(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        setError(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error.message
        );
        setLoading(false);
      }
    };
    getAllTags();
  }, [reload, filterTerm]);

  const deleteCategoryFunction = async () => {
    try {
      setLoading(true);
      const response = await apicall.delete(`tags/${deleteId}`);
      setDeleteMessage("deleted Successfully");
      setReload(!reload);
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

  return (
    <Container
      addButton={true}
      addButtonText={"+ Add More"}
      addButtonLink={"/add-tags"}
      // isLoading={loading}
      // error={error}
    >
      {/* <h1 className=" text-3xl text-[#1C5C2E] font-semibold">Topic & Tags</h1> */}

      <div className="flex justify-between flex-wrap">
        <SectionTitle>Topic & Tags</SectionTitle>
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
      ) : (
        <>
          {categories.length === 0 ? (
            <h1>No Tags Found</h1>
          ) : (
            categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center rounded-lg w-full bg-[#E5ECE7] shadow-lg mt-5 justify-between px-5 py-4"
              >
                <div className="flex flex-col items-start justify-center capitalize px-4 py-3">
                  <p className=" text-lg ">
                    {/* <span>Name:</span> */}
                    {category.name}
                  </p>
                  {/* <p className="ml-5">
                <span>Tag Type:</span>
                {category.tagType}
              </p> */}
                </div>
                <div className=" relative w-52 px-4 flex gap-3">
                  <Button
                    borderRadius={10}
                    color="#fff"
                    height={50}
                    bgColor="#EF3A71"
                    icon={<CgTrashEmpty size={25} />}
                    handleClick={() => {
                      setDeleteId(category._id);
                      setDeleteCategory(!deleteCategory);
                    }}
                  />
                  <Button
                    borderRadius={10}
                    color="#fff"
                    height={50}
                    bgColor="#55C595"
                    icon={<FiEdit size={25} />}
                    handleClick={() => navigate(`/update-tags/${category._id}`)}
                  />
                  {deleteCategory && deleteId === category._id ? (
                    <div className=" absolute top-0 left-0 bg-[#E5ECE7]  h-full w-full flex justify-around items-center">
                      <p className=" capitalize">confirm delete?</p>
                      <Button
                        borderRadius={10}
                        color="#fff"
                        height={50}
                        bgColor="#215273"
                        text={"Yes"}
                        handleClick={deleteCategoryFunction}
                      />
                      <Button
                        borderRadius={10}
                        color="#fff"
                        height={50}
                        bgColor="#215273"
                        text={"No"}
                        handleClick={() => setDeleteCategory(false)}
                      />
                    </div>
                  ) : (
                    deleteMessage &&
                    deleteId === category._id && <p>{deleteMessage}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </Container>
  );
};

export default Tags;
