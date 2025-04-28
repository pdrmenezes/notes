"use client";
import { Dialog, DialogState } from "@/components/dialog";
import { FileTreeContext } from "@/contexts/FileTreeContext";
import { createFile, createFolder, loadTemplate } from "@/lib/file-management";
import { useContext, useState } from "react";

export default function WelcomePage() {
  const { fileTree, updateFileTree } = useContext(FileTreeContext);
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: null,
    inputValue: "",
  });

  const dialogConfirmAction = () => {
    if (dialogState.type === "newFile" && dialogState.inputValue) {
      const newTree = createFile(fileTree, undefined, dialogState.inputValue);
      updateFileTree(newTree);
    } else if (dialogState.type === "newFolder" && dialogState.inputValue) {
      const newTree = createFolder(fileTree, undefined, dialogState.inputValue);
      updateFileTree(newTree);
    } else if (dialogState.type === "loadTemplate") {
      const newTree = loadTemplate();
      updateFileTree(newTree);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome!</h1>

        <div className="grid gap-4 mb-8">
          <button
            onClick={() =>
              setDialogState({ isOpen: true, type: "newFile", inputValue: "" })
            }
            className="border border-neutral-500 hover:bg-neutral-800 rounded-lg p-6 hover:border-neutral-400 transition-colors cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">Create a new file</h2>
            <p className="text-muted-foreground">
              Start writing your ideas or documentation
            </p>
          </button>

          <button
            onClick={() =>
              setDialogState({
                isOpen: true,
                type: "newFolder",
                inputValue: "",
              })
            }
            className="border border-neutral-500 hover:bg-neutral-800 rounded-lg p-6 hover:border-neutral-400 transition-colors cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">Create a new folder</h2>
            <p className="text-muted-foreground">
              Organize your notes in a structured way
            </p>
          </button>

          <button
            onClick={() =>
              setDialogState({
                isOpen: true,
                type: "loadTemplate",
                inputValue: "",
              })
            }
            className="border border-neutral-500 hover:bg-neutral-800 rounded-lg p-6 hover:border-neutral-400 transition-colors cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">Load a template</h2>
            <p className="text-muted-foreground">
              Load a template to get started
            </p>
          </button>
        </div>
      </div>
      <Dialog
        dialogState={dialogState}
        setDialogState={setDialogState}
        onDialogConfirm={dialogConfirmAction}
      />
    </div>
  );
}
