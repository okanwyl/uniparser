import axios from "axios";

class AxiosFetcher {
  private client = axios.create({
    responseType: "text",
    validateStatus: null,
    timeout: 10000,
    timeoutErrorMessage: "Get call failed",
    maxRate: 50,
  });

  constructor() {
    return this;
  }

  async fetch(url?: string): Promise<string | undefined> {
    if (!url) {
      return undefined;
    }
    const proxy = getNextProxy();
    this.client({
      proxy: {
        host: proxy.ip,
        port: proxy.port,
      },
      headers: {
        "User-Agent": getNextUserAgent(),
      },
    });
    try {
      const response = await this.client.get(url);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`error http status code: ${err.status}`);
      }
      return undefined;
    }
  }
}

export default new AxiosFetcher();

const proxyList: { ip: string; port: number }[] = [
  { ip: "186.251.255.185", port: 31337 },
  { ip: "192.12.113.249", port: 4145 },
  { ip: "104.18.81.76", port: 80 },
  { ip: "190.2.153.31", port: 9050 },
  { ip: "94.182.26.44", port: 4153 },
  { ip: "88.119.49.4", port: 4153 },
  { ip: "103.76.188.65", port: 4153 },
  { ip: "162.243.140.82", port: 17463 },
  { ip: "194.233.69.126", port: 443 },
  { ip: "45.7.210.200", port: 4153 },
  { ip: "169.239.221.89", port: 1080 },
  { ip: "128.199.218.40", port: 29492 },
  { ip: "213.250.198.66", port: 4145 },
  { ip: "43.157.47.86", port: 443 },
  { ip: "27.116.61.15", port: 5678 },
  { ip: "186.211.6.137", port: 4145 },
  { ip: "159.192.97.156", port: 4145 },
  { ip: "36.90.225.79", port: 4153 },
  { ip: "81.201.63.13", port: 36643 },
  { ip: "172.67.38.96", port: 80 },
  { ip: "172.67.219.60", port: 80 },
  { ip: "51.83.116.5", port: 18543 },
  { ip: "141.98.235.233", port: 5555 },
  { ip: "138.97.0.87", port: 4145 },
  { ip: "190.104.213.175", port: 1080 },
  { ip: "171.232.74.46", port: 4005 },
  { ip: "103.79.96.201", port: 4153 },
  { ip: "188.255.244.73", port: 1080 },
  { ip: "112.87.5.245", port: 38801 },
  { ip: "92.42.249.58", port: 10801 },
  { ip: "212.186.128.58", port: 5678 },
  { ip: "111.160.16.187", port: 10800 },
  { ip: "177.184.67.89", port: 4145 },
  { ip: "183.88.6.29", port: 4153 },
  { ip: "181.209.106.186", port: 1080 },
  { ip: "36.95.35.49", port: 5678 },
  { ip: "173.212.221.21", port: 27075 },
  { ip: "122.3.255.114", port: 4145 },
  { ip: "116.58.254.88", port: 4145 },
  { ip: "8.9.31.216", port: 8080 },
  { ip: "103.52.144.49", port: 8080 },
  { ip: "103.240.33.145", port: 8291 },
  { ip: "185.66.59.227", port: 42647 },
  { ip: "202.158.49.142", port: 39172 },
  { ip: "95.165.17.138", port: 1080 },
  { ip: "114.242.116.57", port: 4145 },
  { ip: "82.103.118.42", port: 1099 },
  { ip: "46.227.37.49", port: 1088 },
  { ip: "157.230.8.196", port: 7497 },
  { ip: "124.106.234.215", port: 5678 },
  { ip: "212.200.118.254", port: 4153 },
  { ip: "212.50.53.130", port: 5678 },
  { ip: "47.113.179.6", port: 10705 },
  { ip: "200.218.240.9", port: 5678 },
  { ip: "177.105.68.12", port: 4153 },
  { ip: "157.119.224.117", port: 4145 },
  { ip: "177.38.5.16", port: 4153 },
  { ip: "117.202.20.70", port: 1088 },
  { ip: "170.254.92.198", port: 4153 },
  { ip: "109.224.22.34", port: 51372 },
  { ip: "146.145.199.110", port: 8080 },
  { ip: "51.83.116.6", port: 33894 },
  { ip: "182.160.102.149", port: 3128 },
  { ip: "67.213.212.16", port: 16676 },
  { ip: "104.18.237.128", port: 80 },
  { ip: "45.12.31.140", port: 80 },
  { ip: "20.205.32.51", port: 39149 },
  { ip: "188.255.244.5", port: 1080 },
  { ip: "113.204.4.142", port: 10800 },
  { ip: "103.243.114.206", port: 8080 },
  { ip: "223.26.16.1", port: 5678 },
  { ip: "176.115.14.32", port: 5678 },
  { ip: "45.70.204.254", port: 4145 },
  { ip: "178.33.14.218", port: 9999 },
  { ip: "197.82.166.158", port: 1080 },
  { ip: "181.119.67.4", port: 5678 },
  { ip: "89.237.32.193", port: 51549 },
  { ip: "103.210.29.100", port: 31433 },
  { ip: "119.18.159.34", port: 4145 },
  { ip: "103.70.159.132", port: 5678 },
  { ip: "177.105.68.37", port: 4153 },
  { ip: "66.33.212.161", port: 15891 },
  { ip: "101.255.77.244", port: 8080 },
  { ip: "114.231.8.16", port: 1080 },
  { ip: "162.12.217.30", port: 3629 },
  { ip: "103.5.172.242", port: 5678 },
  { ip: "193.106.57.96", port: 5678 },
  { ip: "95.182.78.8", port: 5678 },
  { ip: "75.119.207.141", port: 61438 },
  { ip: "105.213.172.74", port: 5678 },
  { ip: "201.48.125.221", port: 4153 },
  { ip: "185.32.4.65", port: 4153 },
  { ip: "185.14.149.225", port: 4145 },
  { ip: "177.131.29.213", port: 4153 },
  { ip: "103.251.214.167", port: 6667 },
  { ip: "43.248.25.6", port: 4145 },
  { ip: "43.134.167.223", port: 443 },
  { ip: "177.91.76.34", port: 4153 },
  { ip: "103.211.8.189", port: 44581 },
];

let currentProxy = 0;

function getNextProxy(): { ip: string; port: number } {
  const nextProxy = proxyList[currentProxy];
  currentProxy = (currentProxy + 1) % proxyList.length;
  return nextProxy;
}
const userAgentList = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763",
];

let currentUserAgent = 0;

function getNextUserAgent() {
  const nextUserAgent = userAgentList[currentUserAgent];
  currentUserAgent = (currentUserAgent + 1) % userAgentList.length;
  return nextUserAgent;
}
