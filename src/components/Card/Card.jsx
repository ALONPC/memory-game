import React from "react";
import PropTypes from "prop-types";

export const Card = ({ card }) => {
  const {
    fields: {
      image: { url = null },
    },
    meta: { name = null },
  } = card;
  return (
    <div class="card max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img class="rounded-t-lg" src={url} alt={name} />
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object,
};
