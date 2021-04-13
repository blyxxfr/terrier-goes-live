import { BackgroundMessage } from "../../domain/infrastructure/background/backgroundMessage";
import { MESSAGE_TYPES } from "../../domain/infrastructure/background/constants";
import { browser } from "webextension-polyfill-ts";

export const sendEnableNotificationMessage = async (): Promise<unknown> =>
  browser.runtime.sendMessage({
    type: MESSAGE_TYPES.ENABLE_NOTIFICATIONS
  } as BackgroundMessage);

export const sendDisableNotificationMessage = async (): Promise<unknown> =>
  browser.runtime.sendMessage({
    type: MESSAGE_TYPES.DISABLE_NOTIFICATIONS
  } as BackgroundMessage);

export const sendGetTokenMessage = async (prompt = false): Promise<string> =>
  browser.runtime.sendMessage({
    type: MESSAGE_TYPES.GET_TOKEN,
    data: { prompt }
  } as BackgroundMessage);
