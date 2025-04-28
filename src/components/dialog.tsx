import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DialogProps = {
  dialogState: DialogState;
  setDialogState: (state: DialogState) => void;
  onDialogConfirm: () => void;
};

export type DialogState = {
  isOpen: boolean;
  type: "newFile" | "newFolder" | "loadTemplate" | "delete" | "rename" | null;
  inputValue: string;
};

const DialogTitles = {
  newFile: "Create New File",
  newFolder: "Create New Folder",
  loadTemplate: "Load Template",
  delete: "Delete",
  rename: "Rename",
};

const DialogDescriptions = {
  newFile: "Enter the name for the new file:",
  newFolder: "Enter the name for the new folder:",
  loadTemplate:
    "Are you sure you want to load a template? This will overwrite all your current notes.",
  delete:
    "Are you sure you want to delete this file? This action cannot be undone.",
  rename: "Enter the new name for the file:",
};

const DialogConfirmText = {
  newFile: "Create",
  newFolder: "Create",
  loadTemplate: "Yes, load template",
  delete: "Delete",
  rename: "Rename",
};

const DialogCancelText = {
  newFile: "Cancel",
  newFolder: "Cancel",
  loadTemplate: "No",
  delete: "Cancel",
  rename: "Cancel",
};

export function Dialog({
  dialogState,
  setDialogState,
  onDialogConfirm,
}: DialogProps) {
  const getDialogTitle = () => {
    return DialogTitles[dialogState.type as keyof typeof DialogTitles] || "";
  };

  const getDialogDescription = () => {
    return (
      DialogDescriptions[dialogState.type as keyof typeof DialogDescriptions] ||
      ""
    );
  };

  const getDialogConfirmText = () => {
    return (
      DialogConfirmText[dialogState.type as keyof typeof DialogConfirmText] ||
      ""
    );
  };

  const getDialogCancelText = () => {
    return (
      DialogCancelText[dialogState.type as keyof typeof DialogCancelText] || ""
    );
  };

  const resetDialog = () => {
    setDialogState({ isOpen: false, type: null, inputValue: "" });
  };

  const handleDialogConfirm = () => {
    onDialogConfirm();
    resetDialog();
  };

  const isInputVisible =
    dialogState.type !== "delete" && dialogState.type !== "loadTemplate";

  const isButtonDisabled =
    dialogState.type !== "delete" &&
    dialogState.type !== "loadTemplate" &&
    !dialogState.inputValue.trim();

  return (
    <AlertDialog
      open={dialogState.isOpen}
      onOpenChange={(open) => !open && resetDialog()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{getDialogTitle()}</AlertDialogTitle>
          <AlertDialogDescription>
            {getDialogDescription()}
          </AlertDialogDescription>
          {isInputVisible && (
            <input
              type="text"
              className="w-full mt-2 bg-neutral-800 border border-neutral-700 rounded-md p-2 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-600"
              autoFocus
              value={dialogState.inputValue}
              onChange={(e) =>
                setDialogState({ ...dialogState, inputValue: e.target.value })
              }
            />
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {dialogState.type === "loadTemplate" ? (
            <>
              <AlertDialogCancel>{getDialogCancelText()}</AlertDialogCancel>
              <AlertDialogAction onClick={handleDialogConfirm}>
                {getDialogConfirmText()}
              </AlertDialogAction>
            </>
          ) : (
            <>
              <AlertDialogCancel>{getDialogCancelText()}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDialogConfirm}
                disabled={isButtonDisabled}
                className={
                  dialogState.type === "delete"
                    ? "bg-red-900 hover:bg-red-800"
                    : ""
                }
              >
                {getDialogConfirmText()}
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
