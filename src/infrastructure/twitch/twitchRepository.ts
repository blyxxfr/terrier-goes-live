import axios, { AxiosInstance } from "axios";
import {
  LiveStream,
  Streams,
  Users
} from "../../domain/infrastructure/twitch/twitch";
import { createAxiosInstance, getRefreshToken } from "./twitchHelpers";
import { CHANNELS_URL } from "../../config";

let apiInstance: AxiosInstance;

const getApiInstance = (): AxiosInstance => {
  if (!apiInstance) {
    apiInstance = createAxiosInstance();
  }
  return apiInstance;
};

export const getAllLiveStreams = async (): Promise<LiveStream[]> => {
  try {
    // Get channels
    const channelIds: number[] = (await axios.get(CHANNELS_URL)).data;
    console.log(channelIds);
    // Generate URLs
    const usersUrl = `/users?${channelIds.map((id) => `id=${id}`).join("&")}`;
    const streamsUrl = `/streams?${channelIds
      .map((id) => `user_id=${id}`)
      .join("&")}`;
    // Fetch data
    const users: Users = (await getApiInstance().get(usersUrl)).data;
    const streams: Streams = (await getApiInstance().get(streamsUrl)).data;
    return users.data.map((u) => ({
      ...u,
      stream: streams.data.find((s) => s.user_id === u.id)
    }));
  } catch (e) {
    console.error("Error getting streams", JSON.stringify(e));
    if (e.message === "Request failed with status code 401")
      await getRefreshToken();
    throw e;
  }
};
