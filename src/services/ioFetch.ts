import axios from "axios";
import { log } from "./log";

export const ioFetch = async (url?: string): Promise<string> => {
  if (!url) {
    return "";
  }
  log("YELLOW", true, "fetching this url", url);
  try {
    const response = await axios.get(url, {
      responseType: "text",
      validateStatus: null,
      timeout: 4000, // should i wait for 2s or 1s?
      timeoutErrorMessage: "Get call failed",
      maxRate: 2,
    });
    return response.data;
  } catch (err) {
    log("RED", true, "Get call failed");
    return "";
  }
};
