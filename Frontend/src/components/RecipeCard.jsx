import React from "react";
import "./RecipeCard.css";

import StarRatingIcon from '../assets/5-star-rating-icon.svg';
import TimerIcon from '../assets/timer-icon.svg';

const RecipeCard = ({ title, image, cookingTime }) => {
  return (
    <div className="RecipeCard">

        <img src={image} alt={`${title} image`} className="RecipeImage" />

        <div className="RecipeCardInfo">
            <img src={StarRatingIcon} alt="5-Star-Rating-Icon" className="StarRatingIcon" />
            <img src={TimerIcon} alt="TimerIcon" className="TimerIcon" />
            <text className="CookingTime">{cookingTime} mins</text>
            <text className="RecipeTitle">{title}</text>
        </div>
    </div>
  );
};

export default RecipeCard;
