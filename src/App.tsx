import { Sidebar } from "./components/sidebar";
import { TextEditor } from "./components/text-editor";

function App() {
  return (
    <div className="mx-auto grid h-screen w-screen grid-cols-[18rem_1fr] bg-neutral-950">
      <Sidebar />
      <TextEditor />
    </div>
  );
}

export default App;
