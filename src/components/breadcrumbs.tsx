import Link from "next/link";
import React from "react";
import { BiChevronRight } from "react-icons/bi";

export function BreadCrumbs({ paths }: { paths: string[] }) {
  if (!paths.length) {
    return (
      <div className="inline-flex w-full items-center gap-2 border-b border-b-neutral-700 pb-4 font-mono text-neutral-500">
        <p className="cursor-pointer hover:text-neutral-300">new file</p>
      </div>
    );
  }

  return (
    <div className="inline-flex w-full items-center gap-2 border-b border-b-neutral-700 pb-4 font-mono text-neutral-500">
      {paths.map((path, index, paths) =>
        index === 0 ? (
          <Link
            key={path}
            href={`/${path}`}
            className="cursor-pointer hover:text-neutral-300"
          >
            {path}
          </Link>
        ) : (
          <React.Fragment key={path}>
            <BiChevronRight size={18} className="text-neutral-500" />
            <Link
              href={`/${paths.join("/")}`}
              className="cursor-pointer hover:text-neutral-300"
            >
              {path}
            </Link>
          </React.Fragment>
        ),
      )}
    </div>
  );
}
