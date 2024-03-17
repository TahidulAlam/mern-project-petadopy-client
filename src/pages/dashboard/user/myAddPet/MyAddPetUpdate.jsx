/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import moment from "moment";
import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { imageUpload } from "../../../../utils/imageUpload";
import Swal from "sweetalert2";
import Select from "react-select";
import { useLoaderData } from "react-router-dom";

const MyAddPetUpdate = () => {
  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const data = useLoaderData();
  const email = user?.email;
  //   console.log(petName);
  console.log(data);
  const {
    _id,
    name,
    age,
    category,
    location,
    shortDescription,
    longDescription,
    breed,
  } = data || {};
  const formik = useFormik({
    initialValues: {
      email: email || "not fined",
      name: "",
      images: [],
      age: "",
      breed: "",
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
        const res = await axiosPrivate.patch(`/api/petList/${_id}`, values);
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Details updated.`,
            showConfirmButton: false,
            timer: 1500,
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
    <>
      <div className="bg-slate-100 max-w-4xl mx-auto lg:mt-12 mt-5  rounded-xl">
        <div className="lg:max-w-4xl mx-auto lg:p-10 p-3">
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
                  defaultValue={name}
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
                  defaultValue={breed}
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
                  defaultValue={category}
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
                  defaultValue={age}
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
                  defaultValue={location}
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
                  defaultValue={shortDescription}
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
                  defaultValue={longDescription}
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
              className="bg-white text-white p-2 px-10 rounded-lg w-full font-poppins text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MyAddPetUpdate;
