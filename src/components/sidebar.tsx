const NOTES = [
  "personal",
  "personal.ideas",
  "personal.trips",
  "personal.plans",
  "work",
  "work.mei",
  "work.projects",
];

export function Sidebar() {
  return (
    <aside className="h-full border-r border-r-slate-700/50 bg-[#1F2428] p-4">
      <div className="flex flex-col gap-4 pt-4">
        <p className="text-2xl font-bold text-white">
          <span className="mr-3">📁</span>Files
        </p>
        <div id="file-list">
          {NOTES.map((note) => (
            <p
              className={`cursor-pointer text-slate-400 hover:bg-[#282E34] ${note.includes(".") ? "pl-4" : "pl-2"}`}
            >
              {note}
            </p>
          ))}
        </div>
      </div>
    </aside>
  );
}
