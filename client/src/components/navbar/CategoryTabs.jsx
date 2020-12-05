import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel (props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function selectedProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100vw',
  },
  Tab: {
    fontSize: 13,
  },
  indicator: {
    backgroundColor: '#0195df',
  },
}));

export default function CategoryTabs () {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          classes={{
            indicator: classes.indicator
          }}
        >
          <Tab label="UK" {...selectedProps(0)} className={classes.Tab} />
          <Tab label="World" {...selectedProps(1)} className={classes.Tab} />
          <Tab label="Entertainment" {...selectedProps(2)} className={classes.Tab} />
          <Tab label="Tech" {...selectedProps(3)} className={classes.Tab} />
          <Tab label="Science" {...selectedProps(4)} className={classes.Tab} />
          <Tab label="Sport" {...selectedProps(5)} className={classes.Tab} />
          <Tab label="Health" {...selectedProps(6)} className={classes.Tab} />
        </Tabs>
      </AppBar>

    </div>
  );
}
