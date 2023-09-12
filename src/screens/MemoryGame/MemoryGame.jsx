import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button/Button";
import { Loading } from "../../components/Loading/Loading";
import { Card } from "../../components/Card/Card";

export const MemoryGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMemoryCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20"
      );
      const {
        data: { entries },
      } = response;
      console.log(entries);
      setCards(entries);
    } catch (error) {
      //
    } finally {
      setLoading(false); // ! review this
    }
  };

  useEffect(() => {
    console.log(Cookies.get("playerName"));
    loadMemoryCards();
  }, [Cookies.get("playerName")]);

  const signOut = () => {
    Cookies.remove("playerName");
    navigate("/welcome");
  };

  return loading ? (
    <Loading></Loading>
  ) : (
    <div class="grid grid-cols-1 gap-6">
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
