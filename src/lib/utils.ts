export async function wait(ms: number) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function breadcrumbsParser(filePath: string) {
  if (!filePath) throw new Error("No filePath received / root page");

  return filePath.split("/");
}

export function getFileDepth(parentDirectory: string | undefined) {
  let depth;
  if (!parentDirectory) {
    depth = 0;
  } else {
    depth =
      1 + parentDirectory.length - parentDirectory.replaceAll("/", "").length;
  }
  return depth;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
