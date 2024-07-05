import { BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { INITIAL_CONTENT } from "../constants/initial-editor-content";
import { common, createLowlight } from "lowlight";
import "highlight.js/styles/github-dark.css";
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
} from "react-icons/rx";
import { BubbleButton } from "./bubble-button";
import { BreadCrumbs } from "./breadcrumbs";

const lowlight = createLowlight(common);

export function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: INITIAL_CONTENT,
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
    <section className="flex flex-col p-8 pb-0">
      <BreadCrumbs />
      <main className="h-full overflow-auto">
        <span className="w-full border-b-4 border-b-neutral-500"></span>
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
    </section>
  );
}
