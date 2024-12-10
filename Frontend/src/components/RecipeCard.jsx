import React from "react";
import "./RecipeCard.css";

import StarRatingIcon from '../assets/5-star-rating-icon.svg';
import TimerIcon from '../assets/timer-icon.svg';

const RecipeCard = ({ title, cookingTime, image, backgroundPosition, backgroundSize }) => {
    return (
      <div className="RecipeCard">
        <div
          className="RecipeImage"
          style={{
            borderRadius: "25px",
            background: `url(${image}) lightgrey ${backgroundPosition} / ${backgroundSize} no-repeat`,
          }}
        ></div>
        <div className="RecipeCardInfo">
            <img src={StarRatingIcon} alt="5-Star-Rating-Icon" className="StarRatingIcon" />
            <img src={TimerIcon} alt="TimerIcon" className="TimerIcon" />
            <text className="RecipeTitle">{title}</text>
            <text className="CookingTime">{cookingTime} mins</text>
        </div>
      </div>
    );
  };

export default RecipeCard;
