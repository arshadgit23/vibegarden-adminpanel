import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import apicall from "../assets/api/axios";

const useFetch = ({ URL }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async (method, body, headers) => {
    try {
      setIsLoading(true);
      const response = await fetch(URL, {
        method,
        body: JSON.stringify(body),
        headers,
      });
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { data, isLoading, error, getData };
};

export default useFetch;
