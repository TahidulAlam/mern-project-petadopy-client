/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
import Social from "../../components/socialAuth/Social";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be at least 8 characters";
  }

  return errors;
};
// myAdm1nMain@mail.com
// Admin111@mail.com
const Registration = () => {
  const { createUser, updateUser } = useAuth();
  const axiosUser = useAxiosPublic();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      const name = values.name;
      const email = values.email;
      const password = values.password;
      const userInfo = {
        name,
        email,
      };
      createUser(email, password).then((res) => {
        updateUser(name).then(() => {
          axiosUser.post("/api/users", userInfo);
          Swal.fire({
            title: "Registration Successful.",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        });
        navigate("/");
      });
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900 "
              />
              {formik.errors.name ? <div>{formik.errors.name}</div> : null}
            </div>
            <div>
              <label htmlFor="email" className="text-sm mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900 "
              />
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </div>
            <div>
              <label htmlFor="password" className="text-sm mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900 "
              />
              {formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <button
            className="bg-violet-100 w-full rounded-md py-3 text-violet-800 font-semibold hover:bg-violet-800 hover:text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-rose-500 text-gray-400">
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <Social />
        <p className="px-6 text-sm text-center text-gray-400">
          Already Have Account?
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Log In
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Registration;
