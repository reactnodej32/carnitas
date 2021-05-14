import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#66a4ff",
    display: "flex",
  },
  drawer: {
    backgroundColor: "#66a4ff",
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  typography: {
    display: "none",

    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  appBar: {
    //top bar

    display: "flex",

    boxShadow: "unset",
    background: "unset",

    [theme.breakpoints.up("sm")]: {
      justifyContent: "center",
      alignItems: "center",
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  //Hamburger screen
  menuButton: {
    background: "linear-gradient(#6e97f75c, #a9e3ff)",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  //sidebar
  drawerPaper: {
    background: "linear-gradient(#6e97f75c, #a9e3ff)",
    width: drawerWidth,
  },
  //text
  content: {
    backgroundColor: "#66a4ff",
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
