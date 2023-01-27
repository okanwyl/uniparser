import { extractCourses } from "../logic/extractCourses";
import { extractCourseDetailPage } from "../logic/extractTeacherFromCourse";
import { fullURLBuilder } from "../logic/fullURLBuilder";
import { ioFetch } from "../services/ioFetch";
import { ParsedData, University } from "../types";

export const fetchUniversityEndpoint = async (
  universityUrl: string,
  table_loop: string,
  course_ref: string,
  course_href_detail: string,
  course_name_ref: string
): Promise<ParsedData[]> => {
  const courseHtml = await ioFetch(universityUrl);
  const courses = extractCourses(
    courseHtml,
    table_loop,
    course_ref,
    course_href_detail,
    course_name_ref
  );
  for (let course of courses) {
    let courseDetailURL = fullURLBuilder(universityUrl, course);
    const courseDetailHtml = await ioFetch(courseDetailURL);
    course.instructorName = extractCourseDetailPage(courseDetailHtml);
    delete course.hrefCourseDetail;
  }
  return courses;
};
