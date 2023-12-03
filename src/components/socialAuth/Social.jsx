/* eslint-disable no-unused-vars */
// import Swal from "Sweetalert";
import { BsGithub } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Social = () => {
  const axiosUser = useAxiosPublic();
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const handleSocialSignIn = (media) => {
    media()
      .then((result) => {
        const userInfo = {
          email: result?.user?.email,
          name: result?.user?.displayName,
        };
        axiosUser.post("/api/users", userInfo);
        Swal.fire("Sign In seccessfully");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => Swal.fire("invalid input"));
  };

  return (
    <div>
      <div className=" flex flex-col justify-center items-center gap-3 p-5">
        <div className="flex justify-center items-center gap-3">
          <button
            className="rounded-full hover:bg-sky-200  text-sky-950 p-2 dark:hover:bg-sky-200 "
            onClick={() => handleSocialSignIn(signInWithGoogle)}
          >
            <BsGoogle className="text-4xl  rounded-full " />
          </button>
          <button
            className="rounded-full hover:bg-sky-200  text-sky-950 p-2 dark:hover:bg-sky-200 "
            onClick={() => handleSocialSignIn(signInWithGithub)}
          >
            <BsGithub className="text-4xl  rounded-full " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Social;
