import { extractCourses } from "../logic/extractCourses";
import { extractCourseDetailPage } from "../logic/extractTeacherFromCourse";
import { fullURLBuilder } from "../logic/fullURLBuilder";
import { ioFetch } from "../services/ioFetch";
import { ParsedData, University } from "../types";

export const fetchUniversityEndpoint = async (
    university: University
): Promise<ParsedData[]> => {
    const courseHtml = await ioFetch(university.url_endpoint);
    let courses = extractCourses(courseHtml, university);

    // build all urls
    courses = courses.map((course) => {
        course.hrefCourseDetail = fullURLBuilder(university, course);
        return course;
    });

    courses = await Promise.all(
        courses.map(async (item) => {
            const a: string = await ioFetch(item.hrefCourseDetail);
            item.instructorName = extractCourseDetailPage(
                a,
                university
            );
            delete item.hrefCourseDetail;
            return item;
        })
    );

    return courses;
};
