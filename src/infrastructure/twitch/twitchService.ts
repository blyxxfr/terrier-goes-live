import { POOLING_JUST_WENT_LIVE } from "../../domain/infrastructure/background/constants";
import { LiveStream } from "../../domain/infrastructure/twitch/twitch";
import { getAllLiveStreams } from "./twitchRepository";

export const getJustWentLive = async (): Promise<LiveStream[]> => {
  const streams: LiveStream[] = await getAllLiveStreams();
  const nowUTC: Date = new Date(new Date().getTime());
  return streams.filter(
    (l: LiveStream) =>
      l.stream &&
      Math.round(
        (nowUTC.getTime() - new Date(l.stream.started_at).getTime()) /
          (60 * 1000)
      ) <= POOLING_JUST_WENT_LIVE
  );
};
