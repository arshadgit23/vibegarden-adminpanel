import React from "react";
import { Button } from "../../components";
import { FiEdit, FiEye } from "react-icons/fi";
import { CgTrashEmpty } from "react-icons/cg";

const Card = ({ category }) => {
  const [categories, setCategories] = useState([]);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [reload, setReload] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  return (
    <div
      key={category._id}
      className="flex items-center rounded-lg w-[95%]  bg-[#E5ECE7] shadow-lg mx-5 mt-5 justify-between px-5 py-4"
    >
      <div className="flex items-center px-4 py-3">
        {category.icon && (
          <img
            src={`https://vibe-garden-development.s3.ap-south-1.amazonaws.com/${category.icon}`}
            alt="category-image"
            className=" rounded-full object-contain h-12 w-12"
            height={50}
            width={50}
          />
        )}
        <p className="ml-5 font-medium">{category.title}</p>
      </div>
      <div className=" relative px-4 ml-5 md:flex space-x-4">
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
          handleClick={() => navigate(`/editcategory/${category._id}`)}
        />
        <Button
          borderRadius={10}
          color="#fff"
          height={50}
          bgColor="#215273"
          icon={<FiEye size={25} />}
          handleClick={() => navigate(`/categoryDetail/${category._id}`)}
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
          deleteMessage && deleteId === category._id && <p>{deleteMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
