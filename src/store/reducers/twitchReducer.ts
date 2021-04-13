import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LiveStream } from "../../domain/infrastructure/twitch/twitch";
import { TwitchStore } from "../../domain/store/twitchStore";
import {
  sendDisableNotificationMessage,
  sendEnableNotificationMessage
} from "../../infrastructure/background/messageWrapper";
import * as localStorageService from "../../infrastructure/localStorage/localStorageService";
import { getAllLiveStreams } from "../../infrastructure/twitch/twitchRepository";
import { AppThunk } from "../store";
import { setLoading } from "./commonReducer";

export const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const twitchSlice = createSlice({
  name: "twitch",
  initialState: {
    livestreams: []
  } as TwitchStore,
  reducers: {
    sortByViewers: (state: TwitchStore) => {
      state.livestreams.sort(
        (a: LiveStream, b: LiveStream) =>
          (b.stream?.viewer_count ?? 0) - (a.stream?.viewer_count ?? 0) ||
          a.display_name.localeCompare(b.display_name)
      );
    },
    saveLiveStreams: (
      state: TwitchStore,
      { payload }: PayloadAction<LiveStream[]>
    ) => {
      state.livestreams = payload;
    },
    resetLiveStreams: (state: TwitchStore) => {
      state.livestreams = [];
    }
  }
});

const {
  sortByViewers,
  saveLiveStreams,
  resetLiveStreams
} = twitchSlice.actions;

/**
 * Get the all the live streams from the favorites list
 */
export const getLiveStreams = (): AppThunk<void> => async (dispatch) => {
  dispatch(setLoading());
  try {
    dispatch(resetLiveStreams());
    const streams = await getAllLiveStreams();
    dispatch(saveLiveStreams(streams));
    dispatch(sortByViewers());
  } catch (e) {
    console.log("An unexpected error was thrown", e);
  } finally {
    dispatch(setLoading());
  }
};

export const updateNotificationsState = (
  state: boolean
): AppThunk<void> => async (dispatch) => {
  dispatch(setLoading());
  await localStorageService.storeNotificationsFlag(state);
  if (state) {
    await sendEnableNotificationMessage();
  } else {
    await sendDisableNotificationMessage();
  }
  dispatch(setLoading());
};

export const { reducer: twitchReducer } = twitchSlice;
