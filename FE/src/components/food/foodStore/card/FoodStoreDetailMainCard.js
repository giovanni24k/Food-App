import classes from "./FoodStoreDetailMainCard.module.css";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const FoodStoreDetailMainCard = ({ foodStore }) => {
  return (
    <div className={classes.foodStoreDetailContainer}>
      <h1 className={classes.foodStoreDetailName}>{foodStore.name}</h1>
      <p className={classes.foodStoreDetailCategoryText}>
        {foodStore.categories[0].title} - {foodStore.categories[0].alias}
      </p>
      <div className={classes.foodStoreDetailReviewsContainer}>
        {Array.from({ length: 5 }, (_, index) =>
          index < foodStore.rating ? (
            <AiFillStar key={index} style={{ color: "#ff8000" }} />
          ) : (
            <AiOutlineStar key={index} style={{ color: "#ff8000" }} />
          )
        )}
        <p className={classes.foodStoreDetailReviewsText}>
          {foodStore.review_count}
        </p>
        <p>Review Count</p>
      </div>
    </div>
  );
};

export default FoodStoreDetailMainCard;
