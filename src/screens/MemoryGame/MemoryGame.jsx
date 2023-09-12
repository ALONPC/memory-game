import React, { useEffect } from "react";
import Cookies from "js-cookie";

import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export const MemoryGame = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(Cookies.get("playerName"));
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
      <div class="grid grid-cols-6 gap-6"></div>
      <div>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    </div>
  );
};
