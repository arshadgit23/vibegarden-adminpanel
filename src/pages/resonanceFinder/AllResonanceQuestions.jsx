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
import { FiEdit } from "react-icons/fi";
import { CgTrashEmpty } from "react-icons/cg";

const ResonanceAllQuestions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionDeleted, setQuestionDeleted] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/resonanceFinder");
  };

  useEffect(() => {
    const getResonanceAllQuestions = async () => {
      setLoading(true);
      try {
        const response = await apicall.get(
          "/resonance-finder-question/all/questions"
        );
        setQuestions(response?.data?.data?.questions);

        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message
            ? error.response?.data?.message
            : error.message
        );
        setLoading(false);
      }
    };

    getResonanceAllQuestions();
  }, [questionDeleted]);

  const customizedQuestions = questions?.map((question) => ({
    ...question,
    answers: [
      { answer: question?.answer1, value: question?.answer1Value },
      { answer: question?.answer2, value: question?.answer2Value },
      { answer: question?.answer3, value: question?.answer3Value },
      { answer: question?.answer4, value: question?.answer4Value },
    ],
  }));

  console.log(customizedQuestions);

  const deleteQuestionHandler = async (id) => {
    const questionId = id;

    setLoading(true);
    try {
      const response = await apicall.delete(
        `/resonance-finder-question/${questionId}`
      );

      if (response?.data?.data) {
        setLoading(false);
        setQuestionDeleted(!questionDeleted);
      }
    } catch (error) {
      setError(
        error.response?.data?.message
          ? error.response?.data?.message
          : error.message
      );
      setLoading(false);
    }
  };

  const editQuestionHandler = (id) => {
    const questionId = id;
    navigate(`/edit-resonance-question/${questionId}`);
  };

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

        {loading && <Loader />}
        <div className="md:flex flex-col w-100 justify-center items-cemter">
          {customizedQuestions?.map((val, ind) => {
            ind++;

            return (
              <>
                <div className="w-max ml-auto flex justify-between items-baseline">
                  <div className="m-1">
                    <Button
                      borderRadius={10}
                      color="#fff"
                      height={50}
                      bgColor="#EF3A71"
                      icon={<CgTrashEmpty size={25} />}
                      handleClick={() => deleteQuestionHandler(val?._id)}
                    />
                  </div>

                  <div className="m-1">
                    <Button
                      borderRadius={10}
                      color="#fff"
                      height={50}
                      bgColor="#55C595"
                      icon={<FiEdit size={25} />}
                      handleClick={() => editQuestionHandler(val?._id)}
                    />
                  </div>
                </div>
                <h1
                  className=" font-medium text-[#1C5C2E] text-[20px] m-5"
                  style={{ marginTop: 20 }}
                >
                  Question # {ind}
                </h1>
                <div className="w-[95%] h-[80px] rounded-[10px] bg-[#f0f5f1] m-5">
                  <p className="ml-5 mt-5"> {val?.statement}</p>
                </div>
                {val?.answers?.map((answer, i) => (
                  <div key={i} className="md:flex">
                    <div className="w-[80%] h-[80px] rounded-[10px] bg-[#f0f5f1] m-5">
                      <p className="ml-5 mt-5"> {answer?.answer}</p>
                    </div>
                    <div className="w-[15%] h-[80px] rounded-[10px] bg-[#f0f5f1] m-5 flex">
                      <p className="ml-5 mt-5"> {answer?.value}</p>
                      {/* <div>
                            <GoTriangleUp color='#1C5C2E' size={25} className="mt-5"/>
                            <GoTriangleDown color='#1C5C2E' size={25} className="mb-5" /></div> */}
                    </div>
                  </div>
                ))}
              </>
            );
          })}

          {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
          {message && <p style={{ fontWeight: "bold" }}>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default ResonanceAllQuestions;
