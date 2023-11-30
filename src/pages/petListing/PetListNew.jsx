// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import Container from "../../components/shared/Container";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import PetListingCard from "./PetListingCard";

// const PetListNew = () => {
//   const axios = useAxiosPublic();
//   const [pets, setPets] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const getData = async () => {
//     try {
//       const url = `/api/petList?search=${search}&category=${category}&page=${page}`;
//       const res = await axios.get(url);
//       setPets((prevPets) => [...prevPets, ...res.data.pets]);
//       setTotalPages(res.data.totalPages);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   //   console.log(pets);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setPage(1);
//     setPets([]);
//     getData();
//   };

//   const handleCategoryChange = (e) => {
//     setPage(1);
//     setPets([]);
//     setCategory(e.target.value);
//   };

//   const handleInfiniteScroll = () => {
//     if (page < totalPages) {
//       setPage(page + 1);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [page, search, category]);

//   //   console.log(category, search, page);
//   return (
//     <div>
//       <Container>
//         <div className="fixed top-20 left-0 right-0 z-10">
//           <div className="rounded-b-xl mt-5 max-w-xl mx-auto px-5 py-4 bg-[#6D28D9]">
//             <div className="relative">
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col md:flex-row gap-3"
//               >
//                 <div className="flex">
//                   <input
//                     name="search"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="w-full md:w-80 px-3 h-10 rounded-l border-2  focus:outline-none"
//                     type="search"
//                     placeholder="Search"
//                   />
//                   <button
//                     type="button"
//                     // onClick={handleSearch}
//                     className=" bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
//                   >
//                     <svg
//                       className="h-5 w-5"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         clipRule="evenodd"
//                         d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//                 <select
//                   id="category"
//                   name="category"
//                   value={category}
//                   className="w-full h-10 border-2  focus:outline-none  text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
//                   onChange={handleCategoryChange}
//                 >
//                   <option value="All" defaultValue="">
//                     All
//                   </option>
//                   <option value="Cat">Cat</option>
//                   <option value="Dog">Dog</option>
//                   <option value="Bird">Birds</option>
//                   <option value="Horse">Horse</option>
//                   <option value="Fish">Fish</option>
//                   <option value="Rabbit">Rabbit</option>
//                 </select>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className="mt-48 -z-30">
//           <div className="grid grid-cols-3 gap-5 w-5/6 mx-auto ">
//             {pets?.map((dd) => (
//               <PetListingCard key={dd._id} data={dd}></PetListingCard>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default PetListNew;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import React, { useEffect, useState, useRef } from "react";
// import Container from "../../components/shared/Container";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import PetListingCard from "./PetListingCard";

// const PetListNew = () => {
//   const axios = useAxiosPublic();
//   const [pets, setPets] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const lastItemRef = useRef();

//   const getData = async () => {
//     try {
//       const url = `/api/petList?search=${search}&category=${category}&page=${page}`;
//       const res = await axios.get(url);
//       setPets((prevPets) => [...prevPets, ...res.data.pets]);
//       setTotalPages(res.data.totalPages);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setPage(1);
//     setPets([]);
//     getData();
//   };

//   const handleCategoryChange = (e) => {
//     setPage(1);
//     setPets([]);
//     setCategory(e.target.value);
//   };

//   const handleInfiniteScroll = () => {
//     const lastItem = lastItemRef.current;
//     if (lastItem) {
//       const lastItemRect = lastItem.getBoundingClientRect();
//       if (lastItemRect.bottom <= window.innerHeight) {
//         // User has scrolled to the bottom, load more data
//         if (page < totalPages) {
//           setPage(page + 1);
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [page, search, category]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleInfiniteScroll);
//     return () => {
//       window.removeEventListener("scroll", handleInfiniteScroll);
//     };
//   }, [handleInfiniteScroll]);

