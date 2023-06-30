import classes from "./FoodStoreCard.module.css";

import { AiFillStar } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { IoIosCall } from "react-icons/io";
import { RiOpenArmLine } from "react-icons/ri";
import { RiCloseCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Card from "../../../UI/Card";
import Image from "../../../UI/Image";
import useHttp from "../../../../hooks/use-http";
import Modal from "../../../UI/Modal/Modal";

const FoodStoreCard = ({ foodStore }) => {
  const navigate = useNavigate();

  const { isLoading, data, error, clear, sendRequest } = useHttp();

  const url = `http://localhost:8080/api/food/getAllRecipesForCategory?category=${foodStore.categories[0].alias}`;

  const fetchFoodRecipesByCategory = () => {
    const dataToSend = {
      url: url,
      method: "GET",
    };

    sendRequest(dataToSend);
  };

  useEffect(() => {
    if (!data) return;

    navigate(`/store/${foodStore.name}`, {
      state: { foodRecipesData: data, foodStore: foodStore },
    });
  }, [data, navigate, foodStore.name, foodStore]);

  return (
    <>
      {error && (
        <Modal clearError={clear} title={error.title} message={error.message} />
      )}
      {isLoading && <Modal />}
      <Card
        onClick={fetchFoodRecipesByCategory}
        className={classes.foodCardContainer}
      >
        <div className={classes.imageContainer}>
          <Image className={classes.image} imageSrc={foodStore.image_url} />
        </div>
        <div className={classes.foodCardTitleContainer}>
          <h1>{foodStore.name}</h1>
          <div className={classes.foodCardIconContainer}>
            <AiFillStar className={classes.foodCardStarIcon} />
            <div className={classes.foodCardRatingTextContainer}>
              <p className={classes.foodCardRating}>{foodStore.rating}</p>
              <p className={classes.foodCardRatingMeasure}>/5</p>
            </div>
          </div>
          <p>
            {foodStore.categories[0].title} - {foodStore.categories[0].alias}
          </p>
        </div>
        <div className={classes.foodCardDescriptionContainer}>
          <div className={classes.foodCardIconContainer}>
            <BiCurrentLocation className={classes.foodCardIcon} />
            <p>{foodStore.location.address1}</p>
          </div>
          <div className={classes.foodCardIconContainer}>
            <IoIosCall className={classes.foodCardIcon} />
            <p>
              {foodStore.phone ? foodStore.phone.slice(3) : "Not Available"}
            </p>
          </div>
          <div className={classes.foodCardIconContainer}>
            {foodStore.is_closed ? (
              <RiCloseCircleFill className={classes.foodCardIcon} />
            ) : (
              <RiOpenArmLine className={classes.foodCardIcon} />
            )}
            <p
              style={{
                color: foodStore.is_closed ? "red" : "#46c001",
                fontWeight: "600",
              }}
            >
              {foodStore.is_closed ? "Closed" : "Open"}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default FoodStoreCard;
