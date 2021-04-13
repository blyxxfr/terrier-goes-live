import {
  NOTIFICATIONS_ENABLE_KEY,
  TOKEN_KEY
} from "../../domain/utils/localStorageContants";
import { getStorageData, setStorageData } from "../../utils/localStorage";

/**
 * Returns if the notifications are enabled
 */
export const getNotificationFlag = async (): Promise<boolean> =>
  (await getStorageData(NOTIFICATIONS_ENABLE_KEY)) as boolean;

/**
 * saves the current state of the notifications
 * @param {boolean} state - Notifications flag
 */
export const storeNotificationsFlag = async (state: boolean): Promise<void> =>
  await setStorageData(NOTIFICATIONS_ENABLE_KEY, state);

/**
 * Returns Twitch token
 */
export const getToken = async (): Promise<string> =>
  (await getStorageData(TOKEN_KEY)) as string;

/**
 * Saves the Twitch token
 * @param { string } token - Twitch authentication token
 */
export const storeToken = async (token: string): Promise<void> =>
  await setStorageData(TOKEN_KEY, token);
