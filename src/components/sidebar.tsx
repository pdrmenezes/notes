"use client";

import { FileTreeContext } from "@/contexts/FileTreeContext";
import { createFile, createFolder } from "@/lib/file-management";
import { CopyMinus, FilePlus2, FolderPlus, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Dialog, DialogState } from "./dialog";
import { FileNode } from "./file-node";

export function Sidebar() {
  const { fileTree, updateFileTree } = useContext(FileTreeContext);
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: null,
    inputValue: "",
  });
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
                // TODO: collapse folders
                // onClick={handleCollapseAll}
              >
                <CopyMinus className="size-3.5" />
              </button>
            </div>
          </div>
          <form id="search-form" role="search">
            {/* TODO: filter folders & files */}
            <input
              id="q"
              className="w-full rounded-xs border-b border-neutral-500 bg-transparent p-1 text-sm hover:border-neutral-400 focus-within:border-neutral-400 focus:outline-none transition-colors duration-150"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
          </form>
        </div>

        <div className="flex flex-col gap-4">
          <ul id="file-list" className="flex flex-col gap-1.5">
            {!fileTree.length && (
              <p className="italic text-neutral-500">No files yet.</p>
            )}
            {fileTree.map((node) => (
              <FileNode fileNode={node} key={node.id} />
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
