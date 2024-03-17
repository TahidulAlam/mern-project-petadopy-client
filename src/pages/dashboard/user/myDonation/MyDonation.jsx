/* eslint-disable no-unused-vars */
import React from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../../components/shared/Container";
import DashBoardHeader from "../../../../components/headers/DashBoardHeader";
import Swal from "sweetalert2";

const MyDonation = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const email = user?.email;
  const finalData = async () => {
    const url = `/api/mydonation/${email}`;
    const res = await axiosPrivate.get(url);
    return res.data.result;
  };
  const {
    data: myDonationData,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["myDonatorsData"],
    queryFn: finalData,
  });
  // console.log(myDonationData);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!", // Corrected parameter name
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.delete(`/api/mydonation/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Refunded!",
              text: "Your request accepted.",
              icon: "success",
            });
          }
        });
      } else if (result.dismiss === "cancel") {
        Swal.fire({
          title: "Cancelled",
          text: "Your donation is safe!",
          icon: "info",
        });
      }
    });
  };
  return (
    <div>
      {/* <DashBoardHeader content={<h1>My Donation</h1>}></DashBoardHeader> */}
      <Container>
        <section className="antialiased border-none  text-gray-600 px-4">
          <div className="flex flex-col justify-center h-full">
            <div className="w-full max-w-5xl mx-auto   bg-slate-100 lg:mt-10 mt-5 rounded-lg">
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
                            Donation Camp Name
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            Donate Amount
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Action</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {myDonationData?.map((dd, index) => (
                        <tr key={index}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{dd.campIdsName}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">
                              ${dd.Amount}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-50">
                              <button
                                onClick={() => handleDelete(dd._id)}
                                className="bg-red-600 p-2 rounded-lg hover:bg-red-900"
                              >
                                Refund
                              </button>
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
      </Container>
    </div>
  );
};

export default MyDonation;
