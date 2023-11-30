// /* eslint-disable no-unused-vars */
// import React from "react";
// import useAxiosPublic from "./useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// const usePetDetails = () => {
//   const axios = useAxiosPublic();
//   const getData = async (searchTerm) => {
//     const url = "/api/petList";
//     const params = {
//       keyword: searchTerm,
//     };
//     const response = await axios.get(url, { params });
//     const petData = response.data.products;
//     if (searchTerm) {
//       const filteredPetData = petData.filter((pet) =>
//         pet.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       return filteredPetData;
//     } else {
//       return petData;
//     }
//     // const res = await axios.get(url);
//     // return res.data;
//   };
//   const {
//     data: petDetails,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["petDetails", "searchTerm"],
//     queryFn: getData,
//   });
//   console.log(petDetails);
//   return { petDetails: petDetails || [], isLoading, error };
// };

// export default usePetDetails;
