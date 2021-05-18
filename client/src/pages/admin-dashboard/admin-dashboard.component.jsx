import React, { useState } from "react";

//Material ui
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import CreateIcon from "@material-ui/icons/Create";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PeopleIcon from "@material-ui/icons/People";
import { useTheme } from "@material-ui/core/styles";
//My components
import Home from "../../components/home/home.component";
import ModifyUser from "../../components/modify-user/modify-user.component";
import CreateCourse from "../../components/create-course/create-course.component";
import CreateGroup from "../../components/create-group/create-group.component";
//img
import carna from "./carna.png";
//actions
import { signOutStart } from "../../redux/admin/admin.action";
//redux
import { connect } from "react-redux";
//styling
import { useStyles } from "./admin-dashboard.styles";

function ResponsiveDrawer(props) {
  const [page, setPage] = useState({
    home: true,
    modify_user: false,
    create_course: false,
    create_group: false,
  });

  const { window, signOutStart } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // for mobile usage
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const filterPage = (chosen_page) => {
    let newPage = { ...page };
    Object.keys(newPage).forEach((v) =>
      v === chosen_page ? (newPage[v] = true) : (newPage[v] = false)
    );
    setPage(newPage);
  };
  // Drawer is just the sidebar html
  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <List>
        {/*HOME  */}
        <ListItem button key={"HOME"} onClick={() => filterPage("home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"HOME"} />
        </ListItem>
      </List>
      {/*MODIFY USER  */}
      <List>
        <ListItem
          button
          key={"MODIFY USER"}
          onClick={() => {
            filterPage("modify_user");
          }}
        >
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary={"MODIFY USER"} />
        </ListItem>
      </List>

      {/* CREATE COURSE  */}
      <List>
        <ListItem
          button
          key={"CREATE COURSE"}
          onClick={() => filterPage("create_course")}
        >
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary={"CREATE COURSE"} />
        </ListItem>
      </List>

      <List>
        <ListItem
          button
          key={"CREATE GROUP"}
          onClick={() => filterPage("create_group")}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={"CREATE GROUP"} />
        </ListItem>
      </List>

      {/*LOG OUT  */}
      <List>
        <ListItem button key={"LOG OUT"} onClick={() => signOutStart()}>
          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>
          <ListItemText primary={"LOG OUT"} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.typography}>
            <img
              src={carna}
              alt="carna"
              style={{ height: "50px", width: "50px" }}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {page.home ? <Home /> : null}
        {page.modify_user ? <ModifyUser /> : null}
        {page.create_course ? <CreateCourse /> : null}
        {page.create_group ? <CreateGroup /> : null}
      </main>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(null, mapDispatchToProps)(ResponsiveDrawer);
