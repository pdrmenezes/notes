"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { FileTreeContext } from "@/contexts/FileTreeContext";
import {
  copyFile,
  createFile,
  createFolder,
  deleteNode,
  getPathFromNode,
  getUrlPathFromNode,
  renameNode,
} from "@/lib/file-management";
import { ChevronRight, File } from "lucide-react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Dialog, DialogState } from "./dialog";

export type FileTree = {
  tree: FileNode[];
};

export type FileNode = {
  id: number;
  name: string;
  nodes?: FileNode[];
  parentDirectory?: string;
  isDirectory: boolean;
  data?: {
    content?: any;
    type?: string;
  };
};

type FileNodeProps = {
  fileNode: FileNode;
};

export function FileNode({ fileNode }: FileNodeProps) {
  const router = useRouter();
  const { fileTree, updateFileTree } = useContext(FileTreeContext);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: null,
    inputValue: "",
  });

  const pathname = usePathname();

  const handleCreateFile = () => {
    setDialogState({ isOpen: true, type: "newFile", inputValue: "" });
  };

  const handleCreateFolder = () => {
    setDialogState({ isOpen: true, type: "newFolder", inputValue: "" });
  };

  const handleDelete = () => {
    setDialogState({ isOpen: true, type: "delete", inputValue: "" });
  };

  const handleRename = () => {
    setDialogState({
      isOpen: true,
      type: "rename",
      inputValue: fileNode.name,
    });
  };

  const dialogConfirmAction = () => {
    const path = fileNode.isDirectory
      ? getPathFromNode(fileNode)
      : fileNode.parentDirectory;

    if (dialogState.type === "newFile" && dialogState.inputValue) {
      const newTree = createFile(fileTree, path, dialogState.inputValue);
      updateFileTree(newTree);
    } else if (dialogState.type === "newFolder" && dialogState.inputValue) {
      const newTree = createFolder(fileTree, path, dialogState.inputValue);
      updateFileTree(newTree);
    } else if (dialogState.type === "delete") {
      const nodePath = getPathFromNode(fileNode);
      const newTree = deleteNode(fileTree, nodePath);
      updateFileTree(newTree);
      if (pathname !== "/welcome" && newTree.length === 0) {
        redirect("/welcome");
      }
    } else if (dialogState.type === "rename" && dialogState.inputValue) {
      const nodePath = getPathFromNode(fileNode);

      const newTree = renameNode(
        fileTree,
        nodePath,
        fileNode.name,
        dialogState.inputValue
      );

      updateFileTree(newTree);

      const currentUrl = window.location.pathname.substring(1);

      if (fileNode.isDirectory) {
        if (currentUrl === nodePath || currentUrl.startsWith(`${nodePath}/`)) {
          const newUrl = currentUrl.replace(nodePath, dialogState.inputValue);
          router.push(`/${newUrl}`);
        }
      } else {
        if (currentUrl === nodePath) {
          router.push(`/${dialogState.inputValue}`);
        }
      }
    }
  };

  const handleCopyFile = () => {
    if (fileNode.isDirectory) return;

    const path = getPathFromNode(fileNode);
    const newTree = copyFile(fileTree, path);
    updateFileTree(newTree);
  };

  return (
    <li>
      <ContextMenu>
        <ContextMenuTrigger>
          <span
            title={fileNode.name}
            className="flex items-center gap-1.5 rounded-md py-1 px-1 hover:bg-neutral-800 cursor-pointer transition-colors duration-150 hover:pl-1.5"
            onClick={() => {
              if (!fileNode.isDirectory) {
                router.push(`/${getUrlPathFromNode(fileNode)}`);
              }
              setIsDirectoryOpen((prev) => !prev);
            }}
          >
            {fileNode.isDirectory && fileNode.nodes ? (
              <ChevronRight
                className={`size-4.5 text-neutral-500 shrink-0 ${
                  isDirectoryOpen ? "rotate-90" : ""
                } transition-transform duration-150`}
              />
            ) : (
              <File className="size-4.5 text-neutral-500 shrink-0" />
            )}
            <p className="truncate">{fileNode.name}</p>
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          {fileNode.isDirectory ? (
            <>
              <ContextMenuItem onClick={handleCreateFile}>
                New File
              </ContextMenuItem>
              <ContextMenuItem onClick={handleCreateFolder}>
                New Folder
              </ContextMenuItem>
              <ContextMenuItem onClick={handleRename}>Rename</ContextMenuItem>
              <ContextMenuItem
                className="text-red-400 focus:text-red-400"
                onClick={handleDelete}
              >
                Delete
              </ContextMenuItem>
            </>
          ) : (
            <>
              <ContextMenuItem onClick={handleRename}>Rename</ContextMenuItem>
              <ContextMenuItem onClick={handleCopyFile}>
                Duplicate
              </ContextMenuItem>
              <ContextMenuItem
                className="text-red-400 focus:text-red-400"
                onClick={handleDelete}
              >
                Delete
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>

      <Dialog
        dialogState={dialogState}
        setDialogState={setDialogState}
        onDialogConfirm={dialogConfirmAction}
      />

      {isDirectoryOpen && fileNode.isDirectory && (
        <ul className="pl-4 mt-1 space-y-0.5">
          {fileNode.nodes &&
            fileNode.nodes?.length > 0 &&
            fileNode?.nodes?.map((node) => (
              <FileNode fileNode={node} key={node.id} />
            ))}
        </ul>
      )}
    </li>
  );
}
