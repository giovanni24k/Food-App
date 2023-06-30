import { createSlice } from "@reduxjs/toolkit";

const initialFoodStoreState = {
  listFoodRecipesAddedToCart: [],
  totalAmount: 0,
};

let updatedList;

const foodStoreSlice = createSlice({
  name: "foodStoreData",
  initialState: initialFoodStoreState,
  reducers: {
    addFoodRecipeToCart(state, action) {
      const foodRecipeAlreadyAddedToCartIndex =
        state.listFoodRecipesAddedToCart.findIndex(
          (foodRecipe) => foodRecipe.label === action.payload.label
        );

      const foodRecipeAlreadyAddedToCart =
        state.listFoodRecipesAddedToCart.find(
          (foodRecipe) => foodRecipe.label === action.payload.label
        );

      if (foodRecipeAlreadyAddedToCart) {
        const updatedItem = {
          ...foodRecipeAlreadyAddedToCart,
          amount: foodRecipeAlreadyAddedToCart.amount + 1,
        };

        updatedList = [...state.listFoodRecipesAddedToCart];
        updatedList[foodRecipeAlreadyAddedToCartIndex] = updatedItem;
      } else {
        updatedList = state.listFoodRecipesAddedToCart.concat(action.payload);
      }

      const updatedTotalAmount =
        Math.round((state.totalAmount + action.payload.price) * 1e12) / 1e12;

      return {
        listFoodRecipesAddedToCart: updatedList,
        totalAmount: updatedTotalAmount,
      };
    },

    removeFoodRecipeFromCart(state, action) {
      const foodRecipeToRemoveIndex =
        state.listFoodRecipesAddedToCart.findIndex(
          (foodRecipe) => foodRecipe.label === action.payload.label
        );

      const foodRecipeToRemove = state.listFoodRecipesAddedToCart.find(
        (prevFoodRecipeAddedToCart) =>
          prevFoodRecipeAddedToCart.label === action.payload.label
      );

      if (foodRecipeToRemove.amount === 1) {
        updatedList = state.listFoodRecipesAddedToCart.filter(
          (prevFoodRecipeAddedToCart) =>
            prevFoodRecipeAddedToCart.label !== action.payload.label
        );
      } else {
        const updatedItem = {
          ...foodRecipeToRemove,
          amount: foodRecipeToRemove.amount - 1,
        };

        updatedList = [...state.listFoodRecipesAddedToCart];
        updatedList[foodRecipeToRemoveIndex] = updatedItem;
      }

      const updatedTotalAmount =
        Math.round((state.totalAmount - action.payload.price) * 1e12) / 1e12;

      return {
        listFoodRecipesAddedToCart: updatedList,
        totalAmount: updatedTotalAmount,
      };
    },
  },
});

export const foodStoreActions = foodStoreSlice.actions;
export default foodStoreSlice;
