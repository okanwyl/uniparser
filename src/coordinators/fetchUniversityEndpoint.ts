import { extractCourses } from "../logic/extractCourses";
import { extractCourseDetailPage } from "../logic/extractTeacherFromCourse";
import { fullURLBuilder } from "../logic/fullURLBuilder";
import { ioFetch } from "../services/ioFetch";
import { log } from "../services/log";
import { ParsedData, University } from "../types";

export const fetchUniversityEndpoint = async (university: University): Promise<ParsedData[] | undefined> => {
  const courseHtml: string | undefined = await ioFetch(university.url_endpoint);
  const slowFetchArray: ParsedData[] = [];
  if (courseHtml !== undefined) {
    let courses = extractCourses(courseHtml, university);
    // build all urls
    courses = courses.map((course) => {
      course.hrefCourseDetail = fullURLBuilder(university, course);
      return course;
    });

    let idx = 0;
    courses = await Promise.all(
      courses.map(async (item) => {
        const htmlPage: string | undefined = await ioFetch(item.hrefCourseDetail);
        idx++;
        if (htmlPage !== undefined) {
          // Ege university specific
          if (htmlPage.includes("Microsoft .NET Framework")) {
            slowFetchArray.push(item);
            delete courses[idx];
          }
          item.instructorName = extractCourseDetailPage(htmlPage, university);
        } else {
          slowFetchArray.push(item);
          delete courses[idx];
        }
        //delete item.hrefCourseDetail;
        return item;
      })
    ).then(async () => {
      log("RED", true, "Waiting for the server to unload traffic");
      // wait 10.5 second
      delay(100000000);
      log("RED", true, "starting slow fetching");
      for (const i of slowFetchArray) {
        const htmlPage: string | undefined = await ioFetch(i.hrefCourseDetail);
        delay(5000);
        if (htmlPage !== undefined) {
          i.instructorName = extractCourseDetailPage(htmlPage, university);
          if (i.instructorName == undefined) {
            log("RED", true, `Couldnt be able to extract instructor`);
            log("RED", true, `${i.hrefCourseDetail}`);
          } else {
            courses.push(i);
          }
        }
      }
      return courses;
    });

    return courses;
  }
  return undefined;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
