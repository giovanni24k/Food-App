import classes from "./FoodRecipeAddedToCart.module.css";

import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useDispatch } from "react-redux";

import { foodStoreActions } from "../../../../store/food-store-slice";
import Card from "../../../UI/Card";
import ButtonPrice from "../../../UI/ButtonPrice";

const FoodRecipeAddedToCart = ({ foodRecipe }) => {
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch(foodStoreActions.addFoodRecipeToCart(foodRecipe));
  };

  const removeItem = () => {
    dispatch(foodStoreActions.removeFoodRecipeFromCart(foodRecipe));
  };

  return (
    <Card className={classes.foodRecipeAddedToCartContainer}>
      <div className={classes.foodRecipeAddedToCartDescriptionContainer}>
        <IoIosRemove
          onClick={removeItem}
          className={classes.foodRecipeAddedToCartIcons}
        />
        <h3>
          {foodRecipe.label} x {foodRecipe.amount}
        </h3>
        <IoIosAdd
          onClick={addItem}
          className={classes.foodRecipeAddedToCartIcons}
        />
      </div>
      <ButtonPrice className={classes.foodRecipeAddedToCartButtonPriceDisabled}>
        {foodRecipe.price} $
      </ButtonPrice>
    </Card>
  );
};

export default FoodRecipeAddedToCart;
