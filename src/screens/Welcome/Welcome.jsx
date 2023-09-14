import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

export const Welcome = () => {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("playerName")) {
      navigate("/memoryGame");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Cookies.set("playerName", playerName, { expires: 7 });
    navigate("/memoyGame");
  };

  const handleOnChangePlayerName = ({ target: { value } }) => {
    setPlayerName(value);
  };

  return (
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form class="space-y-6" onSubmit={handleSubmit}>
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          Welcome to the Memory Game! 🧠
        </h5>
        <div>
          <label
            for="playerName"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Please tell us your name!
          </label>
        </div>
        <Input
          type="text"
          name="playerName"
          id="playerName"
          placeholder="Your name"
          value={playerName}
          onChange={(e) => handleOnChangePlayerName(e)}
        ></Input>
        <Button type="submit" text="Play!"></Button>
      </form>
    </div>
  );
};
