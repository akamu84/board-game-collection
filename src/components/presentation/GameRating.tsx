import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import StarsIcon from "@material-ui/icons/Stars";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export interface GameRatingProps {
  rating: number;
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

const GameRating: React.FC<GameRatingProps> = ({ rating }) => {
  const classes = useStyles();

  return (
    <Grid item>
      <Typography variant="subtitle1" className={classes.text}>
        {rating.toString().length === 1 ? `${rating}.0` : rating}
        <StarsIcon
          fontSize="small"
          style={{ color: "gold" }}
          className={classes.icon}
        />
      </Typography>
    </Grid>
  );
};

export default GameRating;
