import { Editor } from "./text-editor";

const NOTES = [
  "personal",
  "personal.ideas",
  "personal.trips",
  "personal.plans",
  "work",
  "work.mei",
  "work.projects",
];

export function EditorPane() {
  return (
    <div className="mx-auto grid h-[90vh] min-h-[300px] w-[90vw] grid-cols-[16rem_1fr] overflow-hidden rounded-xl border-white/30 bg-[#24292E] shadow-sm">
      <aside className="border-r border-r-slate-700/50 bg-[#1F2428] p-4">
        <div className="group flex gap-2">
          <div className="h-3 w-3 rounded-full bg-slate-700 group-hover:bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-slate-700 group-hover:bg-yellow-400"></div>
          <div className="h-3 w-3 rounded-full bg-slate-700 group-hover:bg-green-400"></div>
        </div>
        <div className="pt-8">
          <p className="text-lg font-bold text-white">
            <span className="mr-3">📁</span>Files
          </p>
          <div id="file-list">
            {NOTES.map((note) => (
              <p
                className={`cursor-pointer text-slate-500 ${note.includes(".") ? "pl-2" : "p-0"}`}
              >
                {note}
              </p>
            ))}
          </div>
        </div>
      </aside>
      <main className="p-4">
        <Editor />
      </main>
    </div>
  );
}
