import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  withStyles
} from "@material-ui/core";
import { pink } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as localStorageService from "../../../infrastructure/localStorage/localStorageService";
import { updateNotificationsState } from "../../../store/reducers/twitchReducer";
import { AppDispatch } from "../../../store/store";

const useStyles = makeStyles({
  root: {
    height: 50,
    paddingRight: 45
  },
  button: {
    textTransform: "none",
    backgroundColor: "rgba(169, 112, 255, 0.4)",
    "&:hover": {
      backgroundColor: "rgba(169, 112, 255, 0.6)"
    }
  },
  user: {
    fontWeight: "bold"
  },
  icon: {
    minWidth: 40
  },
  switch: {
    paddingRight: 0
  }
});

const AntSwitch = withStyles(() => ({
  switchBase: {
    "&$checked": {
      color: pink[200]
    },
    "&$checked + $track": {
      backgroundColor: pink[200]
    }
  },
  checked: {},
  track: {}
}))(Switch);

export const SettingsNotifications = (): JSX.Element => {
  const classes = useStyles();
  const [notificationsFlag, setNotificationsFlag] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    (async () =>
      setNotificationsFlag(await localStorageService.getNotificationFlag()))();
  }, [dispatch]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationsFlag(event.target.checked);
    await dispatch(updateNotificationsState(event.target.checked));
  };

  return (
    <ListItem className={classes.root} dense>
      <ListItemIcon className={classes.icon}>
        <NotificationsIcon />
      </ListItemIcon>
      <ListItemText primary={<span>Activer les notifications de live</span>} />
      <ListItemSecondaryAction>
        <AntSwitch
          className={classes.switch}
          checked={notificationsFlag}
          onChange={async (e) => await handleChange(e)}
          name="notifications-state"
          color="secondary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
