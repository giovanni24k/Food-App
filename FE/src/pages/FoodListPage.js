import classes from "./FoodListPage.module.css";

import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";

import FoodCategoryList from "../components/food/foodStore/list/category/FoodCategoryList";

import FoodStoreList from "../components/food/foodStore/list/FoodStoreList";
import FoodCategoryVerticalList from "../components/food/foodStore/list/category/FoodCategoryVerticalList";
import { foodCategories } from "../constants/food-categories";
import useInput from "../hooks/use-input";

const isAddress = (value) => value.trim().length > 0;

const FoodListPage = () => {
  const location = useLocation();
  const { foodStoresData } = location.state;

  const [queryFilter, setQueryFitler] = useState("");

  const {
    value: enteredAddress,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    inputFocusHandler: addressFocusHandler,
    reset: resetAddress,
  } = useInput(isAddress);

  useEffect(() => {
    setQueryFitler(() =>
      foodStoresData.filter((foodStore) =>
        foodStore.name.toLowerCase().includes(enteredAddress.toLowerCase())
      )
    );
  }, [enteredAddress, foodStoresData]);

  const filterFoodStoresByCategory = (categoryName, categoryIsUnchecked) => {
    if (categoryIsUnchecked) {
      setQueryFitler((prevState) => {
        if (prevState.length === 0) return foodStoresData;

        const fitleredFoodStores = prevState.filter(
          (foodStore) =>
            foodStore.categories[0].alias !== categoryName.toLowerCase()
        );

        return fitleredFoodStores.length === 0
          ? foodStoresData
          : fitleredFoodStores;
      });
    } else {
      const filteredFoodStoresByCategory = foodStoresData.filter(
        (foodStore) =>
          foodStore.categories[0].alias === categoryName.toLowerCase()
      );

      setQueryFitler((prevState) => {
        if (prevState && prevState.length === 40) {
          return filteredFoodStoresByCategory;
        } else {
          return [...prevState, ...filteredFoodStoresByCategory];
        }
      });
    }
  };

  return (
    <div className={classes.foodListPageContainer}>
      <div className={classes.foodCarouselListContainer}>
        <FoodCategoryList
          foodCategories={foodCategories}
          onFilterFoodStoresByCategory={filterFoodStoresByCategory}
        />
      </div>
      <div className={classes.foodStoreSearchInputContainer}>
        <div className={classes.inputSearchContainer}>
          <AiOutlineSearch className={classes.searchIcon} />
          <input
            value={enteredAddress}
            onFocus={addressFocusHandler}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
            className={classes.inputSearch}
            placeholder="Search food store"
            type="text"
          />
          <TiDelete
            className={classes.removeIcon}
            onClick={resetAddress}
            style={{
              display: enteredAddress ? "block" : "none",
            }}
          />
        </div>
      </div>
      <div className={classes.foodListContainer}>
        <FoodCategoryVerticalList
          onFilterFoodStoresByCategory={filterFoodStoresByCategory}
          foodStoresData={foodStoresData}
        />
        {queryFilter && <FoodStoreList foodStoresData={queryFilter} />}
      </div>
    </div>
  );
};

export default FoodListPage;
