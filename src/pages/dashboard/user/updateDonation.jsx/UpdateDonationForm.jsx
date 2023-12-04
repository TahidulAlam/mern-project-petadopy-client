/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import { useFormik } from "formik";
import moment from "moment";
import Swal from "sweetalert2";

const UpdateDonationForm = ({ defaultData }) => {
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
      email: defaultData.updateEmail || "not fined",
      name: defaultData.name,
      amount: defaultData.amount,
      image: defaultData.image,
      last_date: defaultData.last_date,
      shortDescription: defaultData.shortDescription,
      longDescription: defaultData.longDescription,
      file: null,
      campaignPause: false,
      dateField: moment().format("YYYY-MM-DD"),
    },
    onSubmit: async (values, actions) => {
      console.log(values);
      actions.setSubmitting(false);

      const Res = await axiosPrivate.patch(
        `/api/allDonationCamp/${defaultData._id}`,
        values
      );
      if (Res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Details updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });
  console.log(defaultData);
  return (
    <div>
      <div>
        <label htmlFor="file">File:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={(e) => handleImage(e.target.files[0])}
          className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
        />
        {/* {formik.errors.file && <div>{formik.errors.file}</div>} */}
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-4"
      >
        <div>
          <label htmlFor="image">Image Link:</label>
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
          <label htmlFor="name">Image Link:</label>
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
          <label htmlFor="amount">Maximum Donation amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            onChange={formik.handleChange}
            value={formik.values.amount}
            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          />
          {formik.errors.amount && <div>{formik.errors.amount}</div>}
        </div>
        <div>
          <label htmlFor="last_date">last Date of Donation:</label>
          <input
            type="date"
            id="last_date"
            name="last_date"
            onChange={formik.handleChange}
            value={formik.values.last_date}
            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          />
          {formik.errors.last_date && <div>{formik.errors.last_date}</div>}
        </div>
        {/* <div>
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
        </div> */}

        {/* <div>
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
        </div> */}
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

export default UpdateDonationForm;
