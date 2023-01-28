import Cheerio from "cheerio";
import { ParsedData, University } from "../types";

export const extractCourses = (
  html: string,
  university: University
): ParsedData[] => {
  const teachers: ParsedData[] = [];
  const $ = Cheerio.load(html);

  $(university.table_loop).each((_i, tbody) => {
    // check eq?
    const courseCode = $(tbody).find(university.course_ref).eq(0).text().trim();
    let hrefCourseDetail = $(tbody)
      .find(university.course_href_detail)
      .eq(0)
      .attr("href");

    // Check is href references same page
    if (hrefCourseDetail?.startsWith("#")) {
      // let it undefined
      hrefCourseDetail = "";
    }
    const courseName =
      $(tbody).find(university.course_name_ref).eq(2).text().trim() ?? "";

    if (courseCode && hrefCourseDetail && courseName) {
      teachers.push({ courseCode, hrefCourseDetail, courseName });
    }
  });

  return teachers;
};
