import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CenteredCircularProgress } from "../../components/Progress/CenteredCircularProgress";
import { RootState } from "../../store/reducers/rootReducer";
import { getLiveStreams } from "../../store/reducers/twitchReducer";
import { AppDispatch } from "../../store/store";
import { LiveStreamList } from "./LiveStreamList/LiveStreamList";

export const LiveStreamPage = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.common);
  const { livestreams } = useSelector((state: RootState) => state.twitch);

  useEffect(() => {
    dispatch(getLiveStreams());
  }, [dispatch]);

  return (
    <div>
      {!loading && livestreams.length === 0 && (
        <Typography align={"center"}>Aucune chaîne à afficher...</Typography>
      )}
      {!loading && livestreams.length > 0 && (
        <LiveStreamList liveStreams={livestreams} />
      )}
      {loading && <CenteredCircularProgress />}
    </div>
  );
};
