"use client";
import { BiChevronDown, BiChevronRight, BiFileBlank } from "react-icons/bi";
import { MOCK_FILE_TREE } from "@/constants/mocked-data";
import Link from "next/link";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";
import { getFileDepth } from "@/lib/utils";
import { useState } from "react";
import { TbCopyMinus } from "react-icons/tb";

export function Sidebar() {
  const [openDirectories, setOpenDirectories] = useState<string[]>([]);
  const [directories, setDirectories] = useState(
    MOCK_FILE_TREE.filter((node) => node.isDirectory)
  );

  return (
    <aside className="h-full border-r border-r-neutral-700 pb-4 pl-8 pr-4 pt-8 font-mono">
      <div className="flex flex-col gap-4">
        <div className="flex w-full gap-2">
          <form id="search-form" role="search">
            <input
              id="q"
              className="w-full rounded-sm border-b border-neutral-500 bg-transparent p-1 text-sm focus-within:border-neutral-400 focus-within:outline-none"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
          </form>
          <button
            title="New file"
            className="rounded-md border border-neutral-500 bg-transparent p-2 text-neutral-500 hover:bg-neutral-800"
          >
            <VscNewFile size={12} />
          </button>
          <button
            title="New folder"
            className="rounded-md border border-neutral-500 bg-transparent p-2 text-neutral-500 hover:bg-neutral-800"
          >
            <VscNewFolder size={12} />
          </button>
          <button
            title="Collapse folders"
            className="rounded-md border border-neutral-500 bg-transparent p-2 text-neutral-500 hover:bg-neutral-800"
          >
            <TbCopyMinus size={12} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div id="file-list" className="flex flex-col gap-1">
            {!MOCK_FILE_TREE.length && (
              <p className="italic text-neutral-500">No files yet.</p>
            )}
            {MOCK_FILE_TREE.map((leaf) => {
              const fileDepth = getFileDepth(leaf.parentDirectory);
              console.log(leaf.name, fileDepth);

              const indentingStyling = `pl-${fileDepth * 4}`;
              return (
                <div
                  className={`inline-flex items-center gap-1 hover:bg-[#282E34] ${indentingStyling}`}
                  key={leaf.parentDirectory + leaf.name.split(" ").join("-")}
                  onClick={() => {
                    if (!leaf.isDirectory) return;

                    if (openDirectories.includes(leaf.id)) {
                      setOpenDirectories(
                        openDirectories.filter((dir) => dir !== leaf.id)
                      );
                    } else {
                      setOpenDirectories([...openDirectories, leaf.id]);
                    }
                  }}
                >
                  {leaf.isDirectory &&
                  openDirectories.find((el) => el === leaf.id) ? (
                    <BiChevronDown size={18} className="text-neutral-500" />
                  ) : leaf.isDirectory &&
                    !openDirectories.find((el) => el === leaf.id) ? (
                    <BiChevronRight size={18} className="text-neutral-500" />
                  ) : (
                    <BiFileBlank size={18} className="text-neutral-500" />
                  )}
                  <Link
                    href={`/${
                      leaf.parentDirectory ? leaf.parentDirectory + "/" : ""
                    }${leaf.name.split(" ").join("-")}`}
                    className={`w-full cursor-pointer text-neutral-200`}
                  >
                    {leaf.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
