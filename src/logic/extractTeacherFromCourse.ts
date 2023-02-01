import Cheerio from "cheerio";
import { University } from "../types";
export const extractCourseDetailPage = (
  html: string,
  idx: number,
  university: University
): string | undefined => {
  const $ = Cheerio.load(html);
  const handled = $(university.teacher_path).text().trim();

  return handled ? handled : undefined;
};
