import { fetchUniversityEndpoint } from "./coordinators/fetchUniversityEndpoint";
import * as inp from "./universities.json";
import { University } from "./types";
import { ioWriteFileCSV } from "./services/ioWriteCsv";
import { processArguments } from "./services/processArguments";
import { log } from "./services/log";

// @TODO Consider using real arrays <ArrayBuffer>
const uniJSON: University[] = inp.universities;
const filename = "parsed.csv";
const uniCount = uniJSON.length;
const args = processArguments();

console.log("=== Node University Scraper ===");

// @TODO learn how to parse json line by line and use
async function main() {
    if (args["university"] !== undefined) {
        const university: University | undefined = uniJSON.find(function(
            value
        ) {
            return value.initials == args["university"];
        });
        if (university !== undefined) {
            const courses = await fetchUniversityEndpoint(university);
            if (courses !== undefined) {
                ioWriteFileCSV(filename, courses);
            }
            console.log("finised");
            process.exit();
        } else {
            log("RED", false, "University is invalid");
        }
    } else {
        for (let i = 0; i < uniCount; i++) {
            const inpUni: University = uniJSON[i];
            const courses = await fetchUniversityEndpoint(inpUni);
            if (courses !== undefined) {
                ioWriteFileCSV(filename, courses);
            }
        }
    }
}

main();
