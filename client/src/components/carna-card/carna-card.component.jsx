import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import carna from "./carna.png";
import Typography from "@material-ui/core/Typography";

import CustomButton from "../custom-button/custom-button.component";
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(#6e97f75c, #a9e3ff)",
    maxWidth: 200,
    maxHeight: 200,
    margin: "5px",
    width: 200,
  },
  media: {
    height: 20,
    width: 20,
  },
});
/*
Reusable Carna card with default values 
Can also be used for Course Card
*/
export const CarnaCard = ({
  top = "top",
  middle = "middle",
  text = null,
  form = false,
  operation = () => {
    console.log("hello world");
  },
  operation2 = () => {},
  topclick = () => {},
  dom_form = null,
  button2 = false,
  ...otherprops
}) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      onClick={() => topclick({ name: top, email: otherprops.email })}
    >
      {form ? (
        dom_form
      ) : (
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
            <Typography gutterBottom>{top}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {middle}
            </Typography>
          </CardContent>
        </CardActionArea>
      )}

      <CardActions>
        {text ? (
          <div style={{ display: "flex" }}>
            <CustomButton
              color={"white"}
              onClickFunctionProp={() => {
                operation(otherprops.email);
              }}
              height={"20px"}
              width={"50px"}
              margin={"5px"}
            >
              {text}
            </CustomButton>
            {button2 ? (
              <CustomButton
                onClickFunctionProp={() => {
                  operation2(otherprops.email);
                }}
                color={otherprops.join_course_privilege ? "white" : "red"}
                height={"20px"}
                width={"80px"}
                margin={"5px"}
              >
                {button2}
              </CustomButton>
            ) : null}
          </div>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default CarnaCard;
