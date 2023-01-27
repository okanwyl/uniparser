import Cheerio from "cheerio";
import { ParsedData } from "../types";

export const extractCourses = (
  html: string,
  table_loop: string,
  course_ref: string,
  course_href_detail: string,
  course_name_ref: string
): ParsedData[] => {
  const teachers: ParsedData[] = [];
  const $ = Cheerio.load(html);

  $(table_loop).each((_i, tbody) => {
    // check eq?
    const courseCode = $(tbody).find(course_ref).eq(0).text().trim();
    let hrefCourseDetail = $(tbody).find(course_href_detail).eq(0).attr("href");

    // Check is href references same page
    if (hrefCourseDetail?.startsWith("#")) {
      // let it undefined
      hrefCourseDetail = "";
    }
    const courseName = $(tbody).find(course_name_ref).eq(2).text().trim() ?? "";

    if (courseCode && hrefCourseDetail && courseName) {
      teachers.push({ courseCode, hrefCourseDetail, courseName });
    }
  });

  return teachers;
};
