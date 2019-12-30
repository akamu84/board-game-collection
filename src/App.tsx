import React, { useState, useEffect, FormEvent } from "react";
import "./App.css";

import { getCollectionAsync, ICollection } from "./api/BoardGameGeekApi";
import { mergeCollections, IMergedGame } from "./Helpers";

const App: React.FC = () => {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [masterCollection, setMasterCollection] = useState<IMergedGame[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    setMasterCollection(mergeCollections(collections));
  }, [collections]);

  const updateCollections = async (e: FormEvent) => {
    e.preventDefault();
    let owner = userName.toLowerCase().trim();
    let collectionExists = collections.some(
      collection => collection.owner === owner
    );
    if (!collectionExists) {
      const collection = await getCollectionAsync(owner);
      if (collection.hasError) {
        showError(collection.error);
      } else {
        setCollections(collections => [...collections, collection]);
        setUserName("");
      }
    }
  };

  const showError = (error: string) => alert(error);

  return (
    <div>
      <form className="App" onSubmit={updateCollections}>
        <input
          type="text"
          required
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {masterCollection.map(game => (
        <div key={game.id}>
          <p>{game.id}</p>
          <p>{game.name}</p>
          <p>{game.published}</p>
          <p>{game.type}</p>
          <p>{game.image}</p>
          <p>{game.thumbnail}</p>
          <p>{game.stats.maxPlayers}</p>
          <p>{game.stats.minPlayers}</p>
          <p>{game.stats.playingTime}</p>
          <p>{game.rating}</p>
          <p>{game.owners.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
