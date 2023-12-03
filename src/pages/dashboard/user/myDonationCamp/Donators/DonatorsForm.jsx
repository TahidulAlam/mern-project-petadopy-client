/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

const DonatorsForm = ({ campId }) => {
  //   console.log(campId);
  const axiosPrivate = useAxiosPrivate();
  const finalData = async () => {
    const url = `/api/donators/${campId}`;
    const res = await axiosPrivate.get(url);
    return res.data.result;
  };
  const {
    data: myDonatorsData,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["myDonatorsData"],
    queryFn: finalData,
  });
  return (
    <div>
      <section className="antialiased border-none  text-gray-600 px-4">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-xl mx-auto bg-white rounded-sm ">
            <header className="px-5 py-4">
              <h2 className="font-semibold text-gray-800">Donators</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Donators Name
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Donate Amount
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {myDonatorsData?.map((dd) => (
                      <tr key={dd._id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{dd.name}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-green-500">
                            ${dd.Amount}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatorsForm;
