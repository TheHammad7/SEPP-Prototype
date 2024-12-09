import React from "react";
import "./RecipeCard.css";

import StarRatingIcon from '../assets/5-star-rating-icon.svg';
import TimerIcon from '../assets/timer-icon.svg';

const RecipeCard = ({ title, cookingTime }) => {
  return (
    <div className="RecipeCard">
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
