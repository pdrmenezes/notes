"use client";

import { FileTreeContext } from "@/contexts/FileTreeContext";
import { findNodeByUrlPath, getUrlPathFromNode } from "@/lib/file-management";
import { File, Folder } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export function DirectoryView({ path }: { path: string }) {
  const { fileTree } = useContext(FileTreeContext);
  const node = findNodeByUrlPath(fileTree, path);

  if (!node || !node.isDirectory || !node.nodes) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {node.nodes.map((child) => (
        <Link
          key={child.id}
          href={`/${getUrlPathFromNode(child)}`}
          className="flex items-center gap-2 rounded-md p-2 hover:bg-neutral-800 transition-colors duration-150"
        >
          {child.isDirectory ? (
            <Folder className="size-4 text-neutral-500" />
          ) : (
            <File className="size-4 text-neutral-500" />
          )}
          <span className="text-neutral-300">{child.name}</span>
        </Link>
      ))}
    </div>
  );
}
