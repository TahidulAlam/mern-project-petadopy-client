/* eslint-disable no-unused-vars */
import React from "react";
import { send } from "emailjs-com";
// import img from "../../../assets/banner2.png";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Review = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    send("service_ql9cbv5", "template_1d4a3wr", data, "LyeAN-TelrbzPufAT")
      .then((response) => {
        console.log("success", response.status, response.text);
        formSuccess();
      })
      .catch((err) => {
        console.log("Try again", err);
      });
  };

  const formSuccess = () => {
    Swal.fire("Thanks for Submitting");
    reset(); // Reset the form using the react-hook-form reset function
  };

  return (
    <div>
      <section className="flex items-center font-poppins">
        <div className="justify-center flex-1 max-w-7xl px-4 py-6 mx-auto lg:py-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 p-2 ">
            <div className="p-6 mb-6 backdrop-blur-xl bg-white/30 h-full rounded-lg">
              <h2 className="mb-6 text-xl font-semibold text-left text-white ">
                Leave a comment
              </h2>
              <form
                id="queryForm"
                onSubmit={handleSubmit(onSubmit)}
                className=""
              >
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="your email"
                    required=""
                    name="reply_to"
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 backdrop-blur-xl bg-white/30 border rounded   "
                    {...register("reply_to", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.reply_to?.message && (
                    <p className="errors">{errors.reply_to?.message}</p>
                  )}
                </div>
                <div className="mb-6">
                  <textarea
                    type="message"
                    name="message"
                    placeholder="write a comment"
                    required=""
                    className="block w-full px-4 leading-tight text-gray-700 backdrop-blur-xl bg-white/30 border rounded  py-7  "
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 20,
                        message: "Minimum 20 characters required",
                      },
                      maxLength: {
                        value: 500,
                        message: "Maximum 500 characters allowed",
                      },
                    })}
                  ></textarea>
                  {errors.message?.message && (
                    <p className="errors">{errors.message?.message}</p>
                  )}
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-medium text-gray-950 bg-white rounded-lg"
                  >
                    Submit comment
                  </button>
                </div>
              </form>
            </div>
            <div className="rounded-lg">
              {/* <img src={img} alt="" className="h-full rounded-lg" /> */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="grid gap-4">
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src="https://i.ibb.co/F49tX1r/cute-kitten.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src="https://i.ibb.co/gynSmvy/dogImage.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src="https://i.ibb.co/BZgrDwf/kitten.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src="https://i.ibb.co/g7rrw6b/lovely-new-image.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src="https://i.ibb.co/7YxHNzk/portrait-dogs-23-2150553627.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src="https://i.ibb.co/znVnrWt/s.webp"
                      alt=""
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src="https://i.ibb.co/sWkBz72/2150752966.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src="https://i.ibb.co/M934Bx4/adorable-dog.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src="https://i.ibb.co/4W5G3jg/close-Up-Eyes.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src="https://i.ibb.co/0XjYf3d/cute-Bg-Image.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src="https://i.ibb.co/F49tX1r/cute-kitten.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src="https://i.ibb.co/BZgrDwf/kitten.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Review;
