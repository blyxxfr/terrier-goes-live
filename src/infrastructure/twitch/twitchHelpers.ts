import axios, { AxiosInstance } from "axios";
import { CLIENT_ID } from "../../config";
import { axiosInterceptor } from "../axios/interceptors";
import { sendGetTokenMessage } from "../background/messageWrapper";
import * as localStorageService from "../localStorage/localStorageService";

const API_BASE_URL = "https://api.twitch.tv/helix";

export const createAxiosInstance = (): AxiosInstance =>
  axiosInterceptor(
    axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Client-Id": CLIENT_ID
      }
    })
  );

export const getRefreshToken = async (): Promise<string> => {
  const token = await sendGetTokenMessage();
  await localStorageService.storeToken(token);
  return token;
};

export const getToken = async (): Promise<string> => {
  try {
    const tokenStorage = await localStorageService.getToken();
    if (!tokenStorage) {
      const token = await sendGetTokenMessage(true);
      await localStorageService.storeToken(token);
      return token;
    }
    return tokenStorage;
  } catch (e) {
    console.error("Error getting token", e?.response?.data || e.message);
    throw e;
  }
};
