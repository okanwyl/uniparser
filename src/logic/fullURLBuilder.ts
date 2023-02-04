import { ParsedData, University } from "../types";

export function fullURLBuilder(university: University, href: ParsedData): string | undefined {
  if (!university.university_href_includes_domain) {
    const objectURL = new URL(university.url_endpoint);
    return objectURL.protocol + "//" + objectURL.hostname + university.url_prefix_href + "/" + href.hrefCourseDetail;
  } else {
    return href.hrefCourseDetail;
  }
}
