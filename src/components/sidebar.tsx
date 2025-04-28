"use client";

import { FileTreeContext } from "@/contexts/FileTreeContext";
import { createFile, createFolder } from "@/lib/file-management";
import { CopyMinus, FilePlus2, FolderPlus, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import { Dialog, DialogState } from "./dialog";
import { FileNode } from "./file-node";
import { SearchInput } from "./search-input";

const getInitialRootFoldersOpen = (fileTree: FileNode[]) => {
  return fileTree.reduce((acc: Record<number, boolean>, node) => {
    if (node.isDirectory) {
      acc[node.id] = false;
    }
    return acc;
  }, {});
};

export function Sidebar() {
  const { fileTree, updateFileTree } = useContext(FileTreeContext);
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: null,
    inputValue: "",
  });
  const [rootFoldersOpen, setRootFoldersOpen] = useState<
    Record<number, boolean>
  >(getInitialRootFoldersOpen(fileTree));
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleNewFile = () => {
    setDialogState({ isOpen: true, type: "newFile", inputValue: "" });
  };

  const handleNewFolder = () => {
    setDialogState({ isOpen: true, type: "newFolder", inputValue: "" });
  };

  const dialogConfirmAction = () => {
    if (dialogState.type === "newFile" && dialogState.inputValue) {
      const newTree = createFile(fileTree, undefined, dialogState.inputValue);
      updateFileTree(newTree);
    } else if (dialogState.type === "newFolder" && dialogState.inputValue) {
      const newTree = createFolder(fileTree, undefined, dialogState.inputValue);
      updateFileTree(newTree);
    }
  };

  const handleCollapseFolders = () => {
    if (isAnyFolderOpen) {
      setRootFoldersOpen((prev) => {
        const newRootFoldersOpen = { ...prev };
        Object.keys(prev).forEach((key) => {
          newRootFoldersOpen[Number(key)] = false;
        });
        return newRootFoldersOpen;
      });
    }
  };

  const isAnyFolderOpen = Object.values(rootFoldersOpen).some((open) => open);

  const filteredFileTree = useMemo(() => {
    if (!searchQuery.trim()) {
      return fileTree;
    }

    const query = searchQuery.toLowerCase().trim();

    const nodeMatchesSearch = (node: FileNode): boolean => {
      if (node.name.toLowerCase().includes(query)) {
        return true;
      }

      if (node.isDirectory && node.nodes) {
        return node.nodes.some(nodeMatchesSearch);
      }

      return false;
    };

    return fileTree.filter(nodeMatchesSearch);
  }, [fileTree, searchQuery]);

  return (
    <aside className="h-full border-r border-r-neutral-700 pb-4 pl-8 pr-4 pt-8 font-mono">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-between">
            <div>
              <button
                title="Home"
                className="rounded-md border border-neutral-500 bg-transparent p-2 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 hover:border-neutral-400 transition-colors duration-150"
                onClick={() => router.push("/welcome")}
              >
                <Home className="size-3.5" />
              </button>
            </div>
            <div className="flex gap-2 self-end">
              <button
                title="New file"
                className="rounded-md border border-neutral-500 bg-transparent p-2 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 hover:border-neutral-400 transition-colors duration-150"
                onClick={handleNewFile}
              >
                <FilePlus2 className="size-3.5" />
              </button>
              <button
                title="New folder"
                className="rounded-md border border-neutral-500 bg-transparent p-2 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 hover:border-neutral-400 transition-colors duration-150"
                onClick={handleNewFolder}
              >
                <FolderPlus className="size-3.5" />
              </button>
              <button
                title="Collapse folders"
                className="rounded-md border border-neutral-500 bg-transparent p-2 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 hover:border-neutral-400 transition-colors duration-150"
                onClick={handleCollapseFolders}
              >
                <CopyMinus className="size-3.5" />
              </button>
            </div>
          </div>

          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="flex flex-col gap-4">
          <ul id="file-list" className="flex flex-col gap-1.5">
            {!filteredFileTree.length && (
              <p className="italic text-neutral-500">
                {searchQuery
                  ? "No matching files or folders found."
                  : "No files yet."}
              </p>
            )}
            {filteredFileTree.map((node) => (
              <FileNode
                fileNode={node}
                key={node.id}
                rootFoldersOpen={rootFoldersOpen}
                setRootFoldersOpen={setRootFoldersOpen}
              />
            ))}
          </ul>
        </div>
      </div>

      <Dialog
        dialogState={dialogState}
        setDialogState={setDialogState}
        onDialogConfirm={dialogConfirmAction}
      />
    </aside>
  );
}
