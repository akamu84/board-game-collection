import React, { useState, useEffect } from "react";

import { getCollectionAsync } from "./services/BoardGameGeekApi";
import { mergeCollections } from "./Helpers";
import { ICollection, IMergedGame } from "./models/index";
import GameList from "./components/presentation/GameList";
import AddUserForm from "./components/presentation/AddOwnerForm";
import OwnerList from "./components/presentation/OwnerList";
import FilterPanel from "./components/presentation/FilterPanel";
import FilterListIcon from "@material-ui/icons/FilterList";
import Fab from "@material-ui/core/Fab";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  fab: {
    margin: "0px",
    top: "auto",
    right: "20px",
    bottom: "20px",
    left: "auto",
    position: "fixed"
  }
});

const App: React.FC = () => {
  const classes = useStyles();

  const [collections, setCollections] = useState<ICollection[]>([]);
  const [masterCollection, setMasterCollection] = useState<IMergedGame[]>([]);
  const [owners, setOwners] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    let existingOwners = JSON.parse(localStorage.getItem("owners") as string);
    existingOwners.forEach((existingOwner: string) => {
      updateCollections(existingOwner);
    });
  });

  useEffect(() => {
    setMasterCollection(mergeCollections(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem("owners", JSON.stringify(owners));
  }, [owners]);

  const updateCollections = async (owner: string) => {
    if (!collectionExists(owner)) {
      const collection = await getCollectionAsync(owner);

      if (collection.hasError) {
        showError(collection.error);
      } else {
        setCollections(collections => [...collections, collection]);

        if (!ownerExists(owner)) {
          setOwners(owners => [...owners, owner]);
        }
      }
    }
  };

  const collectionExists = (owner: string): boolean =>
    collections.some(collection => collection.owner === owner);

  const ownerExists = (owner: string): boolean =>
    owners.some(existingOwner => existingOwner === owner);

  const showError = (error: string) => alert(error);

  return (
    <React.Fragment>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <AddUserForm updateCollections={updateCollections} />
        </Grid>
        <Grid item xs={12}>
          <OwnerList owners={owners} />
        </Grid>
        <Grid item>
          <GameList collection={masterCollection} />
        </Grid>
      </Grid>
      <Fab className={classes.fab} onClick={() => setOpen(true)}>
        <FilterListIcon />
      </Fab>
      <FilterPanel open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};

export default App;
