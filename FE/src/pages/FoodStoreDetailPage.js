import classes from "./FoodStoreDetailPage.module.css";

import { useLocation } from "react-router-dom";

import Image from "../components/UI/Image";
import FoodStoreDetailMainCard from "../components/food/foodStore/card/FoodStoreDetailMainCard";
import FoodStoreDetailVerticalCard from "../components/food/foodStore/card/FoodStoreDetailVerticalCard";

const FoodStoreDetail = () => {
  const location = useLocation();
  const { foodStore, foodRecipesData } = location.state;

  return (
    <div className={classes.foodStoreDetailPageContainer}>
      <div className={classes.foodStoreDetailImageContainer}>
        <Image
          className={classes.foodStoreDetailImage}
          imageSrc={foodStore.image_url}
        />
      </div>
      <FoodStoreDetailMainCard foodStore={foodStore} />
      <FoodStoreDetailVerticalCard foodRecipesData={foodRecipesData} />
    </div>
  );
};

export default FoodStoreDetail;
