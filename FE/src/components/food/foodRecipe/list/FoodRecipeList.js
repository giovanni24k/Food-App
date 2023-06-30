import FoodRecipeCard from "../card/FoodRecipeCard";
import { foodRecipesPrices } from "../../../../constants/food-recipes-prices";

const FoodRecipeList = ({ foodRecipesData }) => {
  return (
    <div>
      {foodRecipesData.map((foodRecipe, index) => (
        <FoodRecipeCard
          key={index}
          id={foodRecipe.food.foodId}
          foodRecipe={foodRecipe.food}
          price={foodRecipesPrices[index].price}
        />
      ))}
    </div>
  );
};

export default FoodRecipeList;
