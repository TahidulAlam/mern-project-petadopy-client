/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Container from "../../../../components/shared/Container";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import Pagination from "../../../../components/shared/Pagination";
import { Link } from "react-router-dom";
import DashBoardHeader from "../../../../components/headers/DashBoardHeader";
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: "Pet name",
  }),
  columnHelper.accessor("category", {
    header: "Pet Category",
  }),
  columnHelper.accessor("image", {
    header: "Pet Image",
  }),
  columnHelper.accessor("adopted_status", {
    header: "Adoption Status",
  }),
  columnHelper.accessor("update", {
    header: "Update",
  }),
  columnHelper.accessor("delete", {
    header: "Delete",
  }),
  columnHelper.accessor("adopted", {
    header: "Adopted",
  }),
];
const MyAddPet = () => {
  const { user } = useAuth();
  const axioPrivate = useAxiosPrivate();
  const [page, setPage] = useState(1);
  const limit = 9;

  const finalData = async () => {
    // const url = `/api/myAddPet/${user?.email}`;
    const res = await axioPrivate.get();
    return res.data.result;
  };

  const {
    data: myAddPetdata,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["myAddPetdata", user?.email, page],
    queryFn: finalData,
  });
  const table = useReactTable({
    myAddPetdata,
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
  const totalPage = Math.ceil((myAddPetdata?.length || 0) / limit);
  // console.log(totalPage);
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
        axioPrivate.delete(`/api/myAddPet/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      {/* <DashBoardHeader content={<h1>My Add Pet</h1>} /> */}
      <Container>
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
                        {myAddPetdata?.map((dd, index) => (
                          <tr key={dd._id}>
                            <td className="p-4">{index + 1}</td>
                            <td className="p-4">{dd.name}</td>
                            <td className="p-4">{dd.category}</td>
                            <td className="p-4">{dd.image}</td>
                            <td className="p-4">
                              {!dd.adopted ? "Not Adopted" : ""}
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
                            <td className="p-4">
                              <button className="bg-indigo-950 px-3 py-1 rounded-md text-white">
                                Adopted
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

export default MyAddPet;
