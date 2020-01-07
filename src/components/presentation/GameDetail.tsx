import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import GameImage from './GameImage';
import GameInfo from './GameInfo';
import GameRating from './GameRating';
import Grid from '@material-ui/core/Grid';
import { IMergedGame } from '../../models/index';
import OwnerList from './OwnerList';
import Paper from '@material-ui/core/Paper';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      marginBottom: '.5rem',
      maxWidth: 500,
    },
  }),
);

interface GameDetailProps {
  game: IMergedGame;
}

const GameDetail: React.FC<GameDetailProps> = ({ game }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} square>
        <Grid container spacing={2}>
          <GameImage image={game.image} />
          <Grid item xs container>
            <GameInfo game={game} />
            <GameRating rating={game.rating} />
          </Grid>
        </Grid>
        <OwnerList owners={game.owners} />
      </Paper>
    </div>
  );
};

export default GameDetail;
