export interface IGame {
  id: number;
  type: string;
  name: string;
  published: number;
  image: string;
  thumbnail: string;
  stats: {
    minPlayers: number;
    maxPlayers: number;
    playingTime: number;
  };
  rating: number;
}

export interface ICollection {
  hasError: boolean;
  error: string;
  totalItems: number;
  owner: string;
  games: IGame[];
}

export interface IMergedGame {
  id: number;
  type: string;
  name: string;
  published: number;
  image: string;
  thumbnail: string;
  stats: {
    minPlayers: number;
    maxPlayers: number;
    playingTime: number;
  };
  rating: number;
  owners: string[];
}
