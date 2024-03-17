/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import { imageUpload } from "../../../../utils/imageUpload";

const MyForm = () => {
  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const email = user?.email;

  const formik = useFormik({
    initialValues: {
      email: email || "not fined",
      name: "",
      images: [],
      age: "",
      category: "",
      location: "",
      shortDescription: "",
      longDescription: "",
      adopted: false,
      dateField: moment().format("YYYY-MM-DD"),
    },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(false);
      try {
        const uploadedImageUrls = await Promise.all(
          values.images.map(async (image) => {
            const img_url = await imageUpload(image);
            return img_url?.data?.display_url;
          })
        );
        values.image_urls = uploadedImageUrls;
        const res = await axiosPrivate.post("/api/petList", values);
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Pet added!",
            text: "Pet added Successfully.",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
  });
  const handleUploadImage = (event) => {
    formik.setFieldValue("images", Array.from(event.target.files));
  };

  const categoryOptions = [
    { value: "Fish", label: "Fish" },
    { value: "Bird", label: "Bird" },
    { value: "Cat", label: "Cat" },
    { value: "Dog", label: "Dog" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Horse", label: "Horse" },
  ];

  const handleCategoryChange = (selectedOption) => {
    formik.setFieldValue(
      "category",
      selectedOption ? selectedOption.value : ""
    );
  };

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-2 gap-1 p-1 font-poppins lg:text-base text-sm">
          <div>
            <label htmlFor="name">Images:</label>
            <input
              id="image"
              name="image"
              type="file"
              multiple
              onChange={handleUploadImage}
              className="bg-white border border-gray-200 rounded-lg py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
            />

            {formik.errors.images && <div>{formik.errors.images}</div>}
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="bg-white border border-gray-200 rounded-lg py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
            />
            {formik.errors.name && <div>{formik.errors.name}</div>}
          </div>
          <div>
            <label htmlFor="breed">Breed:</label>
            <input
              type="breed"
              id="breed"
              name="breed"
              onChange={formik.handleChange}
              value={formik.values.breed}
              className="bg-white border border-gray-200 rounded-lg py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
            />
            {formik.errors.breed && <div>{formik.errors.breed}</div>}
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <Select
              id="category"
              name="category"
              options={categoryOptions}
              onChange={handleCategoryChange}
              value={categoryOptions.find(
                (option) => option.value === formik.values.category
              )}
              className="mb-2"
            />
            {formik.errors.category && <div>{formik.errors.category}</div>}
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              onChange={formik.handleChange}
              value={formik.values.age}
              className="bg-white border border-gray-200 rounded-lg py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
            />
            {formik.errors.age && <div>{formik.errors.age}</div>}
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <textarea
              type="text"
              id="location"
              name="location"
              rows={1}
              onChange={formik.handleChange}
              value={formik.values.location}
              className="bg-white border border-gray-200 rounded-lg py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
            />
            {formik.errors.location && <div>{formik.errors.location}</div>}
          </div>
          <div className="lg:col-span-2 col-span-1">
            <label htmlFor="shortDescription">Short Description:</label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              rows={2}
              onChange={formik.handleChange}
              value={formik.values.shortDescription}
              className="bg-white border border-gray-200 rounded-lg py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
            />
            {formik.errors.shortDescription && (
              <div>{formik.errors.shortDescription}</div>
            )}
          </div>
          <div className="lg:col-span-2 col-span-1">
            <label htmlFor="longDescription">Long Description:</label>
            <textarea
              id="longDescription"
              name="longDescription"
              rows={4}
              onChange={formik.handleChange}
              value={formik.values.longDescription}
              className="bg-white border border-gray-200 rounded-lg py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
            />
            {formik.errors.longDescription && (
              <div>{formik.errors.longDescription}</div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-indigo-800 text-white p-2 px-10 rounded-lg w-full font-poppins text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyForm;
