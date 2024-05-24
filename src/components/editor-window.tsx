import { Sidebar } from "./sidebar";
import { Editor } from "./text-editor";

export function EditorWindow() {
  return (
    <div className="mx-auto grid h-screen w-screen grid-cols-[16rem_1fr] rounded-xl border-white/30 shadow-sm">
      <Sidebar />
      <Editor />
    </div>
  );
}
