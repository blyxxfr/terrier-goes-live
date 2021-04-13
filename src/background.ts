"use strict";
import { BackgroundMessage } from "./domain/infrastructure/background/backgroundMessage";
import {
  MESSAGE_TYPES,
  POOLING_ALARM_NAME,
  POOLING_JUST_WENT_LIVE
} from "./domain/infrastructure/background/constants";
import { LiveStream } from "./domain/infrastructure/twitch/twitch";
import { fetchToken } from "./infrastructure/identityFlowAuth/identityFlowAuth";
import { getJustWentLive } from "./infrastructure/twitch/twitchService";
import { isWindows } from "./utils/operatingSystem";
import { browser } from "webextension-polyfill-ts";

let linkMap: { [notification: string]: string } = {};

browser.runtime.onMessage.addListener(async (msg: BackgroundMessage) => {
  if (msg.type === MESSAGE_TYPES.GET_TOKEN) {
    const data = msg.data as { prompt: unknown };
    return await fetchToken(!!data.prompt);
  } else if (msg.type === MESSAGE_TYPES.ENABLE_NOTIFICATIONS) {
    browser.alarms.create(POOLING_ALARM_NAME, {
      periodInMinutes: POOLING_JUST_WENT_LIVE
    });
  } else if (msg.type === MESSAGE_TYPES.DISABLE_NOTIFICATIONS) {
    await browser.alarms.clear(POOLING_ALARM_NAME);
  }
});

browser.alarms.onAlarm.addListener(async () => {
  try {
    linkMap = {};
    const justWentLiveStreams: LiveStream[] = await getJustWentLive();
    justWentLiveStreams.map(async (l) => {
      const message = ``;
      const clickHereMessage = "Cliquez ici pour lae regarder";
      const notificationId: string = await browser.notifications.create({
        type: "basic",
        title: `${l.display_name} est en live !`,
        contextMessage: isWindows() ? clickHereMessage : message,
        iconUrl: l.profile_image_url,
        message: isWindows() ? message : clickHereMessage
      });
      linkMap[notificationId] = `https://twitch.tv/${l.login}`;
    });
  } catch (e) {
    console.log(e);
  }
});

browser.notifications.onClicked.addListener(async (notificationId: string) => {
  await browser.notifications.clear(notificationId);

  const url = linkMap[notificationId];
  if (url) {
    await browser.tabs.create({ url });
  }
});
