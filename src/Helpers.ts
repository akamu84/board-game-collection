import { ICollection, IGame, IMergedGame } from "./models/index";

export function mergeCollections(collections: ICollection[]): IMergedGame[] {
  let games = [] as IMergedGame[];

  collections.forEach(collection => {
    collection.games.forEach(game => {
      // Check if the game is already in the array
      let index = games.findIndex(existingGame => existingGame.id === game.id);
      if (index >= 0) {
        // Add the collection owner as an owner to the existing game
        games[index].owners.push(collection.owner);
        games[index].owners.sort();
      } else {
        // Add the game to the array
        games.push(convertGameToMergedGame(collection.owner, game));
      }
    });
  });

  return games.sort((a, b) => (a.name > b.name ? 1 : -1));
}

// Convert the incoming game object to the merged game object
function convertGameToMergedGame(owner: string, game: IGame): IMergedGame {
  let mergedGame = {} as IMergedGame;
  mergedGame.id = game.id;
  mergedGame.type = game.type;
  mergedGame.name = game.name;
  mergedGame.published = game.published;
  mergedGame.image = game.image;
  mergedGame.thumbnail = game.thumbnail;
  mergedGame.stats = game.stats;
  mergedGame.rating = roundRating(game.rating);
  mergedGame.owners = [];
  mergedGame.owners.push(owner);

  return mergedGame;
}

// Round to one decimal
function roundRating(rating: number): number {
  return Math.round(rating * 10) / 10;
}
