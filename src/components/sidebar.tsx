"use client";
import { MOCK_FILE_TREE } from "@/constants/mocked-data";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";
import { TbCopyMinus } from "react-icons/tb";
import { FileNode } from "./file-node";

export function Sidebar() {
  return (
    <aside className="h-full border-r border-r-neutral-700 pb-4 pl-8 pr-4 pt-8 font-mono">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-full gap-4">
          <div className="flex gap-2 self-end">
            <button
              title="New file"
              className="rounded-md border border-neutral-500 bg-transparent p-2 text-neutral-500 hover:bg-neutral-800"
              // TODO: create new file function
              onClick={() => {}}
            >
              <VscNewFile size={12} />
            </button>
            <button
              title="New folder"
              className="rounded-md border border-neutral-500 bg-transparent p-2 text-neutral-500 hover:bg-neutral-800"
              // TODO: create new folder function
              onClick={() => {}}
            >
              <VscNewFolder size={12} />
            </button>
            <button
              title="Collapse folders"
              className="rounded-md border border-neutral-500 bg-transparent p-2 text-neutral-500 hover:bg-neutral-800"
              // TODO: collapse folders
              onClick={() => {}}
            >
              <TbCopyMinus size={12} />
            </button>
          </div>
          <form id="search-form" role="search">
          {/* TODO: filter folders & files */}
            <input
              id="q"
              className="w-full rounded-sm border-b border-neutral-500 bg-transparent p-1 text-sm focus-within:border-neutral-400 focus-within:outline-none"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
          </form>
        </div>

        <div className="flex flex-col gap-4">
          <ul id="file-list" className="flex flex-col gap-1">
            {!MOCK_FILE_TREE.length && (
              <p className="italic text-neutral-500">No files yet.</p>
            )}
            {MOCK_FILE_TREE.map((node) => (
              <FileNode fileNode={node} key={node.id} />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
