import GameDetail from './GameDetail';
import { IMergedGame } from '../../models/index';
import React from 'react';

interface GameListProps {
  collection: IMergedGame[];
}

const GameList: React.FC<GameListProps> = ({ collection }) => (
  <div>
    {collection.map((game) => (
      <GameDetail key={game.id} game={game} />
    ))}
  </div>
);

export default GameList;
