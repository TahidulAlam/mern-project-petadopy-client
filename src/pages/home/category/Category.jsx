/* eslint-disable no-unused-vars */
import React from "react";
import useCategory from "../../../hooks/useCategory";
import CategoryCard from "./CategoryCard";
import DashBoardHeader from "../../../components/headers/DashBoardHeader";
import Container from "../../../components/shared/Container";

const Category = () => {
  const categoryData = useCategory();
  // const data = categoryData?.categoryData;
  const data = categoryData?.categoryData?.result;
  // console.log(data);
  return (
    <div>
      <div className="grid lg:grid-cols-3 grid-cols-3 lg:gap-10 gap-2 mt-2 lg:mt-5 cursor-pointer">
        {data?.map((dd) => (
          <CategoryCard key={dd._id} cardData={dd}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Category;
