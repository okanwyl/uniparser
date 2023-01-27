import { ParsedData } from "../types";

export function fullURLBuilder(hostname: string, href: ParsedData): string {
  const objectURL = new URL(hostname);
  return objectURL.protocol + "//" + objectURL.hostname + href.hrefCourseDetail;
}
