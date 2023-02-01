import { log } from "./log";

// TODO: Should i remove all flag?
// Argument handler function
const possibleArguments: string[] = ["university", "all"];
export function processArguments() {
  const args: { [key: string]: string | boolean } = {};
  process.argv.slice(2, process.argv.length).forEach((arg) => {
    // long arg
    if (arg.slice(0, 2) === "--") {
      const longArg = arg.split("=");
      const longArgFlag = longArg[0].slice(2, longArg[0].length);
      const longArgValue = longArg.length > 1 ? longArg[1] : true;
      if (!possibleArguments.includes(longArgFlag)) {
        log("RED", false, "Not a valid argument");
        process.exit(1);
      }
      if (longArgFlag === "university" && longArgValue === true) {
        log("RED", false, "University argument should be filled");
        process.exit(1);
      }

      args[longArgFlag] = longArgValue;
    } else {
      log("RED", false, "Not a valid argument");
      process.exit(1);
    }
  });

  if (Object.keys(args).length >= 2) {
    log("RED", false, "Not a valid usage of args");
    process.exit(1);
  }
  return args;
}
