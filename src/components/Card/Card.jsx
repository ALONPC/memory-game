import React from "react";
import PropTypes from "prop-types";

import cardBack from "../../assets/card_back.png";

export const Card = ({ card, onClick }) => {
  const {
    fields: {
      image: { url = null },
    },
    meta: { name = null },
    visible,
  } = card;
  return (
    <div
      onClick={() => onClick(card)}
      class="card max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      {visible ? (
        <img class="rounded-t-lg" src={url} alt={name} />
      ) : (
        <img src={cardBack} alt="cardBack"></img>
      )}
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object,
  onClick: PropTypes.func,
  visible: PropTypes.bool,
};
