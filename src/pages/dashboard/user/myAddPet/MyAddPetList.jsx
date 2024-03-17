/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdOutlineCancel } from "react-icons/md";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import MyForm from "../addPet/MyForm";
import MyAddPetUpdate from "./MyAddPetUpdate";
import { Link } from "react-router-dom";
const MyAddPetList = () => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const columnHelper = createColumnHelper();
  const axios = useAxiosPublic();
  const [editedData, setEditedData] = useState(null);
  const { data: myAddPet = [], refetch } = useQuery({
    queryKey: ["myAddPet"],
    queryFn: async () => {
      const res = await axios.get(`/api/myAddPet/${user?.email}`);
      return res.data;
    },
  });
  // console.log(myAddPet);
  const handleDelete = (dataId) => {
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
        axios.delete(`/api/myAddPet/${dataId}`).then(async (res) => {
          if (res.statusText === "OK") {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      } else if (result.dismiss === "cancel") {
        Swal.fire({
          title: "Cancelled",
          text: "Your donation camp is safe!",
          icon: "info",
        });
      }
    });
  };
  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("image_url", {
      cell: (info) => (
        <img
          src={info?.getValue()}
          alt="..."
          className="w-12 h-10 object-cover"
        />
      ),
      header: "Image",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Pets Name",
    }),
    columnHelper.accessor("age", {
      cell: (info) => (
        <span className="text-sm text-slate-800">{info.getValue()}</span>
      ),
      header: "age",
    }),
    columnHelper.accessor("category", {
      cell: (info) => (
        <span className="text-sm text-slate-800">{info.getValue()}</span>
      ),
      header: "Category",
    }),
    columnHelper.accessor("breed", {
      cell: (info) => (
        <span className="text-sm text-slate-800">{info.getValue()}</span>
      ),
      header: "Breed",
    }),
    columnHelper.accessor("action", {
      cell: (props) => {
        const { row } = props;
        return (
          <>
            <div className="flex items-center font-normal">
              <div>
                <Link
                  to={`${row.original._id}`}
                  className="bg-indigo-950 text-white px-2 text-sm py-1 rounded-md"
                >
                  Update
                </Link>
              </div>
            </div>
          </>
        );
      },
      header: <span className="text-center">Update</span>,
    }),
    columnHelper.accessor("action", {
      cell: (props) => {
        const { row } = props;
        const rowData = row.original;
        return (
          <>
            <div className="flex items-center font-normal">
              <button
                onClick={() => handleDelete(row.original._id)}
                className="bg-red-600 text-white px-2 text-sm py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </>
        );
      },
      header: <span className="text-center">Delete</span>,
    }),
  ];
  const table = useReactTable({
    data: myAddPet,
    columns,
    getRowId: (row) => row.id,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <>
      <div className="p-2 mt-10 max-w-4xl mx-auto text-black font-poppins text-base">
        <div className="">
          <table className="border border-gray-50 w-full text-left overflow-y-scroll table-auto">
            <thead className="bg-indigo-100 text-indigo-950 table-header-group">
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
                    className={`${i % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}`}
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
        <div className="flex items-center justify-end mt-2 gap-2">
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
        </div>
      </div>
    </>
  );
};

export default MyAddPetList;
