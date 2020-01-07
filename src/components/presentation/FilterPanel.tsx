import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';
import { Slider } from '@material-ui/core';
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

interface FilterPanelProps {}

const FilterPanel: React.FC<FilterPanelProps> = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState<number[]>([0, 100]);

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
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
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
              />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <WatchLaterIcon />
              </ListItemIcon>
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
              />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <StarsIcon />
              </ListItemIcon>
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
              />
            </ListItem>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default FilterPanel;
