import Cheerio from "cheerio";

export const extractCourseDetailPage = (html: string): string | undefined => {
  const $ = Cheerio.load(html);
  const handled = $("body").find("p").eq(3).text().trim();
  return handled ? handled : undefined;
};
