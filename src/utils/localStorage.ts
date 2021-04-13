import { browser } from "webextension-polyfill-ts";

/**
 * Get data from local storage
 * @param {string} key - Item key
 */
export const getStorageData = async (key: string): Promise<unknown> => {
  const storage = await browser.storage.local.get(key);
  return storage[key];
};

/**
 * Save data in local storage
 * @param {string} key - Data key
 * @param {string} value - Data to be stored
 */
export const setStorageData = async (
  key: string,
  value: unknown
): Promise<void> => await browser.storage.local.set({ [key]: value });

/**
 * Removes item from local storage
 * @param {string} key - Data key
 */ export const removeStorageData = async (key: string): Promise<void> =>
  await browser.storage.local.remove(key);
