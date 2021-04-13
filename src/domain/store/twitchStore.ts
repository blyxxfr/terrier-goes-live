import { LiveStream } from "../infrastructure/twitch/twitch";

export interface TwitchStore {
  livestreams: LiveStream[];
}
