import { Button, Slider } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { IMergedGame } from '../../models/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';
import StarsIcon from '@material-ui/icons/Stars';
import Typography from '@material-ui/core/Typography';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: 0,
    },
    list: {
      width: '500px',
    },
    listItem: {
      marginTop: '1.5rem',
    },
  }),
);

interface FilterPanelProps {
  masterCollection: IMergedGame[];
  setMasterCollection: (masterCollection: IMergedGame[]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  masterCollection,
  setMasterCollection,
}) => {
  const classes = useStyles();

  const [players, setPlayers] = React.useState<number[]>([0, 100]);
  const [rating, setRating] = React.useState<number[]>([0, 10]);
  const [playTime, setPlayTime] = React.useState<number[]>([0, 240]);

  const valuetext = (value: number) => {
    return `${value}`;
  };

  const clearFilters = () => {
    setPlayers([0, 20]);
    setRating([0, 10]);
    setPlayTime([0, 240]);
    const collection = masterCollection.map((game) => ({
      ...game,
      filtered: false,
    }));
    setMasterCollection(collection);
  };

  const handlePlayerChange = (event: any, newValue: number | number[]) => {
    setPlayers(newValue as number[]);
  };

  const handlePlayTimeChange = (event: any, newValue: number | number[]) => {
    setPlayTime(newValue as number[]);
  };

  const handleRatingChange = (event: any, newValue: number | number[]) => {
    setRating(newValue as number[]);
  };

  const handleCommitted = () => {
    const collection = masterCollection.map((game) => {
      const maxPlayTime = playTime[1] === 240 ? 999 : playTime[1];

      const maxPlayers = players[1] === 20 ? 999 : players[1];

      const playerFilter =
        game.stats.minPlayers >= players[0] &&
        game.stats.maxPlayers <= maxPlayers;

      const timeFilter =
        game.stats.playingTime >= playTime[0] &&
        game.stats.playingTime <= maxPlayTime;

      const ratingFilter = game.rating >= rating[0] && game.rating <= rating[1];

      game.filtered = !playerFilter || !timeFilter || !ratingFilter;
      return game;
    });
    setMasterCollection(collection);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="filter-panel-content"
          id="filter-panel-header"
        >
          <Typography>Filter</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <Slider
                value={players}
                onChange={handlePlayerChange}
                onChangeCommitted={handleCommitted}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                max={20}
              />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <WatchLaterIcon />
              </ListItemIcon>
              <Slider
                value={playTime}
                onChange={handlePlayTimeChange}
                onChangeCommitted={handleCommitted}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                max={240}
              />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <StarsIcon />
              </ListItemIcon>
              <Slider
                value={rating}
                onChange={handleRatingChange}
                onChangeCommitted={handleCommitted}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                max={10}
              />
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button onClick={clearFilters}>Clear</Button>
            </ListItem>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default FilterPanel;
