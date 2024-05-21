// import { useRef } from "react";
import { EditorPane } from "./components/editor-pane";

const NOTES = [
  "personal",
  "personal.ideas",
  "personal.trips",
  "personal.plans",
  "work",
  "work.mei",
  "work.projects",
];

function App() {
  // const editorRef = useRef<MDXEditorMethods>(null);

  // function handleSaveFile() {
  //   console.log(editorRef?.current?.getMarkdown());

  //   const markdownContents = editorRef?.current?.getMarkdown();

  //   if (!markdownContents) return;

  //   const fileTitle = `${markdownContents.split("\n")[0]}.md`;
  // }

  return (
    <div className="min-h-screen content-center bg-gray-950 p-8">
      <EditorPane />
      {/* <div className="shadow-sm w-[80vw] h-[80vh] rounded-xl border-black flex mx-auto max-h-screen max-w-screen bg-[#24292E] text-white">
        <div className="w-1/5 shrink-0 border-r-1 border-r-slate-600 p-4 bg-[#1F2428]">
          <p className="font-bold text-lg">
            <span className="mr-3">📁</span>Files
          </p>
          <div id="file-list">
            {NOTES.map((note) => (
              <p className={`cursor-pointer text-slate-500 ${note.includes(".") ? "pl-2" : "p-0"}`}>{note}</p>
            ))}
          </div>
        </div>
        <div className="w-4/5 flex relative">
          <button
            onClick={() => handleSaveFile()}
            className="outline rounded-md z-10 outline-white px-4 py-2 transition-colors absolute bottom-8 right-8 text-white hover:bg-white hover:text-black cursor-pointer "
          >
            Save
          </button>
          <MDXEditor
            ref={editorRef}
            contentEditableClassName="prose"
            className="w-full h-full placeholder:opacity-80"
            markdown="# Start typing..."
            placeholder={"# Start typing..."}
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              linkPlugin(),
              linkDialogPlugin(),
              markdownShortcutPlugin(),
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                  </>
                ),
              }),
            ]}
          />
        </div>
      </div> */}
    </div>
  );
}

export default App;
