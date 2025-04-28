"use client";

import { FileTreeContext } from "@/contexts/FileTreeContext";
import { findNodeByUrlPath } from "@/lib/file-management";
import { useContext } from "react";
import { DirectoryView } from "./directory-view";
import { TextEditor } from "./text-editor";

export function ContentPanel({ path }: { path: string }) {
  const { fileTree } = useContext(FileTreeContext);
  const node = findNodeByUrlPath(fileTree, path);

  return (
    <>
      {node?.isDirectory ? (
        <DirectoryView path={path} />
      ) : (
        <TextEditor path={path} />
      )}
    </>
  );
}
