import classes from "./FoodCategoryVerticalList.module.css";

import { dummyFoodCategoriesVerticalList } from "../../../../../constants/dummy-food-categories-vertical-list";
import FoodCategoryVerticalCard from "../../card/category/FoodCategoryVerticalCard";
import ChangeZoneComponent from "../../../../ChangeZoneComponent";

const FoodCategoryVerticalList = ({
  foodStoresData,
  onFilterFoodStoresByCategory,
}) => {
  return (
    <div className={classes.foodCategoryListContainer}>
      <ChangeZoneComponent />
      <h3>All Categories</h3>
      {dummyFoodCategoriesVerticalList.map((category) => (
        <FoodCategoryVerticalCard
          key={category.id}
          id={category.id}
          category={category}
          foodStoresData={foodStoresData}
          filterFoodStoresByCategory={onFilterFoodStoresByCategory}
        />
      ))}
    </div>
  );
};

export default FoodCategoryVerticalList;
