import React, { useState, useEffect } from "react";
import apicall from "../../assets/api/axios";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";

const Waitinglist = () => {
  const handleClickView = async (data) => {
    try {
      setLoading(true);
      const response = await apicall.patch(
        `users/update/waitinglist/user/${data?.id}`,
        {
          status: data?.status,
        }
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message
      );
    }
  };

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const getWaitingListData = async () => {
      try {
        setLoading(true);
        const response = await apicall.get(`users/waiting/list`, {
          params: {
            search: filterTerm,
          },
        });
        setData(response.data.data);
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
    getWaitingListData();
  }, [filterTerm]);

  return (
    <>
      <div>
        <div class="container mx-auto px-4 sm:px-8">
          <div class="py-8">
            <div className="flex justify-between items-center">
              <h2 class="text-2xl font-semibold leading-tight">
                Waiting List:
              </h2>
              <input
                type="text"
                value={filterTerm}
                placeholder="Search by email"
                className="rounded bg-[#E5ECE7] md:w-[32rem] w-[90%] h-[50px] font-[14px] focus:outline-none px-5 "
                onChange={(e) => setFilterTerm(e.target.value)}
              />
            </div>

            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorMessage>{error}</ErrorMessage>
            ) : data?.length === 0 ? (
              <h1>No Waiting List Found</h1>
            ) : (
              <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table class="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th class="px-3 py-3 border-b-2 border-gray-200 text-[#75997E] text-left text-sm font-semibold capitalize tracking-wider">
                          Sno
                        </th>
                        <th class="px-3 py-3 border-b-2 border-gray-200 text-[#75997E] text-left text-sm font-semibold capitalize tracking-wider">
                          First Name
                        </th>
                        <th class="px-3 py-3 border-b-2 border-gray-200 text-[#75997E] text-left text-sm font-semibold capitalize tracking-wider">
                          Last Name
                        </th>
                        <th class="px-3 py-3 border-b-2 border-gray-200 text-[#75997E] text-left text-sm font-semibold capitalize tracking-wider">
                          Email Address
                        </th>
                        <th class="px-3 py-3 border-b-2 border-gray-200 text-[#75997E] text-left text-sm font-semibold capitalize tracking-wider">
                          Status
                        </th>
                        <th class="px-3 py-3 border-b-2 border-gray-200 text-[#75997E] text-left text-sm font-semibold capitalize tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((user, ind) => {
                        return (
                          <tr key={ind}>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {ind + 1}
                              </p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {user?.user?.firstName}
                              </p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {user?.user?.lastName ? user?.lastName : "-"}
                              </p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className=" text-gray-900 whitespace-no-wrap">
                                {user?.user?.email}
                              </p>
                            </td>

                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                              <p className=" text-gray-900 whitespace-no-wrap">
                                {user?.status}
                              </p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                              <p
                                onClick={() =>
                                  handleClickView({
                                    id: user?._id,
                                    status: "confirmed",
                                  })
                                }
                                className=" text-[#55C595] whitespace-no-wrap cursor-pointer "
                              >
                                Confirm
                              </p>
                              <p
                                onClick={() =>
                                  handleClickView({
                                    id: user?._id,
                                    status: "cancelled",
                                  })
                                }
                                className=" text-[#EF3A71] whitespace-no-wrap  cursor-pointer "
                              >
                                Cancel
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Waitinglist;
