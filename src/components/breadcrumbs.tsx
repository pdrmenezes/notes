"use client";

import { FileTreeContext } from "@/contexts/FileTreeContext";
import { findNodeByUrlPath, getUrlPathFromNode } from "@/lib/file-management";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment, useContext, useMemo } from "react";

export function BreadCrumbs({ paths }: { paths: string[] }) {
  const { fileTree } = useContext(FileTreeContext);

  const resolvedNodes = useMemo(() => {
    if (!paths.length) return [];

    return paths.map((_, index) => {
      const urlPath = paths.slice(0, index + 1).join("/");

      return findNodeByUrlPath(fileTree, urlPath);
    });
  }, [paths, fileTree]);

  if (!paths.length) {
    return (
      <div className="flex w-full items-center gap-2 border-b border-b-neutral-700 pb-4 font-mono text-neutral-500">
        <p className="cursor-pointer hover:text-neutral-300">new file</p>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center gap-2 border-b border-b-neutral-700 pb-4 font-mono text-neutral-500">
      {resolvedNodes.map((node, index) => {
        const nodeUrlPath = node
          ? getUrlPathFromNode(node)
          : paths.slice(0, index + 1).join("/");

        return index === 0 ? (
          <Link
            key={paths[index]}
            href={`/${nodeUrlPath}`}
            className="cursor-pointer hover:text-neutral-300"
          >
            {node ? node.name : paths[index].split("-").join(" ")}
          </Link>
        ) : (
          <Fragment key={paths[index]}>
            <ChevronRight className="size-4 shrink-0 text-neutral-500" />
            <Link
              href={`/${nodeUrlPath}`}
              className={`cursor-pointer hover:text-neutral-300 ${
                index + 1 === paths.length ? "truncate" : ""
              }`}
            >
              {node ? node.name : paths[index].split("-").join(" ")}
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
}
