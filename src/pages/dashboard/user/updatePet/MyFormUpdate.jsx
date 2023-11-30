/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Select from "react-select";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment";
import { useFormik } from "formik";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_imageHosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
// console.log(image_hosting_api);
const MyFormUpdate = ({ defautltDd }) => {
  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const email = user?.email;
  const [image, setImage] = useState(null);
  const handleImage = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      const response = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error uploading image:", error.response.data);
    }
  };
  const {
    _id,
    age,
    category,
    email: updateEmail,
    image: updateImage,
    location,
    longDescription,
    name,
    shortDescription,
  } = defautltDd || {};
  const formik = useFormik({
    initialValues: {
      email: updateEmail || "not fined",
      name: name,
      image: updateImage,
      age: age,
      category: category,
      location: location,
      shortDescription: shortDescription,
      longDescription: longDescription,
      file: null,
      adopted: false,
      dateField: moment().format("YYYY-MM-DD"),
    },
    onSubmit: async (values, actions) => {
      console.log(values);
      actions.setSubmitting(false);
      try {
        const Res = await axiosPublic.patch(`/api/petList/${_id}`, values);
        if (Res.data.modifiedCount) {
          // reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Details updated.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

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
    <div>
      <div>
        <label htmlFor="file">File:</label>
        <img className="w-32" src={image} />
        <input
          type="file"
          id="file"
          name="file"
          onChange={(e) => handleImage(e)}
          className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
        />
        {/* {formik.errors.file && <div>{formik.errors.file}</div>} */}
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-4"
      >
        <div>
          <label htmlFor="name">Image Link:</label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={formik.handleChange}
            value={formik.values.image}
            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          />
          {formik.errors.image && <div>{formik.errors.image}</div>}
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          />
          {formik.errors.name && <div>{formik.errors.name}</div>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          />
          {formik.errors.age && <div>{formik.errors.age}</div>}
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
          <label htmlFor="location">Location:</label>
          <textarea
            type="text"
            id="location"
            name="location"
            rows={2}
            onChange={formik.handleChange}
            value={formik.values.location}
            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          />
          {formik.errors.location && <div>{formik.errors.location}</div>}
        </div>
        <div>
          <label htmlFor="shortDescription">Short Description:</label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            rows={2}
            onChange={formik.handleChange}
            value={formik.values.shortDescription}
            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          />
          {formik.errors.shortDescription && (
            <div>{formik.errors.shortDescription}</div>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="longDescription">Long Description:</label>
          <textarea
            id="longDescription"
            name="longDescription"
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.longDescription}
            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          />
          {formik.errors.longDescription && (
            <div>{formik.errors.longDescription}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded col-span-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyFormUpdate;
