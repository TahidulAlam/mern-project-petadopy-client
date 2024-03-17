/* eslint-disable no-unused-vars */
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/home/Home";
import Donation from "../pages/donation/Donation";
// import PetListing from "../pages/petListing/PetListing";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import Dashboard from "../pages/dashboard/Dashboard";
import PetListNew from "../pages/petListing/PetListNew";
import PetDetails from "../pages/petDetails/PetDetails";
import AllUsers from "../pages/dashboard/admin/allUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import AddPet from "../pages/dashboard/user/addPet/AddPet";
import AdoptionReq from "../pages/dashboard/user/adoptionReq/AdoptionReq";
// import MyAddPet from "../pages/dashboard/user/myAddPet/MyAddPet";
// import MyDonation from "../pages/dashboard/user/myDonation/MyDonation";
import MyDonationCamp from "../pages/dashboard/user/myDonationCamp/MyDonationCamp";
import UserHome from "../pages/dashboard/user/userHome/UserHome";
import UpdatePet from "../pages/dashboard/user/updatePet/UpdatePet";
import CreateDonation from "../pages/dashboard/user/createDonation/CreateDonation";
import DonationDetails from "../pages/donationDetails/DonationDetails";
import UpdateDonation from "../pages/dashboard/user/updateDonation.jsx/UpdateDonation";
import AllPets from "../pages/dashboard/admin/allPets/AllPets";
import AllDonation from "../pages/dashboard/admin/allDonations/AllDonation";
import ErrorPage from "../components/error/ErrorPage";
import AdminRoute from "./AdminRoute";
import MyDonation from "../pages/dashboard/user/myDonation/MyDonation";
import VetDoctor from "../pages/vetDoctor/VetDoctor";
import MyAddPetList from "../pages/dashboard/user/myAddPet/MyAddPetList";
import MyAddPetUpdate from "../pages/dashboard/user/myAddPet/MyAddPetUpdate";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/petlisting",
        // element: <PetListing></PetListing>,
        element: <PetListNew></PetListNew>,
      },
      {
        path: "/petlisting/:id",
        element: (
          <PrivateRoute>
            <PetDetails></PetDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          // fetch(`https://petadopy-backend.vercel.app/api/petList/${params.id}`),
          fetch(`http://localhost:5000/api/petList/${params.id}`),
      },
      {
        path: "/donation",
        element: <Donation></Donation>,
      },
      {
        path: "/vetDoctor",
        element: <VetDoctor />,
      },
      {
        path: "/donation/:id",
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>,
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          try {
            const response = await fetch(
              `https://petadopy-backend.vercel.app/api/allDonationCamp/${params.id}`
              // `http://localhost:5000/api/allDonationCamp/${params.id}`
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
    element: (
      <PrivateRoute>
        <Dashboard />,
      </PrivateRoute>
    ),
    children: [
      // Admin Route
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>,
          </AdminRoute>
        ),
      },
      {
        path: "allPets",
        element: (
          <AdminRoute>
            <AllPets></AllPets>,
          </AdminRoute>
        ),
      },
      {
        path: "allDonations",
        element: (
          <AdminRoute>
            <AllDonation></AllDonation>,
          </AdminRoute>
        ),
      },

      //User Route
      {
        path: "userHome",
        // index: true,
        element: (
          <PrivateRoute>
            <UserHome></UserHome>,
          </PrivateRoute>
        ),
      },
      {
        path: "addPet",
        element: (
          <PrivateRoute>
            <AddPet></AddPet>,
          </PrivateRoute>
        ),
      },
      {
        path: "myDonation",
        element: <MyDonation></MyDonation>,
      },
      {
        path: "CreateDonation",
        element: (
          <PrivateRoute>
            <CreateDonation></CreateDonation>,
          </PrivateRoute>
        ),
      },
      {
        path: "myAddPet/:id",
        element: (
          <PrivateRoute>
            <MyAddPetUpdate />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const Data = await fetch(
            // `https://petadopy-backend.vercel.app/api/myAddPet/${params.id}`
            `http://localhost:5000/api/petList/${params.id}`
          );
          return Data;
        },
      },
      {
        path: "adoptionReq",
        element: (
          <PrivateRoute>
            <AdoptionReq></AdoptionReq>,
          </PrivateRoute>
        ),
      },
      {
        path: "myAddPet",
        element: (
          <PrivateRoute>
            {/* <MyAddPet></MyAddPet>, */}
            <MyAddPetList />
          </PrivateRoute>
        ),
      },

      {
        path: "updateDonation/:id",
        element: (
          <PrivateRoute>
            <UpdateDonation></UpdateDonation>,
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          try {
            const response = await fetch(
              `https://petadopy-backend.vercel.app/api/allDonationCamp/${params.id}`
              // `http://localhost:5000/api/allDonationCamp/${params.id}`
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
        element: (
          <PrivateRoute>
            <MyDonationCamp></MyDonationCamp>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default MainRouter;
