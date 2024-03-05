import React from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import ButtonsHeader from "../../components/ButtonsHeader";
import { useState, useEffect } from "react";
import apicall from "../../assets/api/axios";
import Loader from "../../components/Loader";
import { ImageUrl } from "../../assets/api/axios";

const EditBloomAndChaarcter = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState("");
  const [err, setErr] = useState("");
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState({
    title: "",
    image: "",
    description: "",
    type: "",
  });
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/bloom&Character");
  };

  const dataToBeUpdated = data?.filter((data) => data?._id === id);

  useEffect(() => {
    const getBloomAndChar = async () => {
      try {
        setLoading(true);
        const response = await apicall.get(
          "/bloom-or-character/admin/all?type=all"
        );

        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setErr(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error.message
        );
        setLoading(false);
      }
    };

    getBloomAndChar();
  }, []);

  useEffect(() => {
    if (resData) {
      navigate("/bloom&Character");
    }
  }, [resData]);

  useEffect(() => {
    if (dataToBeUpdated.length > 0) {
      setInputs((prev) => ({
        ...prev,
        title: dataToBeUpdated[0]?.title,
        description: dataToBeUpdated[0]?.description,
        image: dataToBeUpdated[0]?.image,
        type: dataToBeUpdated[0]?.type,
      }));
    }
  }, [data]);

  const inputsHandler = (e) => {
    const { name, value, files } = e.target;

    setInputs((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setErr("");
    setResData("");

    const formData = new FormData();

    for (let key in inputs) {
      formData.append(key, inputs[key]);
    }

    try {
      setLoading(true);
      const response = await apicall.patch(
        `/bloom-or-character/${id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.data) {
        setResData(response?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErr(error);
    }
  };

  return (
    <>
      <div className="md:flex md:justify-between m-10">
        <ButtonsHeader />
        <div onClick={() => handleClick()}>
          <BackButton />
        </div>
      </div>
      <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[90%]  rounded-[20px] m-10 overflow-y-auto">
        <h1
          className=" font-semibold text-[#1C5C2E] text-[24px] m-10"
          style={{ marginTop: 20 }}
        >
          Add New Character Or Blooms
        </h1>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 m-10">
          <form onSubmit={submitHandler}>
            <div>
              <input
                type="text"
                onChange={inputsHandler}
                value={inputs?.title}
                name="title"
                placeholder="Names"
                className="px-4 py-3 rounded focus:outline-none bg-[#E5ECE7]"
                style={{
                  width: "80%",
                  height: 50,
                  borderRadius: 5,
                  marginTop: 20,
                }}
              />
              <textarea
                name="description"
                value={inputs?.description}
                onChange={inputsHandler}
                placeholder="Description"
                className="px-4 py-3 rounded focus:outline-none bg-[#E5ECE7] resize-y rounded-md"
                style={{
                  width: "80%",
                  height: 150,
                  borderRadius: 5,
                  marginTop: 30,
                }}
              ></textarea>

              <select
                id=""
                value={inputs?.type}
                name="type"
                onChange={inputsHandler}
                class="form-select px-4 py-3 rounded text-[gray] focus:outline-none bg-[#E5ECE7] outline-none"
                placeholder="Category"
                style={{
                  width: "80%",
                  height: 50,
                  borderRadius: 5,
                  marginTop: 30,
                }}
              >
                <option
                  className="bg-[#75997E] text-[white]"
                  disabled
                  hidden
                  selected
                >
                  Bloom Or Character Type
                </option>

                <option className="bg-[#75997E] text-[white] " value="bloom">
                  Bloom
                </option>
                <option
                  className="bg-[#75997E] text-[white] "
                  value="character"
                >
                  Character
                </option>
              </select>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 md:-mt-20 absolute right-0 top-[50%]">
              <div
                className="w-[200px] h-[220px] rounded-lg bg-[#f0f5f1]  ml-5 mt-5"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  className="w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px] relative"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <input
                    type="file"
                    style={{
                      background: "black",
                      height: "15vh",
                      width: "10vw",
                      position: "absolute",
                      opacity: 0,
                    }}
                    accept="image/*"
                    name="image"
                    onChange={inputsHandler}
                  />
                  {inputs?.image ? (
                    <img
                      src={
                        typeof inputs?.image === "string"
                          ? `${ImageUrl}${inputs?.image}`
                          : URL.createObjectURL(inputs?.image)
                      }
                    />
                  ) : (
                    <div
                      className="w-[100px] h-[100px] bg-[#E5ECE7] rounded-[15px]"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <FiImage color="#1C5C2E" size={40} />
                    </div>
                  )}
                </div>
                <p className="text-[#979B9F] text-[14px] text-center mt-5">
                  <span className="underline text-[#1C5C2E] font-medium ">
                    {" "}
                    Upload{" "}
                  </span>{" "}
                  or Drag <br /> Avatar Here
                </p>
              </div>
              {/* <div className='w-[200px] h-[220px] rounded-lg bg-[#f0f5f1]  ml-5 mt-5 '
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <div className='w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]'
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                                    <div className='w-[100px] h-[100px] bg-[#E5ECE7] rounded-[15px]'
                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <FiImage color='#1C5C2E' size={40} />
                                    </div>
                                </div>
                                <p className='text-[#979B9F] text-[14px] text-center mt-5'><span className='underline text-[#1C5C2E] font-medium '> Upload </span> or Drag   <br /> Profile Crop Image Here</p>

                            </div>   */}
              {/* <div className='w-[200px] h-[220px] rounded-lg bg-[#f0f5f1]  ml-5 mt-5'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <div className='w-[120px] h-[120px] border-dashed border-2 border-[#1C5C2E] rounded-[20px]'
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                                    <div className='w-[100px] h-[100px] bg-[#E5ECE7] rounded-[15px]'
                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <FiImage color='#1C5C2E' size={40} />
                                    </div>
                                </div>
                                <p className='text-[#979B9F] text-[14px] text-center mt-5'><span className='underline text-[#1C5C2E] font-medium '> Upload </span> or Drag  <br /> Full Image Here</p>

                            </div> */}
            </div>
            <button className=" border border-green px-4 py-2 mt-3 rounded-md hover:bg-green hover:text-white">
              {loading ? <Loader /> : "Save"}
            </button>

            {err && <p>{err}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBloomAndChaarcter;
