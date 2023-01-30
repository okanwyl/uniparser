export interface ParsedData {
  instructorName?: string;
  courseCode: string;
  hrefCourseDetail?: string;
  courseName: string;
}

export type University = {
  name: string;
  university_href_includes_domain: boolean;
  course_detail_html_tag_name: string;
  course_detail_html_class_name: string;
  url_endpoint: string;
  table_loop: string;
  course_ref: string;
  course_href_detail: string;
  course_name_ref: string;
  url_prefix_href: string;
  course_code_index: string;
  course_name_ref_index: string;
  course_detail_index: string;
  university_href_includes_domain: boolean;
  course_detail_html_tag_name: string;
  course_detail_html_class_name: string;
};
