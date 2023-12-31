import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button/Button";
import { Loading } from "../../components/Loading/Loading";
import { Card } from "../../components/Card/Card";

import {
  FAIL_MESSAGES,
  SUCCESS_MESSAGES,
  VALID_ANIMALS,
  shuffleRandomly,
} from "../../contants";

export const MemoryGame = () => {
  const PLAYER_NAME = Cookies.get("playerName");
  const WELCOME_MESSAGE = `Welcome ${PLAYER_NAME}!`;

  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const [turns, setTurns] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [reactionMessage, setReactionMessage] = useState(WELCOME_MESSAGE);

  const handlePlayableCards = (cards) => {
    let playableCards = cards.filter((card) =>
      VALID_ANIMALS.includes(card?.meta?.name)
    );
    playableCards = [...playableCards, ...playableCards]; // ? duplicates the cards so there will be pairs for each one
    playableCards = playableCards.map((card, index) => ({
      ...card,
      meta: { ...card.meta, uuid: card.meta.uuid + index },
      matched: false, // ? way to track whether is face up or face down
    })); // ? the duplicated cards will have a slightly different uuid than the original but still different so they can be identified
    shuffleRandomly(playableCards); // ? shuffles the cards randomly
    setCards(playableCards);
    setTurns(0);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemoryCards();
  }, [Cookies.get("playerName")]);

  const newGame = () => {
    setFailCount(0);
    setSuccessCount(0);
    resetTurn(WELCOME_MESSAGE);
    loadMemoryCards();
    alert("Game was reset");
  };

  const signOut = () => {
    Cookies.remove("playerName");
    navigate("/welcome");
  };

  // ? whether the user clicks a first or second selection, if choiceOne does not have a value, it will update itself then if choiceOne does have a value, it will update choiceTwo
  const handleChoie = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // ? card choices comparison
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (
        choiceOne.meta.name === choiceTwo.meta.name &&
        choiceOne.meta.uuid !== choiceTwo.meta.uuid // ? just to make sure the ids are not equal but the names are
      ) {
        setCards((prevState) => {
          return prevState.map((card) => {
            if (card.meta.name === choiceOne.meta.name) {
              // ? changes the cards as matched if the choices share names
              return { ...card, matched: true };
            }
            return card;
          });
        });
        handleSuccess();
      } else {
        handleFail();
      }
    }
  }, [choiceOne, choiceTwo]);

  const handleSuccess = () => {
    setSuccessCount((prevState) => prevState + 1);
    setReactionMessage(shuffleRandomly(SUCCESS_MESSAGES)[0]);
    resetTurn("Keep it up!");
  };

  const handleFail = () => {
    setFailCount((prevState) => prevState + 1);
    setReactionMessage(shuffleRandomly(FAIL_MESSAGES)[0]);
    resetTurn("You can do it!");
  };

  const resetTurn = (message = null) => {
    setTimeout(() => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setReactionMessage(message);
      setTurns((prevState) => prevState + 1);
    }, 800); // ? a delay to make the user see the card if matches before it is flipped back again in case of fail
  };

  useEffect(() => {
    if (!!successCount && cards.every((card) => card.matched)) {
      resetTurn(
        `Congratulations ${PLAYER_NAME}! your score: ${successCount} - ${failCount}`
      );
      // alert(
      //   `Congratulations ${PLAYER_NAME}! your score: ${successCount} - ${failCount}`
      // );
    }
  }, [successCount]);

  return loading ? (
    <Loading></Loading>
  ) : (
    <>
      <div className="memory-game">
        <h1 class="text-center memory-game__reaction text-5xl font-extrabold dark:text-white">
          {reactionMessage}
        </h1>
        <div class="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="xs:col-span-1 sm:col-span-1 md:col-span-10 lg:col-span-10">
            <div class="grid lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-6 xs:grid-cols-4 gap-4">
              {cards.map((card) => {
                return (
                  <Card
                    onClick={handleChoie}
                    key={card.meta.uuid}
                    card={card}
                    flipped={
                      card === choiceOne || card === choiceTwo || card.matched
                    } // ? three scenarios where the card should be shown as flipped
                  ></Card>
                );
              })}
            </div>
          </div>
          <div class="xs:col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2">
            <div class="grid grid-rows-6 xs:grid-rows-1 sm:grid-rows-1 md:grid-rows-1 lg:grid-rows-6 grid-flow-col gap-6">
              <div class="block text-center row-start-1 row-span-3 grid grid-cols-1 gap-8 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-purple-900 dark:border-white-700">
                <h3 class="text-3xl font-bold dark:text-white">Score</h3>
                <h4 class="grid grid-cols-1 text-2xl font-bold dark:text-white">
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
              <Button onClick={signOut}>Leave Game</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
