import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import PeopleIcon from "@material-ui/icons/People";
import Grid from "@material-ui/core/Grid";
import { IMergedGame } from "../../models";

export interface GameInfoProps {
  game: IMergedGame;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      display: "flex",
      alignItems: "center"
    },
    icon: {
      marginLeft: ".5rem"
    }
  })
);

const GameInfo: React.FC<GameInfoProps> = ({ game }) => {
  const classes = useStyles();

  return (
    <Grid item xs container direction="column" spacing={1}>
      <Grid item xs>
        <Typography gutterBottom variant="h6">
          {game.name}
        </Typography>
        <Typography variant="body2" gutterBottom className={classes.text}>
          {game.stats.playingTime}
          {"m"}
          <WatchLaterIcon fontSize="small" className={classes.icon} />
        </Typography>
        <Typography variant="body2" gutterBottom className={classes.text}>
          {game.stats.minPlayers === game.stats.maxPlayers
            ? game.stats.minPlayers
            : `${game.stats.minPlayers}-${game.stats.maxPlayers}`}
          <PeopleIcon fontSize="small" className={classes.icon} />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default GameInfo;
