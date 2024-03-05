import { Input } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import BackButton from "../../../components/BackButton";
import Box from "../../../components/Box";
import MobileScreenHeader from "../../../components/MobileScreenHeader";
import profile from "./screenImages/profile.png";

import axios from "axios";
import { FiVideo, FiLink } from "react-icons/fi";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/SectionTitle";
import ImageInputCard from "../../../components/ImageInputCard";
import SuccessMessage from "../../../components/SuccessMessage";
import ErrorMessage from "../../../components/ErrorMessage";
import apicall, { ImageUrl } from "../../../assets/api/axios";
import { FiImage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { setUser } from "../../../store/reducers/userSlice";

const ProfileScreen = () => {
  const user = useSelector((state) => state?.user);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [photo, setPhoto] = useState(user?.photo);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateAdminProfile = async (e) => {
    e.preventDefault();

    const profileData = new FormData();
    profileData.append("firstName", firstName);
    profileData.append("lastName", lastName);
    profileData.append("email", email);
    profileData.append("photo", photo);
    try {
      setLoading(true);
      const response = await apicall.patch("/users/updateMe", profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      dispatch(setUser(response?.data?.data?.user));
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error") return setError("Network Error");
      setError(err?.response?.data?.message);
    }
  };

  return (
    <Container backButton={false}>
      <SectionTitle>Your Profile</SectionTitle>
      <form onSubmit={updateAdminProfile}>
        <div className="flex justify-around ">
          <div className="p-5 w-1/2 flex flex-col justify-around">
            <label className="text-[gray]">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="px-4 py-3 mb-2 rounded-md border border-gray focus:outline-none w-full"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />

            <label className="text-[gray]">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="px-4 py-3 mb-2 rounded-md border border-gray focus:outline-none w-full"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />

            <label className="text-[gray]">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 mb-2 rounded-md border border-gray focus:outline-none w-full"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className=" w-1/2 flex flex-col justify-around p-3">
            <div className=" w-1/2">
              <div className=" w-max ml-auto flex items-center gap-5 justify-center ">
                <label htmlFor="photo" className="relative cursor-pointer">
                  <input
                    type="file"
                    id="photo"
                    style={{
                      background: "black",
                      position: "absolute",
                      left: 0,
                      width: "12vw",
                      height: "23vh",
                      opacity: 0,
                    }}
                    onChange={(e) => setPhoto(e.target.files[0])}
                    accept="image/*"
                  />
                  <div className="w-48 rounded-lg p-5 bg-[#E5ECE7] flex items-center justify-center">
                    {photo ? (
                      <img
                        src={
                          typeof photo === "string"
                            ? `${ImageUrl}${photo}`
                            : URL.createObjectURL(photo)
                        }
                        width={120}
                        alt="video-photo"
                        className=" w-full h-40 object-contain"
                      />
                    ) : (
                      <div className=" flex flex-col justify-center items-center">
                        <div className="w-28 h-28 border-dashed border-2 border-[#1C5C2E] rounded-lg flex flex-col justify-center items-center">
                          <FiImage color="#1C5C2E" size={40} />
                        </div>
                        <p className="text-[gray] text-[14px] text-center mt-5">
                          <span className="underline text-[#1C5C2E] font-medium mr-1">
                            Upload
                          </span>
                          or Drag Photo Here
                        </p>
                      </div>
                    )}
                  </div>
                </label>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex space-x-4">
          <Button
            text={loading ? <Loader /> : "Save"}
            bgColor="#359D9E"
            color="#fff"
            borderRadius="10px"
            height="50px"
            width="150px"
            type="submit"
          />
          <Button
            text="Cancel"
            bgColor="white"
            shadow={`1px 2px 9px #00000029`}
            color="#EF3A71"
            width={150}
            borderRadius={10}
            handleClick={() => navigate(-1)}
          />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </Container>
  );
};

// const ProfileScreen = () => {
//   const [file, setFile] = useState();
//   const [Text, setText] = useState(" ");
//   function handleChange(e) {
//     setFile(URL.createObjectURL(e.target.files[0]));
//   }
//   const navigate = useNavigate();
//   const handleBack = () => {
//     navigate("/Pages");
//   };
//   return (
//     <>
//       <div onClick={handleBack}>
//         <BackButton />
//       </div>
//       <MobileScreenHeader
//         heading="Profile Screen"
//         horizontalLine={
//           <div className="border-t border-[#1C5C2E]  w-[68%] mt-[15px] mx-4"></div>
//         }
//         btn={
//           <div>
//             {" "}
//             <Button
//               text="Update Site"
//               bgColor="#1C5C2E"
//               borderRadius={10}
//               width={150}
//               color="#fff"
//             />{" "}
//           </div>
//         }
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
//         <div className="m-10 flex flex-col justify-center items-center">
//           <div className="w-[500px] h-[300px] rounded-[25px]">
//             <Input
//               color="teal"
//               size="lg"
//               type="file"
//               label="Current Bloom"
//               name="image"
//               onChange={handleChange}
//               style={{ height: 200 }}
//               className="block w-full text-sm text-slate-500
//                                       file:mr-4 file:py-2 file:px-4
//                                       file:rounded-full file:border-0
//                                       file:text-sm file:font-semibold
//                                       file:bg-violet-50 file:text-violet-700
//                                       hover:file:bg-violet-100"
//             />
//           </div>
//           <Box
//             absoluteDiv={
//               <div className="w-[100px] h-[50px] bg-[white]  rounded-[25px] absolute -top-6 left-3 flex justify-center items-center ">
//                 <p className="font-semibold ">Graph Text</p>
//               </div>
//             }
//             heading="Graph Text"
//             description={
//               <input
//                 type="text"
//                 value={Text}
//                 onChange={(e) => setText(e.target.value)}
//                 className="outline-none w-[100%]"
//                 placeholder="Lorem ipsum dolor sit amet, conseteturn sadipscing "
//               />
//             }
//           />
//           <div className="w-[250px] h-[300px] mt-10">
//             <input
//               placeholder="Button Text"
//               className="border border-[#1C5C2E] h-[50px] rounded-lg placeholder:text-center outline-none"
//             />
//           </div>
//         </div>
//         <div>
//           <h1 className="text-[#1C5C2E] text-[24px]">Preview:</h1>
//           <div className="w-[300px] h-[550px] flex flex-col  rounded-[40px] mt-10">
//             <img
//               src={profile}
//               alt="mobileImg"
//               className="rounded-[40px] relative"
//               width={"100%"}
//               height={"100%"}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

export default ProfileScreen;
