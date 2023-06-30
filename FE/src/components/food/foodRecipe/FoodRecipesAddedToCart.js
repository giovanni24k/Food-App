import classes from "./FoodRecipesAddedToCart.module.css";

import { useSelector } from "react-redux";

import FoodRecipeAddedToCartList from "./list/FoodRecipeAddedToCartList";
import Button from "../../UI/Button";

const FoodRecipesAddedToCart = () => {
  const totalAmount = useSelector((state) => state.foodStore.totalAmount);
  const foodRecipesAddedToCart = useSelector(
    (state) => state.foodStore.listFoodRecipesAddedToCart
  );

  return (
    <div className={classes.foodRecipesAddedToCartContainer}>
      <h1>Your order</h1>
      {totalAmount !== 0 && <h1>{totalAmount} $</h1>}
      <hr />
      <FoodRecipeAddedToCartList />
      <div className={classes.foodRecipesAddedToCartButtonContainer}>
        <Button
          className={
            foodRecipesAddedToCart.length > 0
              ? classes.foodRecipesAddedToCartButton
              : classes.foodRecipesAddedToCartButtonDisabled
          }
        >
          Go to payment
        </Button>
      </div>
    </div>
  );
};

export default FoodRecipesAddedToCart;
