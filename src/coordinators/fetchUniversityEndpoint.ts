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
      const courseDetailURL=course.hrefCourseDetail;

    if(!university.university_href_includes_domain){
        const courseDetailURL = fullURLBuilder(
        university.url_endpoint,
        course,
        university.url_prefix_href
      );
    }
    
    const courseDetailHtml = await ioFetch(courseDetailURL);
    course.instructorName = extractCourseDetailPage(
      courseDetailHtml,
      Number(university.course_detail_index)
    );
    delete course.hrefCourseDetail;
  }
  return courses;
};
