/* eslint-disable no-unused-vars */
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/home/Home";
import Donation from "../pages/donation/Donation";
import PetListing from "../pages/petListing/PetListing";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import Dashboard from "../pages/dashboard/Dashboard";
import PetListNew from "../pages/petListing/PetListNew";
import PetDetails from "../pages/petDetails/PetDetails";
import AllUsers from "../pages/dashboard/admin/allUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import AddPet from "../pages/dashboard/user/addPet/AddPet";
import AdoptionReq from "../pages/dashboard/user/adoptionReq/AdoptionReq";
import MyAddPet from "../pages/dashboard/user/myAddPet/MyAddPet";
// import MyDonation from "../pages/dashboard/user/myDonation/MyDonation";
import MyDonationCamp from "../pages/dashboard/user/myDonationCamp/MyDonationCamp";
import UserHome from "../pages/dashboard/user/userHome/UserHome";
import UpdatePet from "../pages/dashboard/user/updatePet/UpdatePet";
import CreateDonation from "../pages/dashboard/user/createDonation/CreateDonation";
import DonationDetails from "../pages/donationDetails/DonationDetails";
import UpdateDonation from "../pages/dashboard/user/updateDonation.jsx/UpdateDonation";
import AllPets from "../pages/dashboard/admin/allPets/AllPets";
import AllDonation from "../pages/dashboard/admin/allDonations/AllDonation";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/petlisting",
        // element: <PetListing></PetListing>,
        element: (
          <PrivateRoute>
            <PetListNew></PetListNew>,
          </PrivateRoute>
        ),
      },
      {
        path: "/petlisting/:id",
        element: <PetDetails></PetDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/petList/${params.id}`),
      },
      {
        path: "/donation",
        element: <Donation></Donation>,
      },
      {
        path: "/donation/:id",
        element: <DonationDetails></DonationDetails>,
        loader: async ({ params }) => {
          try {
            const response = await fetch(
              `http://localhost:5000/api/DonationCamp/${params.id}`
            );
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        },
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/registration",
    element: <Registration></Registration>,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      // Admin Route
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "allPets",
        element: <AllPets></AllPets>,
      },
      {
        path: "allDonations",
        element: <AllDonation></AllDonation>,
      },

      //User Route
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "addPet",
        element: <AddPet></AddPet>,
      },
      {
        path: "CreateDonation",
        element: <CreateDonation></CreateDonation>,
      },
      {
        path: "updatePet/:id",
        element: <UpdatePet></UpdatePet>,
        loader: async ({ params }) => {
          const Data = await fetch(
            `http://localhost:5000/api/myAddPet/${params.id}`
          );
          return Data;
        },
      },
      {
        path: "adoptionReq",
        element: <AdoptionReq></AdoptionReq>,
      },
      {
        path: "myAddPet",
        element: <MyAddPet></MyAddPet>,
      },
      {
        path: "updateDonation/:id",
        element: <UpdateDonation></UpdateDonation>,
        loader: async ({ params }) => {
          try {
            const response = await fetch(
              `http://localhost:5000/api/allDonationCamp/${params.id}`
            );
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        },
      },
      {
        path: "myDonationCamp",
        element: <MyDonationCamp></MyDonationCamp>,
      },
    ],
  },
]);

export default MainRouter;
