import classes from "./FoodStoreList.module.css";

import FoodStoreCard from "../card/FoodStoreCard";

const FoodStoreList = ({ foodStoresData }) => {
  return (
    <div className={classes.foodListContainer}>
      {foodStoresData.map((foodStore) => (
        <FoodStoreCard key={foodStore.id} id={foodStore.id} foodStore={foodStore} />
      ))}
    </div>
  );
};

export default FoodStoreList;
