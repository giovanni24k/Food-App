import classes from "./FoodCategoryList.module.css";

import FoodCategoryCard from "../../card/category/FoodCategoryCard";

const FoodCategoryList = ({ foodCategories, onFilterFoodStoresByCategory }) => {
  return (
    <div className={classes.foodCategoryListContainer}>
      {foodCategories.map((category) => (
        <FoodCategoryCard
          key={category.id}
          id={category.id}
          categories={category}
          onFilterFoodStoresByCategory={onFilterFoodStoresByCategory}
        />
      ))}
    </div>
  );
};

export default FoodCategoryList;
