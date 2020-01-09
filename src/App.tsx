import { ICollection, IMergedGame } from './models/index';
import React, { useEffect, useState } from 'react';

import AddOwnerForm from './components/presentation/AddOwnerForm';
import FilterPanel from './components/presentation/FilterPanel';
import GameList from './components/presentation/GameList';
import { Grid } from '@material-ui/core';
import OwnerList from './components/presentation/OwnerList';
import { getCollectionAsync } from './services/BoardGameGeekApi';
import { makeStyles } from '@material-ui/core/styles';
import { mergeCollections } from './Helpers';

const useStyles = makeStyles({
  gameList: {
    marginBottom: '3rem',
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  const [collections, setCollections] = useState<ICollection[]>([]);
  const [masterCollection, setMasterCollection] = useState<IMergedGame[]>([]);
  const [owners, setOwners] = useState<string[]>([]);

  useEffect(() => {
    let existingOwners = JSON.parse(localStorage.getItem('owners') as string);
    if (existingOwners) {
      existingOwners.forEach((existingOwner: string) => {
        addOwner(existingOwner);
      });
    }
  });

  useEffect(() => {
    setMasterCollection(mergeCollections(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('owners', JSON.stringify(owners));
  }, [owners]);

  const addOwner = async (owner: string) => {
    if (!collectionExists(owner)) {
      const collection = await getCollectionAsync(owner);

      if (collection.hasError) {
        showError(collection.error);
      } else {
        setCollections((collections) => [...collections, collection]);

        if (!ownerExists(owner)) {
          setOwners((owners) => [...owners, owner]);
        }
      }
    }
  };

  const removeOwner = (owner: string) => {
    let filteredOwners = owners.filter(
      (existingOwner) => existingOwner !== owner,
    );
    localStorage.setItem('owners', JSON.stringify(filteredOwners));
    setOwners(filteredOwners);
    setCollections(
      collections.filter((collection) => collection.owner !== owner),
    );
  };

  const collectionExists = (owner: string): boolean =>
    collections.some((collection) => collection.owner === owner);

  const ownerExists = (owner: string): boolean =>
    owners.some((existingOwner) => existingOwner === owner);

  const showError = (error: string) => alert(error);

  return (
    <React.Fragment>
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <AddOwnerForm addOwner={addOwner} />
        </Grid>
        <Grid item xs={12}>
          <OwnerList owners={owners} removeOwner={removeOwner} />
        </Grid>
        <Grid item xs={12} className={classes.gameList}>
          <GameList collection={masterCollection} />
        </Grid>
      </Grid>
      <FilterPanel
        masterCollection={masterCollection}
        setMasterCollection={setMasterCollection}
      />
    </React.Fragment>
  );
};

export default App;
