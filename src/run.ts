import { fetchUniversityEndpoint } from "./coordinators/fetchUniversityEndpoint";
import * as inp from "./universities.json";
import { University } from "./types";
import { ioWriteFileCSV } from "./services/ioWriteCsv";

// @TODO Consider using real arrays <ArrayBuffer>
const uniJSON: University[] = inp.universities;
const filename = "parsed.csv";

console.log("=== Node University Scraper ===");

// @TODO learn how to parse json line by line and use
async function main() {
  for (let i = 0; i < inp.count; i++) {
    const inpUni: University = uniJSON[i];
    const courses = await fetchUniversityEndpoint(inpUni);
    ioWriteFileCSV(filename, courses);
  }
}

main();
