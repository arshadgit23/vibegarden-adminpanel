import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components";
import BackButton from "../../components/BackButton";
import ButtonsHeader from "../../components/ButtonsHeader";
import apicall from "../../assets/api/axios";

const CategoryDetail = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const { id } = useParams();
  const [reload, setReload] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const [deleteCategory, setDeleteCategory] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await apicall.get(`categories/${id}`);
        if (response.status === 200) {
          setCategory(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  const deleteCategoryFunction = async () => {
    try {
      const response = await apicall.delete(`categories/${deleteId}`);
      if (response.status === 204) {
        setDeleteMessage("deleted Successfully");
        setTimeout(() => {
          navigate(-1);
        }, 800);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-10 flex justify-between mx-10">
        <ButtonsHeader />
        <div className="flex ml-5">
          <BackButton />
        </div>
      </div>
      <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[85%] h-[600px] rounded-[20px] m-10 overflow-y-auto ">
        <div className=" relative flex justify-end px-5 py-4 space-x-4">
          <Button
            text="Delete"
            bgColor="#EF3A71"
            color="#fff"
            width={150}
            borderRadius={5}
            handleClick={() => {
              setDeleteId(category._id);
              setDeleteCategory(!deleteCategory);
            }}
          />
          <div onClick={() => navigate(`/editCategory/${category._id}`)}>
            <Button
              text="Edit"
              bgColor="#55C595"
              color="#fff"
              width={150}
              borderRadius={5}
            />
          </div>
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
            deleteMessage && deleteId === category._id && <p>{deleteMessage}</p>
          )}
        </div>

        {Object.keys(category).length > 1 ? (
          <div>
            <div className="flex justify-between mt-10 px-10 py-5">
              <div>
                <p className="font-medium text-[24px] px-10 py-5">Title:</p>
                <p className="font-medium text-[20px] px-10 py-5">
                  {category.title}
                </p>
                <p className="font-medium text-[24px] px-10 py-5">
                  Description:
                </p>
                <p className=" text-lg   text-[gray] px-10 py-5">
                  {category.description}
                </p>
              </div>
              <img
                src={`https://vibe-garden-development.s3.ap-south-1.amazonaws.com/${category.icon}`}
                alt="category-image"
                className=" object-contain h-96 w-96"
                height={200}
                width={200}
              />
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default CategoryDetail;
