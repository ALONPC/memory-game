import React from "react";
import PropTypes from "prop-types";

import "./Card.css";

export const Card = ({ card }) => {
  const {
    fields: {
      image: { url },
    },
    meta: { name },
  } = card;
  return (
    <div
      className="card"
      class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <img class="rounded-t-lg" src={url} alt={name} />
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object,
};
