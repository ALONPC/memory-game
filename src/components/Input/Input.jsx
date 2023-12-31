import React from "react";

export const Input = (props) => {
  return (
    <input
      {...props}
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-purple-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      required
    ></input>
  );
};
