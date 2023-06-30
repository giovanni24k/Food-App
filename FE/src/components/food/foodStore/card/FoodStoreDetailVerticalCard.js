import classes from "./FoodStoreDetailVerticalCard.module.css";

import ChangeZoneComponent from "../../../ChangeZoneComponent";
import FoodRecipesAddedToCart from "../../foodRecipe/FoodRecipesAddedToCart";
import FoodRecipeList from "../../foodRecipe/list/FoodRecipeList";

const FoodStoreDetailVerticalCard = ({ foodRecipesData }) => {
  return (
    <div className={classes.foodDetailVerticalCardContainer}>
      <ChangeZoneComponent />
      <FoodRecipeList foodRecipesData={foodRecipesData} />
      <FoodRecipesAddedToCart />
    </div>
  );
};

export default FoodStoreDetailVerticalCard;
