import React from "react";
import BackButton from "../../components/BackButton";
import ButtonsHeader from "../../components/ButtonsHeader";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";
import { useState, useEffect } from "react";
import { Button } from "../../components";
import Loader from "../../components/Loader";
import apicall from "../../assets/api/axios";
import Select from "react-select";
const ResonanceQuestions = () => {
  const [inputs, setInputs] = useState({
    statement: "",
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    percentage1: "",
    percentage2: "",
    percentage3: "",
    percentage4: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/resonanceFinder");
  };
  const data = [
    {
      ans: "Answer 1",
      value: "Value",
      name: "ans1",
      percentage: "percentage1",
    },
    {
      ans: "Answer 2",
      value: "Value",
      name: "ans2",
      percentage: "percentage2",
    },
    {
      ans: "Answer 3",
      value: "Value",
      name: "ans3",
      percentage: "percentage3",
    },
    {
      ans: "Answer 4",
      value: "Value",
      name: "ans4",
      percentage: "percentage4",
    },
  ];

  useEffect(() => {
    const getAllTags = async () => {
      setLoading(true);
      try {
        const response = await apicall.get(`/tags/admin/all`);
        setTags(response.data.data);
        setLoading(false);
      } catch (error) {
        const errorMessage = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        setError(errorMessage);
        setLoading(false);
      }
    };
    getAllTags();
  }, []);

  const submitQuestionHandler = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      const response = await apicall.post(
        "/resonance-finder-question",
        {
          statement: inputs.statement,
          answer1: inputs.ans1,
          answer2: inputs.ans2,
          answer3: inputs.ans3,
          answer4: inputs.ans4,
          answer1Value: inputs.percentage1,
          answer2Value: inputs.percentage2,
          answer3Value: inputs.percentage3,
          answer4Value: inputs.percentage4,
          tag: selectedTags,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response?.data?.data) {
        setLoading(false);
        setMessage("Question Added");
        setInputs((prev) => ({
          ...prev,
          statement: "",
          ans1: "",
          ans2: "",
          ans3: "",
          ans4: "",
          percentage1: "",
          percentage2: "",
          percentage3: "",
          percentage4: "",
        }));
      }
      navigate("/resonance-all-questions");
    } catch (error) {
      setLoading(false);
      setError(error?.message);
    }
  };

  const editStatementHandler = (e) => {
    const { value, name } = e.target;

    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const tagsData = tags.map((tag) => ({
    value: tag._id,
    label: tag.name,
  }));

  return (
    <>
      <div className="md:flex md:justify-between m-10">
        <ButtonsHeader />
        <div onClick={() => handleClick()}>
          <BackButton />
        </div>
      </div>
      <div className="bg-[white] shadow-lg shadow-[#00000029]-500/50 w-[85%]  rounded-[20px] m-10 px-5 py-4 overflow-y-auto">
        <h1
          className=" font-semibold text-[#1C5C2E] text-[24px] m-5"
          style={{ marginTop: 20 }}
        >
          Resonance Finder Question:
        </h1>
        <h1
          className=" font-medium text-[#1C5C2E] text-[20px] m-5"
          style={{ marginTop: 20 }}
        >
          Question # 1
        </h1>
        <form onSubmit={submitQuestionHandler}>
          <div className="md:flex flex-col w-100 justify-center items-cemter">
            <select
              id=""
              className="px-4 py-3 rounded-md border border-gray focus:outline-none w-full"
              // ref={categoryRef}
              onChange={(e) => setSelectedTags(e.target.value)}
            >
              <option key="tag" value="" hidden>
                Select Tag
              </option>
              {tagsData.map((tag) => (
                <option key={tag?.value} value={tag?.value}>
                  {tag?.label}
                </option>
              ))}
            </select>

            <div className="w-[95%] h-[80px] rounded-[10px] bg-[#f0f5f1] m-5">
              <input
                value={inputs.statement}
                onChange={editStatementHandler}
                type="text"
                name="statement"
                className={`text-[#b4c2b8] text-[18px] px-5 py-8 ${classes.statement}`}
                placeholder="Statement"
              />
            </div>
            {data.map((val, ind) => (
              <div key={ind} className="md:flex">
                <div className="w-[80%] h-[80px] rounded-[10px] bg-[#f0f5f1] m-5">
                  <input
                    value={inputs[val.name]}
                    onChange={editStatementHandler}
                    name={val.name}
                    type="text"
                    className={`text-[#b4c2b8] text-[18px] px-5 py-8 ${classes.answer}`}
                    placeholder={val.ans}
                  />
                </div>
                <div className="w-[15%] h-[80px] rounded-[10px] bg-[#f0f5f1] m-5 flex">
                  <input
                    value={inputs[val.percentage]}
                    onChange={editStatementHandler}
                    name={val.percentage}
                    type="number"
                    className={`text-[#b4c2b8] text-[18px] px-5 py-8 ${classes.value}`}
                    placeholder={val.value}
                  />
                  {/* <div>
                            <GoTriangleUp color='#1C5C2E' size={25} className="mt-5"/>
                            <GoTriangleDown color='#1C5C2E' size={25} className="mb-5" /></div> */}
                </div>
              </div>
            ))}

            <Button
              type="submit"
              text={loading ? <Loader /> : "Add"}
              bgColor="#359D9E"
              color="white"
              width={150}
              borderRadius={10}
            />
            {error && (
              <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
            )}
            {message && <p style={{ fontWeight: "bold" }}>{message}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default ResonanceQuestions;
