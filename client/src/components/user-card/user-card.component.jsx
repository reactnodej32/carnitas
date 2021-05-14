import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";

import carna from "./carna.png";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(#6e97f75c, #a9e3ff)",
    maxWidth: 200,
    maxHeight: 150,
    margin: "5px",
  },
  media: {
    height: 20,
    width: 20,
  },
});

export function UserCard({ user: { name, email, motto } }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={carna}
          alt="card-carna"
          style={{
            padding: "2px",
            height: "50px",
            width: "50px",
          }}
        />

        <CardContent>
          <Typography gutterBottom>{name}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {motto}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default UserCard;
