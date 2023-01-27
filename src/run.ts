import { fetchUniversityEndpoint } from "./coordinators/fetchUniversityEndpoint";
import * as inp from "./universities.json";
import { University } from "./types";
const { version } = require("../package.json");
const uniJSON: University[] = inp.universities;
const count = inp.count;

console.log(`=== Node News Scraper (${version}) ===`);

// @TODO learn how to parse json line by line and use
async function main() {
  for (let i = 0; i < count; i++) {
    console.log(uniJSON[i]);
    const courses = await fetchUniversityEndpoint(
      uniJSON[i].url_endpoint,
      uniJSON[i].table_loop,
      uniJSON[i].course_ref,
      uniJSON[i].course_href_detail,
      uniJSON[i].course_name_ref
    );
  }
}
main();
