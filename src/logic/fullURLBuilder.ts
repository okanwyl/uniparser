import { ParsedData } from "../types";

export function fullURLBuilder(
  hostname: string,
  href: ParsedData,
  prefix: string
): string {
  const objectURL = new URL(hostname);
  return (
    objectURL.protocol +
    "//" +
    objectURL.hostname +
    prefix +
    "/" +
    href.hrefCourseDetail
  );
}
