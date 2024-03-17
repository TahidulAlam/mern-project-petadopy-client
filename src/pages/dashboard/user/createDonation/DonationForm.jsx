/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Select from "react-select";
import Swal from "sweetalert2";
import { imageUpload } from "../../../../utils/imageUpload";

const DonationForm = () => {
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
  };
  const formik = useFormik({
    initialValues: {
      email: email || "not fined",
      name: "",
      amount: "",
      image: "",
      last_date: "",
      shortDescription: "",
      longDescription: "",
      file: null,
      campaignPause: false,
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
        const Res = await axiosPrivate.post("/api/createDonationCamp", values);
        // console.log(Res);
        if (Res.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Donation Campain Created.`,
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
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2 lg:p-4 p-2 font-poppins"
      >
        <div>
          <label htmlFor="name">Camp Name:</label>
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
          <label htmlFor="image">Images:</label>
          <input
            type="file"
            id="image"
            name="image"
            multiple
            onChange={handleUploadImage}
            className="bg-white border border-gray-200 rounded-lg py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          />
          {formik.errors.image && <div>{formik.errors.image}</div>}
        </div>

        <div>
          <label htmlFor="amount">Maximum Donation amount :</label>
          <input
            type="number"
            id="amount"
            name="amount"
            onChange={formik.handleChange}
            value={formik.values.amount}
            className="bg-white border border-gray-200 rounded-lg py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
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
            className="bg-white border border-gray-200 rounded-lg py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
          />
          {formik.errors.last_date && <div>{formik.errors.last_date}</div>}
        </div>
        <div className="col-span-2">
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
        <div className="col-span-2">
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

        <button
          type="submit"
          className="bg-white text-white p-2 rounded col-span-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
