import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ownerInfo: {
      marginTop: '.5rem',
    },
  }),
);

interface OwnerListProps {
  owners: string[];
  removeOwner?: (owner: string) => void;
}

const OwnerList: React.FC<OwnerListProps> = ({ owners, removeOwner }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      direction="row"
      spacing={1}
      className={classes.ownerInfo}
    >
      {owners.map((owner) => (
        <Grid item key={owner}>
          {removeOwner ? (
            <Chip
              size="small"
              color="primary"
              icon={<AccountCircle />}
              label={owner}
              onDelete={(e) => removeOwner(owner)}
            />
          ) : (
            <Chip
              size="small"
              color="primary"
              icon={<AccountCircle />}
              label={owner}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default OwnerList;
