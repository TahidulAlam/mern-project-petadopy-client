/* eslint-disable no-unused-vars */
import React from "react";
import { FaUsers } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Container from "../../../../components/shared/Container";

const AllUsers = () => {
  const Axios = useAxiosPrivate();
  const { data: usersData = [], refetch } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await Axios.get("/api/users");
      return res.data;
    },
  });
  // console.log(usersData);
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
        Axios.delete(`/api/users/${id}`).then((res) => {
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
  console.log("user");
  const handleRule = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.patch(`/api/users/admin/${user._id}`).then((res) => {
          if (res.data.acknowledged) {
            refetch();
            Swal.fire({
              //   title: "Deleted!",
              text: `${user.name} is Admin now`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <Container>
        <section className="antialiased  text-gray-600 h-screen px-4">
          <div className="flex flex-col justify-center lg:mt-10 p-10">
            <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">User</h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Email</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Role</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Action
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {usersData?.map((user) => (
                        <tr key={user._id}>
                          <td className="">{user.name}</td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">
                              {user?.email || "name"}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            {user?.role === "admin" ? (
                              <h1 className="font-bold">Admin</h1>
                            ) : (
                              <button
                                className="btn bg-indigo-700 rounded-lg text-2xl text-white hover:text-black p-2"
                                onClick={() => handleRule(user)}
                              >
                                <FaUsers />
                              </button>
                            )}
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <button
                              className="btn text-2xl bg-indigo-700 rounded-lg text-white p-2 hover:text-black"
                              onClick={() => handleDelete(user._id)}
                            >
                              <RiDeleteBin6Fill />
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
      </Container>
    </div>
  );
};

export default AllUsers;
