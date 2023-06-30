import classes from "./FoodCategoryVerticalCard.module.css";

import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

const FoodCategoryVerticalCard = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(false);

  const categoryName = props.category.name;

  const numberOfFoodStoreMatchedWitchCategory = props.foodStoresData
    .filter(
      (foodStore) =>
        foodStore.categories[0].alias === categoryName.toLowerCase()
    )
    .filter((foodStoreMatched) => foodStoreMatched !== undefined);

  const addFilter = () => {
    props.filterFoodStoresByCategory(categoryName, selectedCategory);
    setSelectedCategory(!selectedCategory);
  };

  return (
    <div
      className={classes.foodCategoryVerticalCardContainer}
      onClick={addFilter}
    >
      <AiOutlineCheck
        className={
          selectedCategory
            ? classes.selectedFoodCategoryVerticalCardIcon
            : classes.foodCategoryVerticalCardIcon
        }
      />
      <p
        className={
          selectedCategory
            ? classes.selectedFoodCategoryVerticalCardText
            : classes.foodCategoryVerticalCardText
        }
      >
        {categoryName}{" "}
      </p>
      <p className={classes.foodCategoryVerticalCardLength}>
        {numberOfFoodStoreMatchedWitchCategory.length}
      </p>
    </div>
  );
};

export default FoodCategoryVerticalCard;