//   return (
//     <div>
//       <Container>
//         <div className="fixed top-20 left-0 right-0 z-10">
//           <div className="rounded-b-xl mt-5 max-w-xl mx-auto px-5 py-4 bg-[#6D28D9]">
//             <div className="relative">
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col md:flex-row gap-3"
//               >
//                 <div className="flex">
//                   <input
//                     name="search"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="w-full md:w-80 px-3 h-10 rounded-l border-2  focus:outline-none"
//                     type="search"
//                     placeholder="Search"
//                   />
//                   <button
//                     type="button"
//                     className=" bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
//                   >
//                     <svg
//                       className="h-5 w-5"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         clipRule="evenodd"
//                         d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//                 <select
//                   id="category"
//                   name="category"
//                   value={category}
//                   className="w-full h-10 border-2  focus:outline-none  text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
//                   onChange={handleCategoryChange}
//                 >
//                   <option value="All" defaultValue="">
//                     All
//                   </option>
//                   <option value="Cat">Cat</option>
//                   <option value="Dog">Dog</option>
//                   <option value="Bird">Birds</option>
//                   <option value="Horse">Horse</option>
//                   <option value="Fish">Fish</option>
//                   <option value="Rabbit">Rabbit</option>
//                 </select>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className="mt-48 -z-30">
//           <div className="grid grid-cols-3 gap-5 w-5/6 mx-auto ">
//             {pets?.map((pet, index) => (
//               <PetListingCard
//                 key={pet._id}
//                 data={pet}
//                 ref={index === pets.length - 1 ? lastItemRef : null}
//               />
//             ))}
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default PetListNew;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Container from "../../components/shared/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PetListingCard from "./PetListingCard";

const PetListNew = () => {
  const axios = useAxiosPublic();
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const lastItemRef = useRef();

  const getData = async () => {
    try {
      const url = `/api/petList?search=${search}&category=${category}&page=${page}`;
      const res = await axios.get(url);
      setPets((prevPets) => [...prevPets, ...res.data.pets]);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setPets([]);
    getData();
  };

  const handleCategoryChange = (e) => {
    setPage(1);
    setPets([]);
    setCategory(e.target.value);
  };

  const handleInfiniteScroll = () => {
    if (
      !loading &&
      page < totalPages &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    getData();
  }, [page, search, category]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [handleInfiniteScroll]);
  console.log(pets);
  return (
    <div>
      <Container>
        <div className="fixed lg:top-28 top-5 left-0 right-0 z-10">
          <div className="rounded-b-xl mt-5 lg:max-w-xl max-w-xs  mx-auto px-5 py-5 bg-[#6D28D9]">
            <div className="relative">
              <form
                onSubmit={handleSubmit}
                className="flex md:flex-row lg:gap-3 gap-1"
              >
                <div className="flex w-4/6">
                  <input
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="lg:w-80 w-full px-1 lg:h-10 h-8 rounded-l border-2  focus:outline-none"
                    type="search"
                    placeholder="Search"
                  />
                  <button
                    type="button"
                    className=" bg-sky-500 text-white rounded-r px-2 md:px-1 py-0 md:py-1"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
                      />
                    </svg>
                  </button>
                </div>
                <select
                  id="category"
                  name="category"
                  value={category}
                  className="w-2/6 lg:h-10 h-8 border-2  focus:outline-none  text-sky-500 rounded px-2 md:px-1 py-0 md:py-1 tracking-wider"
                  onChange={handleCategoryChange}
                >
                  <option value="All" defaultValue="">
                    All
                  </option>
                  <option value="Cat">Cat</option>
                  <option value="Dog">Dog</option>
                  <option value="Bird">Birds</option>
                  <option value="Horse">Horse</option>
                  <option value="Fish">Fish</option>
                  <option value="Rabbit">Rabbit</option>
                </select>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:mt-56 mt-32 -z-30">
          <div className="grid lg:grid-cols-3 grid-col gap-5 w-5/6 mx-auto ">
            {pets?.map((pet, index) => (
              <PetListingCard
                key={pet._id}
                data={pet}
                ref={index === pets.length - 1 ? lastItemRef : null}
              />
            ))}
          </div>
        </div>
      </Container>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PetListNew;
