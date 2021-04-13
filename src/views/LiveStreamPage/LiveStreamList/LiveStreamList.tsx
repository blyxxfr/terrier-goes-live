import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { LiveStream } from "../../../domain/infrastructure/twitch/twitch";
import { LiveStreamListItem } from "./LiveStreamListItem/LiveStreamListItem";

interface LiveStreamListProps {
  liveStreams: LiveStream[];
}

const useStyles = makeStyles({
  root: {
    paddingLeft: 15,
    paddingRight: 15
  },
  list: {
    overflow: "auto",
    maxHeight: 300,
    paddingTop: 0,
    paddingBottom: 0,
    "&::-webkit-scrollbar": {
      width: "0.6em"
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 10
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: 10
    }
  }
});

export const LiveStreamList = ({
  liveStreams
}: LiveStreamListProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      {liveStreams.length > 0 && (
        <List className={classes.list}>
          <div className={classes.root}>
            {liveStreams.map((elem: LiveStream) => (
              <LiveStreamListItem {...elem} key={elem.id} />
            ))}
          </div>
        </List>
      )}
    </div>
  );
};
