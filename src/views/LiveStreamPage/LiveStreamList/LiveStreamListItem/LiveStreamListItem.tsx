import {
  Avatar,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { LiveStream } from "../../../../domain/infrastructure/twitch/twitch";
import { formatViewers } from "../../../../utils/formatter";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#272632",
    "&:hover": {
      backgroundColor: "#302E41"
    },
    backdropFilter: "blur(5px)",
    height: 50,
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight: 15,
    marginBottom: 15,
    borderRadius: 15
  },
  gameText: {
    fontSize: 11
  },
  viewersText: {
    fontSize: 13,
    paddingRight: 3
  }
});

export const LiveStreamListItem = (elem: LiveStream): JSX.Element => {
  const classes = useStyles();

  const avatarShadow = {
    boxShadow: "6px 10px 12px -2px rgba(32, 20, 52, 0.75)",
    "-webkit-box-shadow": "6px 10px 12px -2px rgba(32, 20, 52, 0.75)",
    "-moz-box-shadow": "6px 10px 12px -2px rgba(32, 20, 52, 0.75)"
  };

  const viewers = elem.stream ? (
    <Chip
      label={formatViewers(elem.stream.viewer_count || 0)}
      color="secondary"
      size="small"
      deleteIcon={<VisibilityIcon />}
      onDelete={() => {
        /* do nothing */
      }}
    />
  ) : (
    <Typography
      noWrap
      variant={"subtitle1"}
      color={"textSecondary"}
      className={classes.viewersText}
    >
      Hors ligne
    </Typography>
  );

  return (
    <ListItem
      className={classes.root}
      button
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      href={`https://twitch.tv/${elem.login}`}
      divider
      dense
    >
      <ListItemAvatar>
        <Avatar src={elem.profile_image_url} style={avatarShadow} />
      </ListItemAvatar>
      <ListItemText
        primary={elem.display_name}
        secondary={
          <Typography
            className={classes.gameText}
            noWrap
            variant={"subtitle2"}
            color={"textSecondary"}
          >
            {elem.stream?.game_name}
          </Typography>
        }
      />
      <ListItemSecondaryAction>{viewers}</ListItemSecondaryAction>
    </ListItem>
  );
};
