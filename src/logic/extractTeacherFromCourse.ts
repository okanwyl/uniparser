import Cheerio from "cheerio";

export const extractCourseDetailPage = (
  html: string,
  idx: number,
  tag_name: string
): string | undefined => {
  const $ = Cheerio.load(html);
  const handled = $("body").find(tag_name).eq(idx).text().trim();
  return handled ? handled : undefined;
};
