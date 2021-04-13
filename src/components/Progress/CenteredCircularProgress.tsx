import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  loadingElem: {
    color: "#FFFFFF"
  }
});

export const CenteredCircularProgress = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.loadingElem} size={30} />
    </div>
  );
};
