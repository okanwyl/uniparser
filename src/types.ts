export interface ParsedData {
  instructorName?: string;
  courseCode: string;
  hrefCourseDetail?: string;
  courseName: string;
}

// Should i parse with University Type?
export type University = {
  name: string;
  url_endpoint: string;
  table_loop: string;
  course_ref: string;
  course_href_detail: string;
  course_name_ref: string;
};
