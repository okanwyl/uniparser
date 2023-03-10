import { extractCourses } from "../logic/extractCourses";
import { extractCourseDetailPage } from "../logic/extractTeacherFromCourse";
import { fullURLBuilder } from "../logic/fullURLBuilder";
import { ioFetch } from "../services/ioFetch";
import { ParsedData, University } from "../types";

export const fetchUniversityEndpoint = async (
  university: University
): Promise<ParsedData[]> => {
  const courseHtml = await ioFetch(university.url_endpoint);
  const courses = extractCourses(courseHtml, university);
  for (const course of courses) {
    const courseDetailURL = fullURLBuilder(university, course);
    const courseDetailHtml = await ioFetch(courseDetailURL);

    course.instructorName = extractCourseDetailPage(
      courseDetailHtml,
      Number(university.course_detail_index),
      university
    );

    delete course.hrefCourseDetail;
  }
  return courses;
};
