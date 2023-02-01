import axios from "axios";
import { log } from "./log";

export const ioFetch = async (url?: string): Promise<string | undefined> => {
    if (!url) {
        return undefined;
    }
    log("YELLOW", true, "fetching this url", url);
    try {
        const response = await axios.get(url, {
            responseType: "text",
            validateStatus: null,
            timeout: 10000,
            timeoutErrorMessage: "Get call failed",
            maxRate: 50,
        });
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            log("RED", true, `Get call failed: Response code ${err.response} `);
        }
        return undefined;
    }
};
