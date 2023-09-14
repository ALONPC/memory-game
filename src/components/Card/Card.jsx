import React from "react";
import PropTypes from "prop-types";

import cardBack from "../../assets/card_back.png";

export const Card = ({ card, onClick, flipped }) => {
  const {
    fields: {
      image: { url = null },
    },
    meta: { name = null },
  } = card;

  const handleClick = () => {
    onClick(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "card__flipped" : ""}>
        <img className={"card__front"} src={url} alt={name} />
        <img
          className="card__back"
          onClick={handleClick}
          src={cardBack}
          alt="cardBack"
        ></img>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object,
  onClick: PropTypes.func,
  flipped: PropTypes.bool,
};
