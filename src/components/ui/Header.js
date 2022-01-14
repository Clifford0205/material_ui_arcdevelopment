import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  //   觸發後 將 MuiPaper-elevation0 變為 MuiPaper-elevation4
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// https://v4.mui.com/zh/customization/default-theme/
const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
  },
  logo: {
    height: '7em',
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (e, value) => {
    setValue(value);
  };
  return (
    <>
      {/* https://v4.mui.com/components/app-bar/ */}
      <ElevationScroll>
        <AppBar>
          {/* 移除 toolbar 左右padding */}
          <Toolbar disableGutters>
            <img src={logo} className={classes.logo} alt="company logo" />
            {/* https://v4.mui.com/zh/components/typography/ */}
            {/* <Typography variant="h3">Arc development</Typography> */}
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              indicatorColor="primary"
            >
              {/* https://v4.mui.com/zh/components/tabs/ */}
              <Tab
                className={classes.tab}
                component={Link}
                label="Home"
                to="/"
              ></Tab>
              <Tab
                className={classes.tab}
                component={Link}
                label="Services"
                to="/services"
              ></Tab>
              <Tab
                className={classes.tab}
                component={Link}
                label="The Revolution"
                to="/revolution"
              ></Tab>
              <Tab
                className={classes.tab}
                component={Link}
                label="About Us"
                to="/about"
              ></Tab>
              <Tab
                className={classes.tab}
                component={Link}
                label="Contact Us"
                to="/contact"
              ></Tab>
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* header與內容之間的緩衝 吃到default tool bar的高度*/}
      <div className={classes.toolbarMargin}></div>
    </>
  );
}
