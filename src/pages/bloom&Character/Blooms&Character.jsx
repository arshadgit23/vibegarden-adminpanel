import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import BackButton from "../../components/BackButton";
import ButtonsHeader from "../../components/ButtonsHeader";
import bloom1 from "../../assets/images/bloom1.png";
import bloom2 from "../../assets/images/bloom2.png";
import bloom3 from "../../assets/images/bloom3.png";
import bloom4 from "../../assets/images/bloom4.png";
import character1 from "../../assets/images/character1.png";
import character2 from "../../assets/images/character2.png";
import character3 from "../../assets/images/character3.png";
import character4 from "../../assets/images/character4.png";
import character5 from "../../assets/images/character5.png";
import { useEffect, useState } from "react";
import apicall from "../../assets/api/axios";
import { CgTrashEmpty } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

const BloomsCharacter = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bloomLoading, setBloomLoading] = useState(false);
  const [error, setError] = useState("");
  const [bloom, setBloom] = useState([]);
  const [char, setChar] = useState([]);
  const [reload, setReload] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [err, setErr] = useState("");
  const [characterSearch, setCharacterSearch] = useState("");
  const [bloomSearch, setBloomSearch] = useState("");
  const [deleteCharacterId, setDeleteCharacterId] = useState();
  const [deleteBloomId, setDeleteBloomId] = useState();

  useEffect(() => {
    const getBloom = async () => {
      try {
        setBloomLoading(true);
        const response = await apicall.get(
          "/bloom-or-character/admin/all?type=bloom",
          {
            params: { search: bloomSearch },
          }
        );

        setBloom(response.data.data);
        setBloomLoading(false);
      } catch (error) {
        setError(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error.message
        );
        setBloomLoading(false);
      }
    };
    getBloom();
  }, [reload, isDelete, bloomSearch]);

  useEffect(() => {
    const getChar = async () => {
      try {
        setLoading(true);
        const response = await apicall.get(
          "/bloom-or-character/admin/all?type=character",
          {
            params: { search: characterSearch },
          }
        );

        setChar(response.data.data);
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
    getChar();
  }, [reload, isDelete, characterSearch]);

  const handleClickNext = () => {
    navigate("/addBloomCharacter");
  };

  const deleteCharacterHandler = async (id) => {
    setDeleteCharacterId(id);
    const characterId = id;
    setErr("");
    setLoading(true);
    try {
      const response = await apicall.delete(
        `/bloom-or-character/${characterId}`
      );
      if (response?.data?.data) {
        setIsDelete(!isDelete);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErr(error.response.data.message);
    }
  };

  const deleteBloomHandler = async (id) => {
    setDeleteBloomId(id);
    const bloomId = id;
    setErr("");
    setLoading(true);
    try {
      const response = await apicall.delete(`/bloom-or-character/${bloomId}`);
      if (response?.data?.data) {
        setIsDelete(!isDelete);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErr(error.response.data.message);
    }
  };

  const editBloomAndCharacterHandler = (id) => {
    const bloomOrCharId = id;
    navigate(`/editBloomCharacter/${bloomOrCharId}`);
  };

  return (
    <>
      <div className="md:flex md:flex-row flex-col md:justify-between m-10">
        <ButtonsHeader />

        <div onClick={() => handleClickNext()}>
          <Button
            text="+ Add New Character Or Blooms"
            bgColor="#359D9E"
            color="white"
            width={220}
            fontSize="12px"
            borderRadius={10}
          />
        </div>
      </div>
      <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[95%] rounded-[20px] m-10 py-5 pl-5 overflow-y-auto">
        <div className="md:flex justify-between mx-10 my-5 items-center flex-wrap">
          <h1
            className=" font-semibold text-[#1C5C2E] text-[24px]"
            style={{ marginTop: 20 }}
          >
            Characters:
          </h1>
          <input
            type="text"
            value={characterSearch}
            placeholder="Search here"
            className="rounded bg-[#E5ECE7] md:w-[32rem] w-[90%] h-[50px] font-[14px] focus:outline-none px-5 "
            onChange={(e) => setCharacterSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="mt-1 ml-3">
            <Loader />
          </div>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : char.length === 0 ? (
          <h1 className="ml-10">No Character Found</h1>
        ) : (
          <div class="grid grid-cols-1 gap-2 md:grid-cols-5 lg:grid-cols-5 mt-5 ">
            {char?.map((val, ind) => (
              <div
                key={ind}
                className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[200px] h-[250px] rounded-[20px] flex flex-col justify-center items-center "
              >
                <div className="flex justify-evenly items-center w-[150px] relative -top-1.5 right-0">
                  <Button
                    borderRadius={10}
                    color="#fff"
                    height={40}
                    bgColor="#EF3A71"
                    icon={<CgTrashEmpty size={25} />}
                    handleClick={() => deleteCharacterHandler(val?._id)}
                  />
                  <Button
                    borderRadius={10}
                    color="#fff"
                    height={40}
                    bgColor="#55C595"
                    icon={<FiEdit size={25} />}
                    handleClick={() => editBloomAndCharacterHandler(val?._id)}
                  />
                </div>
                <img
                  className="w-1/2 h-[40%]"
                  src={`https://vibe-garden-development.s3.ap-south-1.amazonaws.com/${val?.image}`}
                  alt="character"
                />
                <p className="mt-10">{val?.title}</p>
                {err && val?._id == deleteCharacterId && (
                  <p className="text-red-700">{err}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="md:flex justify-between mx-10 my-10 items-center flex-wrap">
          <h1
            className=" font-semibold text-[#1C5C2E] text-[24px]"
            style={{ marginTop: 20 }}
          >
            Blooms:
          </h1>
          <input
            type="text"
            value={bloomSearch}
            placeholder="Search here"
            className="rounded bg-[#E5ECE7] md:w-[32rem] w-[90%] h-[50px] font-[14px] focus:outline-none px-5 "
            onChange={(e) => setBloomSearch(e.target.value)}
          />
        </div>
        {bloomLoading ? (
          <div className="mt-1 ml-3">
            <Loader />
          </div>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : bloom.length === 0 ? (
          <h1 className="ml-10">No Bloom Found</h1>
        ) : (
          <div class="grid grid-cols-1 gap-2 md:grid-cols-5 lg:grid-cols-5 mt-5 ">
            {bloom?.map((val, ind) => (
              <div
                key={ind}
                className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[200px] h-[250px] rounded-[20px] flex flex-col justify-center items-center "
              >
                <div className="flex justify-evenly items-center w-[150px] relative -top-1.5 right-0">
                  <Button
                    borderRadius={10}
                    color="#fff"
                    height={40}
                    bgColor="#EF3A71"
                    icon={<CgTrashEmpty size={25} />}
                    handleClick={() => deleteBloomHandler(val?._id)}
                  />
                  <Button
                    borderRadius={10}
                    color="#fff"
                    height={40}
                    bgColor="#55C595"
                    icon={<FiEdit size={25} />}
                    handleClick={() => editBloomAndCharacterHandler(val?._id)}
                  />
                </div>
                <img
                  className="w-1/2 h-[40%]"
                  src={`https://vibe-garden-development.s3.ap-south-1.amazonaws.com/${val?.image}`}
                  alt="bloom"
                />
                <p className="mt-10">{val?.title}</p>
                {err && val?._id == deleteBloomId && (
                  <p className="text-red-700">{err}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BloomsCharacter;
