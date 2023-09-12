import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card/Card";

export const MemoryGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  const loadMemoryCards = async () => {
    const {
      data: { entries },
    } = await axios.get(
      "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20"
    );
    console.log(entries);
    setCards(entries);
  };

  useEffect(() => {
    console.log(Cookies.get("playerName"));
    loadMemoryCards();
  }, [Cookies.get("playerName")]);

  const signOut = () => {
    Cookies.remove("playerName");
    navigate("/welcome");
  };

  return (
    <div>
      <h1 class="text-5xl font-extrabold dark:text-white">
        {`Hi ${Cookies.get("playerName")}!`}
      </h1>
      <div class="grid grid-cols-5 gap-4">
        {cards.map((card) => {
          return <Card key={card.meta.uuid} card={card}></Card>;
        })}
      </div>
      <div>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    </div>
  );
};
