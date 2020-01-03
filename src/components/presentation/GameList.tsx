import React from "react";
import GameDetail from "./GameDetail";
import { IMergedGame } from "../../models/index";

export interface GameListProps {
  collection: IMergedGame[];
}

const GameList: React.FC<GameListProps> = ({ collection }) => (
  <div>
    {collection.map(game => (
      <GameDetail key={game.id} game={game} />
    ))}
  </div>
);

export default GameList;
