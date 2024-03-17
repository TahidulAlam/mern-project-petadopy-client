/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Dialog, Transition } from "@headlessui/react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import DashBoardHeader from "../../../../components/headers/DashBoardHeader";
import Container from "../../../../components/shared/Container";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("number", {
    header: "Number",
  }),
  columnHelper.accessor("Address", {
    header: "Address",
  }),
  columnHelper.accessor("accept", {
    header: "Accept",
  }),
  columnHelper.accessor("reject", {
    header: "Reject",
  }),
];
const AdoptionReq = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [page, setPage] = useState(1);
  const limit = 9;
  const finalData = async () => {
    const url = `/api/adopt/?email=${user?.email}&page=${page}&limit=${limit}`;
    const res = await axiosPrivate.get(url);
    return res.data.result;
  };
  const {
    data: adopRequest,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["adopRequest", user?.email, page],
    queryFn: finalData,
  });
  const table = useReactTable({
    adopRequest,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  const totalPage = Math.ceil((adopRequest?.length || 0) / limit);
  console.log(totalPage);
  if (isError) {
    return <p>Something went wrong {error}</p>;
  }
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.delete(`/api/adopt/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Rejected!",
              text: "Request rejected.",
              icon: "success",
            });
          }
        });
      } else if (result.dismiss === "cancel") {
        Swal.fire({
          title: "Cancelled",
          text: "request is safe!",
          icon: "info",
        });
      }
    });
  };
  const handleAccept = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!", // Corrected parameter name
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.patch(`/api/adopt/${id}`).then((res) => {
          console.log(res);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Accepted!",
              text: "Request Accepted.",
              icon: "success",
            });
          }
        });
      } else if (result.dismiss === "cancel") {
        Swal.fire({
          title: "Cancelled",
          text: "request is safe!",
          icon: "info",
        });
      }
    });
  };
  // console.log(adopRequest);
  return (
    <div>
      <Container>
        {/* <DashBoardHeader content={<h1>Adoption Request</h1>} /> */}
        <div className="max-w-5xl mx-auto">
          <section className="antialiased text-gray-600">
            <div className="flex flex-col justify-center lg:mt-10 p-10">
              <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <header className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800">User</h2>
                </header>
                <div className="p-3">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <th key={header.id}>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {adopRequest?.map((dd, index) => (
                          <tr key={dd._id}>
                            {/* <td className="p-4">{index + 1}</td> */}
                            <td className="p-4">{dd.user_name}</td>
                            <td className="p-4">{dd.user_email}</td>
                            <td className="p-4">{dd.user_number}</td>
                            <td className="p-4">{dd.user_address}</td>
                            <td className="p-4">
                              <button
                                onClick={() => handleAccept(dd._id)}
                                className="bg-emerald-700 px-3 py-1 rounded-md text-white"
                              >
                                Accept
                              </button>
                            </td>
                            <td className="p-4">
                              <button
                                onClick={() => handleDelete(dd._id)}
                                className="bg-red-600 px-3 py-1 rounded-md text-white"
                              >
                                Reject
                              </button>
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

        <div className="join border-2 border-primary flex max-w-sm mx-auto text-white justify-center items-center">
          <button
            onClick={handlePrevious}
            className="bg-indigo-600 px-5 py-2 text-xl"
          >
            «
          </button>
          {Array.from({ length: totalPage }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`${
                  pageNumber === page
                    ? "bg-indigo-100 px-5 py-2 text-xl text-indigo-800"
                    : "bg-indigo-600 px-5 py-2 text-xl"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            onClick={handleNext}
            className="bg-indigo-600 px-5 py-2 text-xl"
          >
            »
          </button>
        </div>
      </Container>
    </div>
  );
};

export default AdoptionReq;
