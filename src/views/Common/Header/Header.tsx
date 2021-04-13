import { Avatar, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import SyncIcon from "@material-ui/icons/Sync";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../store/reducers/rootReducer";
import { getLiveStreams } from "../../../store/reducers/twitchReducer";
import { AppDispatch } from "../../../store/store";

const useStyles = makeStyles({
  root: {
    padding: 15
  },
  title: {
    color: "#aaaaaa",
    maxWidth: "20ch",
    textAlign: "right",
    marginRight: "15px",
    fontSize: "12px"
  },
  spacer: {
    flexGrow: 1
  },
  buttons: {
    flexDirection: "column"
  }
});

export const Header = (): JSX.Element => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.common);
  const { livestreams } = useSelector((state: RootState) => state.twitch);

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root}
    >
      <div className={classes.buttons}>
        <IconButton component={Link} to="/settings" size="small">
          <SettingsIcon />
        </IconButton>
        {livestreams.length > 0 && (
          <IconButton
            onClick={() => dispatch(getLiveStreams())}
            disabled={loading}
            size="small"
          >
            <SyncIcon />
          </IconButton>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.title}>
        <p>Le Terrier à la conquête de Twitch</p>
      </div>
      <Avatar
        src={`${process.env.PUBLIC_URL}/assets/logo.png`}
        variant="rounded"
      />
    </Grid>
  );
};
