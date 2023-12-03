/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment";
import axios from "axios";

const MyForm = () => {
  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const email = user?.email;
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [imageLink, setImageLink] = useState("");
  const handleImage = async (selectedFile) => {
    setImage(selectedFile);

    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "myCloud");
    // data.append("cloud_name", "dnan6s4xq");
    const cloudnaru_url =
      "https://api.cloudinary.com/v1_1/dnan6s4xq/image/upload";
    try {
      if (selectedFile === null) {
        return alert("Please Upload an image");
      }

      const res = await fetch(cloudnaru_url, {
        method: "POST",
        body: data,
      });

      const cloudData = await res.json();
      console.log(cloudData);
      setUrl(cloudData.url);
      const updatedImageLink = { ...imageLink, url: cloudData.url };
      setImageLink(updatedImageLink);
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: email || "not fined",
      name: "",
      image: "",
      image_url: imageLink,
      age: "",
      category: "",
      location: "",
      shortDescription: "",
      longDescription: "",
      file: null,
      adopted: false,
      dateField: moment().format("YYYY-MM-DD"),
    },
    onSubmit: async (values, actions) => {
      console.log(values);
      actions.setSubmitting(false);

      const Res = await axiosPrivate.post("/api/petList", values);
      console.log(Res);
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
        <input
          type="file"
          id="file"
          name="file"
          //   value={image}
          onChange={(e) => handleImage(e.target.files[0])}
          className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
        />
        {/* {formik.errors.file && <div>{formik.errors.file}</div>} */}
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-4">
          <div>
            <label htmlFor="name">Image Link:</label>
            <input
              type="text"
              id="image"
              name="image"
              onChange={formik.handleChange}
              value={formik.values.image}
              defaultValue={imageLink}
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
          <div className="lg:col-span-2 col-span-1">
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

export default MyForm;
