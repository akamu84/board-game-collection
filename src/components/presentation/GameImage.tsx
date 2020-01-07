import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);

interface GameImageProps {
  image: string;
}

const GameImage: React.FC<GameImageProps> = ({ image }) => {
  const classes = useStyles();

  return (
    <Grid item>
      <div className={classes.image}>
        <img className={classes.img} alt="box art" src={image} />
      </div>
    </Grid>
  );
};

export default GameImage;
