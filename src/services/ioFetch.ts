import axios from "axios";

const FONT_RED = "\x1b[31m";
// const FONT_RED_END = "\x1b[0m";
const FONT_GREEN_START = "\x1b[32m";
const FONT_YELLOW_START = "\x1b[33m";
const FONT_YELLOW_END = "\x1b[0m";
const FONT_GREEN_END = "\x1b[0m";
export const ioFetch = async (url?: string): Promise<string> => {
  if (!url) {
    return "";
  }
  console.log(
    FONT_GREEN_START,
    `Fetching this url: ${FONT_YELLOW_START}${url} ${FONT_YELLOW_END}`,
    FONT_GREEN_END
  );
  try {
    const response = await axios.get(url, {
      responseType: "text",
      validateStatus: null,
      timeout: 2000, // should i wait for 2s or 1s?
      timeoutErrorMessage: "Get call failed",
      maxRate: 2,
    });
    return response.data;
  } catch (err) {
    console.error(FONT_RED, "Get call failed");
    return "";
  }
};
