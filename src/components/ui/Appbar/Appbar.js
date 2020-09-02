import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
//core
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  Badge,
  Divider,
  Fab,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  ListItem,
  Grid,
  Button,
} from "@material-ui/core";
//icon
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import NotificationsIcon from "@material-ui/icons/Notifications";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";

import { mainListItems, secondaryListItems } from "../ListItem/mainListItems";
import ElevationScroll from "../ElevationScroll/ElevationScroll";
import ScrollTop from "../ScrollTop/ScrollTop";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import LabelBottomNavigation from "../BottomNavigation/BottomNavigation";

import useStyles from "./AppbarStyles";
import MyMap from "../Map/Map";
import useSWR from "swr";

const fetcher = (...args) =>
  fetcher(...args).then((response) => response.json());

export default function ElevateAppBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const url =
    "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
  const { data, error } = useSWR(url, { fetcher });
  const [viewport, setViewport] = useState({
    latitude: 10.78,
    longitude: 106.654547,
    width: "100%",
    height: "80vh",
    zoom: 12,
  });

  const mapRef = useRef();

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <ElevationScroll {...props}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar id="back-to-top-anchor" className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {renderMenu}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      {/* <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaperLeft,
        }}
        anchor="left"
      >
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer> */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Breadcrumb />
          <Box
            container
            direction="column-reverse"
            justify="center"
            alignItems="stretch"
          >
            <MyMap
              {...viewport}
              maxZoom={20}
              center={[viewport.longitude, viewport.latitude]}
              onviewportChange={(newViewport) => {
                setViewport({ ...newViewport });
              }}
              ref={mapRef}
            />
          </Box>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
          >
            <LabelBottomNavigation />
          </Grid>
        </Container>
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </main>
    </div>
  );
}
