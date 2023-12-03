/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Container from "../../components/shared/Container";
import { Dialog, Transition } from "@headlessui/react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
import Donate from "./Donate/Donate";
const DonationDetails = () => {
  const data = useLoaderData();
  let [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(null);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const min = 1;
  const max = data.amount;
  const handleChange = (event) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setAmount(value);
  };
  return (
    <div>
      <Container>
        <div className="bg-slate-100 text-gray-700 lg:mt-48 mt-20 p-10 rounded-lg">
          <div className="container grid grid-cols-12 mx-auto">
            <div className="flex flex-col justify-center col-span-12 align-middle bg-no-repeat bg-cover bg-slate-100 lg:col-span-6 lg:h-auto">
              <img className="lg:w-96 w-32 mx-auto" src={data.image} alt="" />
            </div>
            <div className="flex flex-col gap-5 col-span-12 p-6 divide-y lg:col-span-6 lg:p-10 divide-gray-700">
              <div className="pt-6 pb-4 lg:text-xl text-lg space-y-2 flex flex-col lg:text-start text-center">
                Name: <span>{data.name}</span>
                <h1 className="lg:text-3xl text-lg font-bold">
                  {data.description}
                </h1>
                <h1 className="lg:text-3xl text-lg font-bold">
                  maximum Donation Amount :{data.amount}
                </h1>
                <p>Short Description: {data.shortDescription}</p>
                <p>Short Description: {data.longDescription}</p>
                <div>
                  <div className="flex lg:justify-start justify-center">
                    <button
                      type="button"
                      onClick={openModal}
                      className="rounded-md bg-indigo-700 px-10 py-2 text-lg font-medium text-white "
                    >
                      Donate
                    </button>
                  </div>
                  <div className="mt-14 lg:mt-0">
                    <Transition appear show={isOpen} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={closeModal}
                      >
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                          <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                            >
                              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="p-8 rounded border border-gray-200">
                                  <h1 className="font-medium text-3xl">
                                    Be{" "}
                                    <span className="text-indigo-600">
                                      {data.name + `'s`}
                                    </span>{" "}
                                    friend
                                  </h1>
                                  <p className="text-gray-600 mt-6">
                                    {data.description}
                                  </p>
                                  <form>
                                    <div className="mt-8 ">
                                      <div className="p-5">
                                        <label
                                          htmlFor="donate_amount"
                                          className="text-sm text-gray-700 block mb-1 font-medium"
                                        >
                                          Donate Amount :
                                        </label>
                                        <input
                                          type="number"
                                          // min="1"
                                          // max="10"
                                          onChange={handleChange}
                                          value={amount}
                                          // onChange={(e) =>
                                          //   setAmount(e.target.value)
                                          // }

                                          name="donate_amount"
                                          id="number"
                                          className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                          placeholder="Enter your Amount"
                                        />
                                      </div>
                                    </div>
                                  </form>
                                  <div className="p-5">
                                    {!data.campaignPause ? (
                                      <Donate
                                        Amountdata={amount}
                                        campData={data}
                                      />
                                    ) : (
                                      "Donation Campaign is Now Paused"
                                    )}
                                  </div>
                                  <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-blue-100
                                        hover:text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={closeModal}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DonationDetails;
