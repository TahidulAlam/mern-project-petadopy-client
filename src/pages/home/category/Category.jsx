/* eslint-disable no-unused-vars */
import React from "react";
import useCategory from "../../../hooks/useCategory";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const categoryData = useCategory();
  const data = categoryData?.categoryData;
  return (
    <div>
      {" "}
      <h1 className="text-center text-xl">This is category section</h1>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {data?.map((dd) => (
          <CategoryCard key={dd._id} cardData={dd}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Category;
