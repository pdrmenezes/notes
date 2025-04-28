"use client";
import { FileNode, FileTree } from "@/components/file-node";
import {
  initializeStorage,
  saveFileTreeToLocalStorage,
} from "@/lib/file-management";
import { createContext, useEffect, useState } from "react";

type FileTreeContextType = {
  fileTree: FileNode[];
  updateFileTree: (newTree: FileNode[]) => void;
};

export const FileTreeContext = createContext<FileTreeContextType>({
  fileTree: initializeStorage(),
  updateFileTree: () => {},
});

export function FileTreeProvider({ children }: { children: React.ReactNode }) {
  const [fileTree, setFileTree] = useState<FileNode[]>([]);

  const updateFileTree = (newTree: FileNode[]) => {
    setFileTree(newTree);
    saveFileTreeToLocalStorage(newTree);
  };

  useEffect(() => {
    setFileTree(initializeStorage());
  }, []);

  const fileTreeContext = { fileTree, updateFileTree };

  return (
    <FileTreeContext.Provider value={fileTreeContext}>
      {children}
    </FileTreeContext.Provider>
  );
}
