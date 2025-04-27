"use client";

import { defaultEditorContent } from "@/lib/content";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import {
  BubbleMenu,
  EditorContent,
  Editor as EditorInstance,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "highlight.js/styles/github-dark.css";
import { common, createLowlight } from "lowlight";
import { useState } from "react";
import {
  RxCode,
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
} from "react-icons/rx";
import { useDebouncedCallback } from "use-debounce";
import { BubbleButton } from "./bubble-button";

const lowlight = createLowlight(common);
const extensions = [
  StarterKit.configure({
    codeBlock: false,
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
];

export function TextEditor({ path }: { path: string }) {
  const initialContent = () => {
    let data;
    if (typeof window !== "undefined") {
      let localStorageContent = localStorage.getItem(
        `notes_${path}-editor-content`
      );
      data = localStorageContent ? JSON.parse(localStorageContent) : undefined;
    }
    if (!data) return defaultEditorContent;
    return data;
  };

  const [content] = useState<JSONContent>(initialContent);
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved">("saved");
  const [charsCount, setCharsCount] = useState(0);

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      localStorage.setItem(
        `notes_${path}-editor-content`,
        JSON.stringify(json)
      );
      setSaveStatus("saved");
    },
    500
  );

  const editor = useEditor({
    extensions: extensions,
    immediatelyRender: false,
    content,
    onUpdate({ editor }) {
      // Save content to new file/db
      setSaveStatus("unsaved");
      setCharsCount(editor.getText().length);
      debouncedUpdates(editor);
    },
    editorProps: {
      attributes: {
        class: "focus:outline-hidden h-screen",
      },
    },
  });

  return (
    <section className="h-full overflow-auto">
      <EditorContent
        editor={editor}
        className="prose prose-invert mx-auto max-w-(--breakpoint-lg) pt-4"
      />
      <div className="absolute right-5 top-5 z-10 rounded-lg border border-neutral-700 text-neutral-500 px-2 py-1 text-sm ">
        {saveStatus}
      </div>
      <div
        className={
          charsCount
            ? "absolute bottom-5 text-neutral-500 right-5 text-sm"
            : "hidden"
        }
      >
        {charsCount}
      </div>
      {editor && (
        <BubbleMenu
          className="flex divide-x divide-white/30 overflow-hidden rounded-md border border-white/30 bg-[#1F2428] shadow-lg shadow-black/20"
          editor={editor}
        >
          <BubbleButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-active={editor.isActive("bold")}
          >
            <RxFontBold className="h-4 w-4" />
          </BubbleButton>
          <BubbleButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-active={editor.isActive("italic")}
          >
            <RxFontItalic className="h-4 w-4" />
          </BubbleButton>
          <BubbleButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            data-active={editor.isActive("strike")}
          >
            <RxStrikethrough className="h-4 w-4" />
          </BubbleButton>
          <BubbleButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            data-active={editor.isActive("codeBlock")}
          >
            <RxCode className="h-4 w-4" />
          </BubbleButton>
        </BubbleMenu>
      )}
    </section>
  );
}
