"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiChevronRight, BiFileBlank } from "react-icons/bi";

export type FileNode = {
  id: number;
  name: string;
  nodes?: FileNode[];
  parentDirectory?: string;
  isDirectory: boolean;
};

type FileNodeProps = {
  fileNode: FileNode;
};

export function FileNode({ fileNode }: FileNodeProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <span
        title={fileNode.name}
        className="flex items-center gap-1.5 hover:bg-[#282E34] cursor-pointer"
        onClick={() => {
          if (!fileNode.isDirectory) {
            router.push(
              `/${
                fileNode.parentDirectory ? fileNode.parentDirectory + "/" : ""
              }${fileNode.name.split(" ").join("-")}`
            );
          }
          setIsOpen((prev) => !prev);
        }}
      >
        {fileNode.isDirectory && fileNode.nodes ? (
          <BiChevronRight
            size={18}
            className={`text-neutral-500 flex-shrink-0 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        ) : (
          <BiFileBlank size={18} className="text-neutral-500 flex-shrink-0" />
        )}
        <p className="truncate">{fileNode.name}</p>
      </span>
      {isOpen && (
        <ul className="pl-4">
          {fileNode.nodes &&
            fileNode.nodes?.length > 0 &&
            fileNode?.nodes?.map((node) => (
              <FileNode fileNode={node} key={node.id} />
            ))}
        </ul>
      )}
    </li>
  );
}
