import Cheerio from "cheerio";
import { ParsedData, University } from "../types";

export const extractCourses = (html: string, university: University): ParsedData[] => {
  const parsedArray: ParsedData[] = [];
  const $ = Cheerio.load(html);

  $(university.table_loop).each((_i, tbody) => {
    // check eq?
    const courseCode = $(tbody).find(university.course_ref).eq(Number(university.course_code_index)).text().trim();
    let hrefCourseDetail = $(tbody).find(university.course_href_detail).eq(0).attr("href");

    // Check is href references same page
    if (hrefCourseDetail?.startsWith("#")) {
      // let it undefined
      hrefCourseDetail = "";
    }
    const courseName =
      $(tbody).find(university.course_name_ref).eq(Number(university.course_name_ref_index)).text().trim() ?? "";

    if (courseCode.includes("\t")) {
      return;
    }
    if (courseCode && hrefCourseDetail && courseName) {
      parsedArray.push({ courseCode, hrefCourseDetail, courseName });
    }
  });

  return parsedArray;
};
