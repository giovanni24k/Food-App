import { useSelector } from "react-redux";
import FoodRecipeAddedToCart from "../card/FoodRecipeAddedToCart";

const FoodRecipeAddedToCartList = () => {
  const listFoodRecipesAddedToCart = useSelector(
    (state) => state.foodStore.listFoodRecipesAddedToCart
  );

  return (
    <div>
      {listFoodRecipesAddedToCart &&
        listFoodRecipesAddedToCart.map((foodRecipe, index) => (
          <FoodRecipeAddedToCart
            key={index}
            id={foodRecipe.foodId}
            foodRecipe={foodRecipe}
          />
        ))}
    </div>
  );
};

export default FoodRecipeAddedToCartList;
