import classes from "./FoodCategoryCard.module.css";

import { AiOutlineCheck } from "react-icons/ai";
import { useState } from "react";

import Image from "../../../../UI/Image";

const FoodCategoryCard = ({ categories, onFilterFoodStoresByCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(false);

  const addFilter = () => {
    onFilterFoodStoresByCategory(categories.name, selectedCategory);
    setSelectedCategory(!selectedCategory);
  };
  return (
    <>
      {categories.image && (
        <div onClick={addFilter} className={classes.foodCategoryCardContainer}>
          <div className={classes.foodCategoryCardImageContainer}>
            <Image
              className={classes.foodCategoryCardImage}
              imageSrc={categories.image}
            />
          </div>
          <div className={classes.foodCategoryCardNameContainer}>
            <AiOutlineCheck
              className={
                selectedCategory
                  ? classes.selectedFoodCategoryCardIcon
                  : classes.foodCategoryCardIcon
              }
            />
            <p
              className={
                selectedCategory
                  ? classes.selectedFoodCategoryCardName
                  : classes.foodCategoryCardName
              }
            >
              {categories.name}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodCategoryCard;
