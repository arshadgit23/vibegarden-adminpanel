import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components";

import Container from "../../../components/Container";
import SectionTitle from "../../../components/SectionTitle";
import SuccessMessage from "../../../components/SuccessMessage";
import ErrorMessage from "../../../components/ErrorMessage";
import apicall, { ImageUrl } from "../../../assets/api/axios";
import { FiImage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { logout, setUser } from "../../../store/reducers/userSlice";

const UpdatePasswordScreen = ({ setToken }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateAdminPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await apicall.patch("/users/updateMyPassword", {
        passwordCurrent: currentPassword,
        password: newPassword,
        passwordConfirm: confirmPassword,
      });
      setLoading(false);
      localStorage.clear();
      setToken("");
      dispatch(logout());
      navigate("/");
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error") return setError("Network Error");
      setError(err?.response?.data?.message);
    }
  };

  return (
    <Container backButton={false}>
      <SectionTitle>Update Your Password</SectionTitle>
      <form onSubmit={updateAdminPassword}>
        <div className="p-5 w-1/2 flex flex-col justify-around gap-3">
          <input
            type="password"
            placeholder="Current Password"
            className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
            onChange={(e) => setCurrentPassword(e.target.value)}
            value={currentPassword}
          />
          <input
            type="password"
            placeholder="New Password"
            className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
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

export default UpdatePasswordScreen;
