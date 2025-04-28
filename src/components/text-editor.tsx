"use client";

import { FileTreeContext } from "@/contexts/FileTreeContext";
import { defaultEditorContent } from "@/lib/content";
import {
  findNodeByUrlPath,
  getNoteContent,
  getPathFromNode,
  saveNoteContent,
} from "@/lib/file-management";
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
import { Bold, Code, Italic, Strikethrough } from "lucide-react";
import { useContext, useEffect, useState } from "react";
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
  const { fileTree } = useContext(FileTreeContext);
  const [actualPath, setActualPath] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const node = findNodeByUrlPath(fileTree, path);

    if (node) {
      setActualPath(getPathFromNode(node));
    } else {
      setActualPath(path);
    }
  }, [path]);

  const initialContent = () => {
    if (typeof window === "undefined") return defaultEditorContent;

    if (!actualPath) return defaultEditorContent;

    const noteContent = getNoteContent(actualPath || path);
    return noteContent || defaultEditorContent;
  };

  const [content, setContent] = useState<JSONContent>(defaultEditorContent);
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved">("saved");
  const [charsCount, setCharsCount] = useState(0);

  useEffect(() => {
    if (actualPath) {
      setContent(initialContent());
    }
  }, [actualPath, path]);

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();

      const pathToUse = actualPath || path;
      saveNoteContent(pathToUse, json);
      setSaveStatus("saved");
    },
    500
  );

  const editor = useEditor({
    extensions: extensions,
    immediatelyRender: false,
    content,
    onUpdate({ editor }) {
      setSaveStatus("unsaved");
      setCharsCount(editor.getText().length);
      debouncedUpdates(editor);
    },
    editorProps: {
      attributes: {
        class: "focus:outline-hidden py-2",
      },
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <section className="overflow-auto">
      <EditorContent
        editor={editor}
        className="prose prose-invert mx-auto max-w-(--breakpoint-lg)"
      />
      <div className="absolute right-8 top-8 z-10 italic text-neutral-500 text-sm">
        {saveStatus}
      </div>
      <div
        className={
          charsCount
            ? "absolute bottom-5 text-neutral-500 right-16 text-sm"
            : "hidden"
        }
      >
        {charsCount}
      </div>
      {editor && (
        <BubbleMenu
          className="flex divide-x divide-white/30 overflow-hidden rounded-md border border-white/30 bg-neutral-900 shadow-lg shadow-black/20 [&_button]:p-2"
          editor={editor}
        >
          <BubbleButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-active={editor.isActive("bold")}
          >
            <Bold className="size-4" />
          </BubbleButton>
          <BubbleButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-active={editor.isActive("italic")}
          >
            <Italic className="size-4" />
          </BubbleButton>
          <BubbleButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            data-active={editor.isActive("strike")}
          >
            <Strikethrough className="size-4" />
          </BubbleButton>
          <BubbleButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            data-active={editor.isActive("codeBlock")}
          >
            <Code className="size-4" />
          </BubbleButton>
        </BubbleMenu>
      )}
    </section>
  );
}
