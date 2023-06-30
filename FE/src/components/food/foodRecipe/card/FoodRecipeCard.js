import classes from "./FoodRecipeCard.module.css";

import { useDispatch } from "react-redux";

import { foodStoreActions } from "../../../../store/food-store-slice";
import Card from "../../../UI/Card";
import Image from "../../../UI/Image";
import Button from "../../../UI/Button";
import ButtonPrice from "../../../UI/ButtonPrice";

const FoodRecipeCard = ({ foodRecipe, price }) => {
  foodRecipe.price = price;
  foodRecipe.amount = 1;

  const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(foodStoreActions.addFoodRecipeToCart(foodRecipe));
  };

  return (
    <Card className={classes.foodRecipeCardContainer}>
      <div className={classes.foodRecipeCardImageContainer}>
        <Image
          className={classes.foodRecipeCardImage}
          imageSrc={foodRecipe.image}
        />
      </div>
      <div className={classes.foodRecipeCardDescriptionContainer}>
        <h2>{foodRecipe.label.slice(0, 24)}</h2>
        <p>{foodRecipe.knownAs.slice(0, 24)}</p>
        <ButtonPrice className={classes.foodRecipeCardPriceButton}>
          {foodRecipe.price} $
        </ButtonPrice>
      </div>
      <div className={classes.foodRecipeCardButtonContainer}>
        <Button
          onClick={addItemToCart}
          className={classes.foodRecipeCardAddButton}
        >
          Add To Your Order
        </Button>
      </div>
    </Card>
  );
};

export default FoodRecipeCard;
