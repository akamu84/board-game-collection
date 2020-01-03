import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

export interface OwnerListProps {
  owners: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ownerInfo: {
      marginTop: ".5rem"
    }
  })
);

const OwnerList: React.FC<OwnerListProps> = ({ owners }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      direction="row"
      spacing={1}
      className={classes.ownerInfo}
    >
      {owners.map(owner => (
        <Grid item key={owner}>
          <Chip
            size="small"
            color="primary"
            icon={<AccountCircle />}
            label={owner}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default OwnerList;
