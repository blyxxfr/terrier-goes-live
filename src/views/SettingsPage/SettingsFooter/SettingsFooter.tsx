import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../store/reducers/rootReducer";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: 5,
    paddingBottom: 8,
    paddingRight: 15
  },
  button: {
    textTransform: "none"
  }
});

export const SettingsFooter = (): JSX.Element => {
  const classes = useStyles();

  const { loading } = useSelector((state: RootState) => state.common);

  return (
    <div className={classes.root}>
      <Button
        component={Link}
        className={classes.button}
        variant="outlined"
        size={"small"}
        disabled={loading}
        startIcon={<ArrowBackIcon />}
        to="/"
      >
        Retour
      </Button>
    </div>
  );
};
