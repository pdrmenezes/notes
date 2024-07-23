"use client";

import { BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import "highlight.js/styles/github-dark.css";
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
} from "react-icons/rx";
import { BubbleButton } from "./bubble-button";

const lowlight = createLowlight(common);

export function TextEditor({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: content,
    onUpdate(editor) {
      // Save content to new file/db
      // const editorContent = editor.editor.getJSON();
      // console.log(editorContent);
    },
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  return (
    <main className="h-full overflow-auto">
      <EditorContent
        editor={editor}
        className="prose prose-invert mx-auto max-w-screen-lg pt-4"
      />
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
    </main>
  );
}
