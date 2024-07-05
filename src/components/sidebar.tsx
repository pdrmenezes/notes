import { BiChevronDown, BiChevronRight, BiFileBlank } from "react-icons/bi";
import { MOCK_FILE_TREE } from "../constants/mocked-data";

export function Sidebar() {
  return (
    <aside className="h-full border-r border-r-neutral-700 p-4 font-mono">
      <div className="flex flex-col gap-4 pl-4 pt-4">
        <div id="file-list" className="flex flex-col gap-1">
          {MOCK_FILE_TREE.map((leaf) => {
            const fileDepth =
              leaf.parentDirectory.length -
              leaf.parentDirectory.replaceAll("/", "").length;

            const indentingStyling = `pl-${fileDepth * 4}`;
            const classNames = `inline-flex items-center gap-1 hover:bg-[#282E34] ${indentingStyling}`;
            return (
              <div
                className={classNames}
                onClick={() => {
                  // set files and directories as open/closed
                }}
              >
                {leaf.isDirectory && leaf.isOpen ? (
                  <BiChevronDown size={18} className="text-neutral-500" />
                ) : leaf.isDirectory && !leaf.isOpen ? (
                  <BiChevronRight size={18} className="text-neutral-500" />
                ) : (
                  <BiFileBlank size={18} className="text-neutral-500" />
                )}
                <p
                  key={leaf.parentDirectory + leaf.name}
                  className={`w-full cursor-pointer text-neutral-200 `}
                >
                  {leaf.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
