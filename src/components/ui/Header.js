import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
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
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },

  drawerIcon: {
    height: '50px',
    width: '50px',
  },

  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = e => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const menuOptions = [
    { name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0 },
    {
      name: 'Custom Software Development',
      link: '/services',
      activeIndex: 1,
      selectedIndex: 1,
    },
    {
      name: 'Mobile App Development',
      link: '/mobileapps',
      activeIndex: 1,
      selectedIndex: 2,
    },
    {
      name: 'Website  Development',
      link: '/websites',
      activeIndex: 1,
      selectedIndex: 3,
    },
  ];

  const routes = [
    { name: 'Home', link: '/', activeIndex: 0 },
    {
      name: 'Services',
      link: '/services',
      activeIndex: 1,
      ariaOwns: anchorEl ? 'simple-menu' : undefined,
      ariaPopup: anchorEl ? 'true' : undefined,
      mouseOver: event => handleClick(event),
    },
    { name: 'The Revolution', link: '/revolution', activeIndex: 2 },
    { name: 'About Us', link: '/about', activeIndex: 3 },
    { name: 'Contact Us', link: '/contact', activeIndex: 4 },
  ];

  useEffect(() => {
    [...menuOptions, ...routes].forEach(route => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex, value);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
    // if (window.location.pathname === '/' && value !== 0) {
    //   setValue(0);
    // } else if (window.location.pathname === '/services' && value !== 1) {
    //   setValue(1);
    // } else if (window.location.pathname === '/revolution' && value !== 2) {
    //   setValue(2);
    // } else if (window.location.pathname === '/about' && value !== 3) {
    //   setValue(3);
    // } else if (window.location.pathname === '/contact' && value !== 4) {
    //   setValue(4);
    // } else if (window.location.pathname === '/estimate' && value !== 5) {
    //   setValue(5);
    // }

    // switch (window.location.pathname) {
    //   case '/':
    //     if (value !== 0) {
    //       setValue(0);
    //     }
    //     break;
    //   case '/services':
    //     if (value !== 1) {
    //       setValue(1);
    //       setSelectedIndex(0);
    //     }
    //     break;
    //   case '/customsoftware':
    //     if (value !== 1) {
    //       setValue(1);
    //       setSelectedIndex(1);
    //     }
    //     break;
    //   case '/mobileapps':
    //     if (value !== 1) {
    //       setValue(1);
    //       setSelectedIndex(2);
    //     }
    //     break;
    //   case '/websites':
    //     if (value !== 1) {
    //       setValue(1);
    //       setSelectedIndex(3);
    //     }
    //     break;
    //   case '/revolution':
    //     if (value !== 2) {
    //       setValue(2);
    //     }
    //     break;
    //   case '/about':
    //     if (value !== 3) {
    //       setValue(3);
    //     }
    //     break;
    //   case '/contact':
    //     if (value !== 4) {
    //       setValue(4);
    //     }
    //     break;
    //   case '/estimate':
    //     if (value !== 5) {
    //       setValue(5);
    //     }
    //     break;
    //   default:
    //     break;
    // }
  }, [value, menuOptions, selectedIndex, routes]);

  const tabs = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}
        {/* https://v4.mui.com/zh/components/tabs/ */}

        {/* <Tab className={classes.tab} component={Link} label="Home" to="/"></Tab>
        <Tab
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup={anchorEl ? 'true' : undefined}
          className={classes.tab}
          component={Link}
          onMouseOver={event => handleClick(event)}
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
        ></Tab> */}
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      {/* https://v4.mui.com/zh/components/menus/ */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        //   https://v4.mui.com/zh/api/menu/
        classes={{ paper: classes.menu }}
        style={{ zIndex: 1302 }}
        // elevation 差別在陰影
        elevation={0}
        keepMounted
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={`${option}${i}`}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={event => {
              handleMenuItemClick(event, i);
              setValue(1);
              handleClose();
            }}
            selected={i === selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        {/* disablePadding 讓List跟上方沒距離 */}
        <List disablePadding>
          {routes.map(route => (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
              key={`${route}${route.activeIndex}`}
              divider
              button
              component={Link}
              to={route.link}
              selected={value === route.activeIndex}
              classes={{ selected: classes.drawerItemSelected }}
            >
              {/* disableTypography 取消文字的預設值 這裡指改變了字體*/}
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}

          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            divider
            button
            component={Link}
            to="/estimate"
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected,
            }}
            selected={value === 5}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      {/* https://v4.mui.com/components/app-bar/ */}
      <ElevationScroll>
        <AppBar className={classes.appBar}>
          {/* 移除 toolbar 左右padding */}
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              disableRipple
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <img src={logo} className={classes.logo} alt="company logo" />
            </Button>
            {/* https://v4.mui.com/zh/components/typography/ */}
            {/* <Typography variant="h3">Arc development</Typography> */}
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* header與內容之間的緩衝 吃到default tool bar的高度*/}
      <div className={classes.toolbarMargin}></div>
    </>
  );
}
