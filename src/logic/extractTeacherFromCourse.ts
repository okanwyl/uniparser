import Cheerio from "cheerio";
import { University } from "../types";
export const extractCourseDetailPage = (
  html: string,
  idx: number,
  university: University
): string | undefined => {
  const $ = Cheerio.load(html);
  let handled;
  if (university.course_detail_html_class_name) {
    // handled = $("body").find("p").eq(idx).text().trim();
    handled = $(university.course_detail_html_class_name)
      .find("a")
      .text()
      .trim();
  } else {
    handled = $("body")
      .find(university.course_detail_html_tag_name)
      .eq(idx)
      .text()
      .trim();
  }

  return handled ? handled : undefined;
};
