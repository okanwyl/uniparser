import Cheerio from "cheerio";

export const extractCourseDetailPage = (
  html: string,
  idx: number
): string | undefined => {
  const $ = Cheerio.load(html);
  const handled = $("body").find("p").eq(idx).text().trim();
  return handled ? handled : undefined;
};
