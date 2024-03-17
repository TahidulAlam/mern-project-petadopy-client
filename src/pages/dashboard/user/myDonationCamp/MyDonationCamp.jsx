/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import DashBoardHeader from "../../../../components/headers/DashBoardHeader";
import Container from "../../../../components/shared/Container";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import { Dialog, Transition } from "@headlessui/react";
import useAdmin from "../../../../hooks/useAdmin";
import DonatorsForm from "./Donators/DonatorsForm";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("serial", {
    header: "Serial",
  }),
  columnHelper.accessor("name", {
    header: "Campaign name",
  }),

  columnHelper.accessor("maximum donation", {
    header: "maximum donation",
  }),
  columnHelper.accessor("update", {
    header: "Update",
  }),
  columnHelper.accessor("pause", {
    header: "Pause",
  }),
  // columnHelper.accessor("adopted", {
  //   header: "Adopted",
  // }),
  columnHelper.accessor("delete", {
    header: "Delete",
  }),
  columnHelper.accessor("View_Donators", {
    header: "View Donators",
  }),
];
const MyDonationCamp = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [page, setPage] = useState(1);
  let [isOpen, setIsOpen] = useState(false);
  const [campId, setCampId] = useState(null);
  const isAdmin = useAdmin();
  const limit = 9;
  const finalData = async () => {
    const url = `/api/myDonationCamp/?email=${user?.email}&page=${page}&limit=${limit}`;
    const res = await axiosPrivate.get(url);
    return res.data.result;
  };
  const {
    data: myDCampData,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["myDCampData", user?.email, page],
    queryFn: finalData,
  });
  const table = useReactTable({
    myDCampData,
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
  const totalPage = Math.ceil((myDCampData?.length || 0) / limit);
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
      confirmButtonText: "Yes, delete it!", // Corrected parameter name
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.delete(`/api/myDonationCamp/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
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
  const handlePause = (id) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Paused Now",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.patch(`/api/myDonationCampPaused/${id}`).then((res) => {
          // console.log(res);
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              //   title: "Deleted!",
              text: `Paused Now`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleUnPause = (id) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, UnPaused Now!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate.patch(`/api/myDonationCampUnPaused/${id}`).then((res) => {
          // console.log(res);
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              //   title: "Deleted!",
              text: `Donation Camp UnPaused Now`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  // console.log(myDCampData);
  const handleViwDonate = (id) => {
    // console.log(id);
    setCampId(id);
    openModal();
  };
  return (
    <div>
      <Container>
        {/* <DashBoardHeader content={<h1>My Donation campaign</h1>} /> */}
        <div className="max-w-5xl mx-auto">
          <section className="antialiased text-gray-600">
            <div className="flex flex-col justify-center lg:mt-10 p-10">
              <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <header className="px-5 py-4 border-b border-gray-100"></header>
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
                        {myDCampData?.map((dd, index) => (
                          <tr key={dd._id}>
                            <td className="py-6 px-2">{index + 1}</td>
                            <td className="py-6 px-2">{dd.name}</td>
                            {/* <td className="py-6 px-2">{dd.category}</td> */}
                            {/* <td className="py-6 px-2">{dd.image}</td> */}
                            <td className="py-6 px-2">${dd.amount}</td>
                            <td className="py-6 px-2">
                              <Link to={`/dashboard/updateDonation/${dd._id}`}>
                                <button className="bg-emerald-700 px-3 py-1 rounded-md text-white">
                                  Update
                                </button>
                              </Link>
                            </td>
                            <td className="py-6 px-2">
                              {dd.campaignPause ? (
                                <button
                                  onClick={() => handleUnPause(dd._id)}
                                  className="bg-emerald-700 px-3 py-1 rounded-md text-white"
                                >
                                  UnPause Now
                                </button>
                              ) : (
                                <button
                                  onClick={() => handlePause(dd._id)}
                                  className="bg-emerald-700 px-3 py-1 rounded-md text-white"
                                >
                                  Pause Now
                                </button>
                              )}
                              {/* <button
                                onClick={() => handleAdopt(dd._id)}
                                className="bg-emerald-700 px-3 py-1 rounded-md text-white"
                              >
                                Pause
                              </button> */}
                            </td>
                            <td className="py-6 px-2">
                              {isAdmin ? (
                                <button
                                  onClick={() => handleDelete(dd._id)}
                                  className="bg-red-600 px-3 py-1 rounded-md text-white"
                                >
                                  Delete
                                </button>
                              ) : (
                                "Not Allowd"
                              )}
                            </td>
                            <td>
                              {/* <button className="bg-indigo-950 px-3 py-1 rounded-md text-white">
                                View Donation
                              </button> */}
                              <button
                                type="button"
                                onClick={() => handleViwDonate(dd._id)}
                                className="rounded-md bg-indigo-700 px-3 py-1 text-base font-medium text-white "
                              >
                                View Donators
                              </button>
                              <div className="lg:mt-0">
                                <Transition appear show={isOpen} as={Fragment}>
                                  <Dialog
                                    as="div"
                                    className="relative z-10"
                                    onClose={closeModal}
                                  >
                                    <Transition.Child
                                      as={Fragment}
                                      enter="ease-out duration-300"
                                      enterFrom="opacity-0"
                                      enterTo="opacity-100"
                                      leave="ease-in duration-200"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <div className="fixed inset-0 bg-black/25" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 overflow-y-auto">
                                      <div className="flex min-h-full items-center justify-center py-6 px-2 text-center">
                                        <Transition.Child
                                          as={Fragment}
                                          enter="ease-out duration-300"
                                          enterFrom="opacity-0 scale-95"
                                          enterTo="opacity-100 scale-100"
                                          leave="ease-in duration-200"
                                          leaveFrom="opacity-100 scale-100"
                                          leaveTo="opacity-0 scale-95"
                                        >
                                          <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <div className="p-8 rounded border border-gray-200">
                                              <DonatorsForm campId={campId} />
                                            </div>
                                          </Dialog.Panel>
                                        </Transition.Child>
                                      </div>
                                    </div>
                                  </Dialog>
                                </Transition>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* <div className="lg:mt-0">
                      <Transition appear show={isOpen} as={Fragment}>
                        <Dialog
                          as="div"
                          className="relative z-10"
                          onClose={closeModal}
                        >
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <div className="fixed inset-0 bg-black/25" />
                          </Transition.Child>

                          <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center py-6 px-2 text-center">
                              <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                              >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                  <div className="p-8 rounded border border-gray-200">
                                    <DonatorsForm dcEmail={user?.email} />
                                  </div>
                                </Dialog.Panel>
                              </Transition.Child>
                            </div>
                          </div>
                        </Dialog>
                      </Transition>
                    </div> */}
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

export default MyDonationCamp;
