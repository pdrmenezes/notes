import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  useEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { INITIAL_CONTENT } from "../constants/initial-editor-content";

export function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: INITIAL_CONTENT,
  });

  return (
    <main className="h-full bg-[#24292E] p-4 overflow-auto">
    <EditorContent
      editor={editor}
      className="prose prose-invert mx-auto max-w-screen-lg pt-4"
    />
    </main>
  );
}
