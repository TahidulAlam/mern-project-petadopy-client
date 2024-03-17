/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { FaUsers } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import Container from "../../../../components/shared/Container";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import DashBoardHeader from "../../../../components/headers/DashBoardHeader";

// const columns = [
//   columnHelper.accessor("serial", {
//     header: "Serial",
//   }),
//   columnHelper.accessor("name", {
//     header: "Pet Name",
//   }),
//   columnHelper.accessor("category", {
//     header: "Pet Category",
//   }),
//   columnHelper.accessor("adopted_status", {
//     header: "Adoption Status",
//   }),
//   columnHelper.accessor("update", {
//     header: "Update",
//   }),
//   columnHelper.accessor("delete", {
//     header: "Delete",
//   }),
// ];

const AllPets = () => {
  const axiosPrivate = useAxiosPrivate();
  const columnHelper = createColumnHelper();
  const [page, setPage] = useState(1);
  const columns = [
    columnHelper.accessor("serial", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
    }),
    columnHelper.accessor("category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Pet Category",
    }),
    columnHelper.accessor("adopted_status", {
      cell: (info) => (
        <span className="text-sm text-slate-800">{info.getValue()}</span>
      ),
      header: "description",
    }),
    columnHelper.accessor("action", {
      cell: (props) => {
        const { row } = props;
        const rowData = row.original;
        // const { _id, image, specialties, description, type } = editedData || {};
        return (
          <>
            <div className="flex gap-3 font-normal">
              {/* <button
                onClick={() => handleDelete(row.original._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button> */}
            </div>
          </>
        );
      },
      header: "description",
    }),
  ];
  const getData = async () => {
    const url = `/api/allPets`;
    const res = await axiosPrivate.get(url);
    return res.data;
  };

  const {
    data: AllpetsData,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["AllpetsData"],
    queryFn: getData,
  });
  console.log(AllpetsData);
  const table = useReactTable({
    data: AllpetsData,
    columns,
    getRowId: (row) => row.id,
    // state: { globalFilter },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  // const limit = 9;

  // const handlePrevious = () => {
  //   if (page > 1) {
  //     setPage(page - 1);
  //   }
  // };
  // const handleNext = () => {
  //   if (page < totalPage) {
  //     setPage(page + 1);
  //   }
  // };
  // const totalPage = Math.ceil((AllpetsData?.length || 0) / limit);
  // if (isError) {
  //   return <p>Something went wrong {error}</p>;
  // }
  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!", // Corrected parameter name
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axiosPrivate.delete(`/api/allPets/${id}`).then((res) => {
  //         if (res.data.deletedCount > 0) {
  //           refetch();
  //           Swal.fire({
  //             title: "Deleted!",
  //             text: "Your file has been deleted.",
  //             icon: "success",
  //           });
  //         }
  //       });
  //     } else if (result.dismiss === "cancel") {
  //       Swal.fire({
  //         title: "Cancelled",
  //         text: "Your donation camp is safe!",
  //         icon: "info",
  //       });
  //     }
  //   });
  // };

  return (
    <div>
      <Container>
        {/* <DashBoardHeader content={<h1>My Donation campaign</h1>} /> */}
        {/* <div className="max-w-5xl mx-auto">
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
                        {AllpetsData?.map((dd, index) => (
                          <tr key={dd._id}>
                            <td className="p-4">{index + 1}</td>
                            <td className="p-4">{dd.name}</td>
                            <td className="p-4">{dd.category}</td>
                            <td className="p-4">
                              {!dd.adopted ? "Not Adopted" : "Adopted"}
                            </td>
                            <td className="p-4">
                              <Link to={`/dashboard/updatePet/${dd._id}`}>
                                <button className="bg-emerald-700 px-3 py-1 rounded-md text-white">
                                  Update
                                </button>
                              </Link>
                            </td>
                            <td className="p-4">
                              <button
                                onClick={() => handleDelete(dd._id)}
                                className="bg-red-600 px-3 py-1 rounded-md text-white"
                              >
                                Delete
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
        </div> */}
        <div className="p-2 mt-5 max-w-5xl mx-auto text-black overflow-hidden ">
          <div className="flex justify-between mb-2">
            {/* <div className="w-full flex items-center gap-1">
            <TableSearch
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-100 text-black"
              placeholder="Search all columns..."
            />
          </div> */}
          </div>
          <div className="">
            <table className="border border-gray-50 w-full text-left overflow-y-scroll table-auto">
              <thead className="bg-indigo-100 table-header-group">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="capitalize px-3.5 py-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="">
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`${
                        i % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-3.5 py-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr className="text-center h-32">
                    <td colSpan={12}>No Record Found!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* <div className="flex items-center justify-end mt-2 gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 border border-gray-300 px-2"
            >
              {"<"}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 border border-gray-300 px-2"
            >
              {">"}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <div className="lg:block hidden">
              <span className="flex items-center gap-1">
                | Go to page:
                <input
                  type="number"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) =>
                    table.setPageIndex(
                      e.target.value ? Number(e.target.value) - 1 : 0
                    )
                  }
                  className="border p-1 rounded w-16 bg-transparent"
                />
              </span>
            </div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="p-2 bg-transparent"
            >
              {[10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default AllPets;
