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

  const [turns, setTurns] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);

  const handlePlayableCards = (cards) => {
    const VALID_ANIMALS = [
      "fox",
      "cat",
      "penguin",
      "rabbit",
      "turtle",
      "bear",
      "dolphin",
      "mouse",
      "squirrel",
      "seal",
    ];
    let playableCards = cards.filter((card) =>
      VALID_ANIMALS.includes(card?.meta?.name)
    );
    playableCards = [...playableCards, ...playableCards]; // duplicates the cards so there will be pairs for each one
    playableCards = playableCards.map((card, index) => ({
      ...card,
      meta: { ...card.meta, uuid: card.meta.uuid + index },
    }));
    console.log(
      "🚀 ~ file: MemoryGame.jsx:38 ~ handlePlayableCards ~ playableCards:",
      playableCards
    );
    playableCards.sort(() => Math.random() - 0.5); // shuffles the array randomly
    setCards(playableCards);
  };

  const loadMemoryCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20"
      );
      const {
        data: { entries: cards },
      } = response;
      handlePlayableCards(cards);
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

  const newGame = () => {
    setFailCount(0);
    setSuccessCount(0);
    alert("Game reset");
  };

  const selectCard = (selectedCard) => {
    console.log(
      "🚀 ~ file: MemoryGame.jsx:74 ~ selectCard ~ card:",
      selectedCard
    );
    const matchedCard = cards.find(
      (card) => selectedCard?.meta?.uuid === card?.meta?.uuid
    );
    matchedCard.visible = true;
    const newDeck = [...cards];
    setCards(newDeck);
  };

  return loading ? (
    <Loading></Loading>
  ) : (
    <div className="memory-game">
      <h1 class="memory-game__player-name text-5xl font-extrabold dark:text-white">
        {`Hi ${Cookies.get("playerName")}!`}
      </h1>
      <div class="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="xs:col-span-1 sm:col-span-1 md:col-span-10 lg:col-span-10">
          <div class="grid lg:grid-cols-8 md:grid-cols-7 sm:grid-cols-6 xs:grid-cols-4 gap-4">
            {cards.map((card) => {
              return (
                <Card
                  // visible={false}
                  onClick={selectCard}
                  key={card.meta.uuid}
                  card={card}
                ></Card>
              );
            })}
          </div>
        </div>
        <div class="xs:col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2">
          <div class="grid grid-rows-6 xs:grid-rows-1 sm:grid-rows-1 md:grid-rows-1 lg:grid-rows-6 grid-flow-col gap-6">
            <div class="block text-center row-start-1 row-span-3 grid grid-cols-1 gap-8 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h3 class="text-3xl font-bold dark:text-white">Score</h3>
              <h4 class="text-2xl font-bold dark:text-white">
                <span class="bg-green-100 text-green-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ml-2">
                  {successCount}
                </span>
                {"-"}
                <span class="bg-red-100 text-red-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800 ml-2">
                  {failCount}
                </span>
              </h4>
              <h6 class="text-lg font-bold dark:text-white">Turn {turns}</h6>
            </div>
            <Button onClick={newGame}>New Game</Button>
            <Button onClick={signOut}>Sign out</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
