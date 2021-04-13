import { Divider, List, ListSubheader } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { CenteredCircularProgress } from "../../components/Progress/CenteredCircularProgress";
import { RootState } from "../../store/reducers/rootReducer";
import { SettingsFooter } from "./SettingsFooter/SettingsFooter";
import { SettingsNotifications } from "./SettingsNotifications/SettingsNotifications";

export const SettingsPage = (): JSX.Element => {
  const { loading } = useSelector((state: RootState) => state.common);

  return (
    <div>
      <List subheader={<ListSubheader>Paramètres</ListSubheader>}>
        <SettingsNotifications />
      </List>
      {loading && <CenteredCircularProgress />}
      <Divider />
      <SettingsFooter />
    </div>
  );
};
