// @TODO Think later and drop the third party library
import { writeFile } from "fs/promises";
import * as fs from "fs";
import { log } from "./log";

export const ioWriteFileCSV = async (
  file: string,
  data: object[]
): Promise<void> => {
  if (!data || !data.length) {
    return;
  }
  const convertedToCSV = objectsToCSV(data);

  if (fs.existsSync(file)) {
    appendFile(file, convertedToCSV)
      .then(() => log("GREEN", true, `Data writed to ${file}`))
      .catch(() => log("RED", true, "I/O error"));
  } else {
    writeFile(file, convertedToCSV, {});
    log("GREEN", true, `Data writed to ${file}`);
  }
};

// @TODO Think a better way and check
// RFC standards: https://www.rfc-editor.org/rfc/rfc4180
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function objectsToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr);
  return array
    .map((row) => {
      return Object.values(row)
        .map((value) => {
          return typeof value === "string" ? JSON.stringify(value) : value;
        })
        .toString();
    })
    .join("\n");
}

async function appendFile(filePath: string, data: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
