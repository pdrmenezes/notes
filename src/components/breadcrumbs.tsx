import { BiChevronRight } from "react-icons/bi";

export function BreadCrumbs() {
  return (
    <div className="inline-flex border-b border-b-neutral-700 w-full items-center gap-2 pb-4 font-mono text-neutral-500">
      <p className="cursor-pointer hover:text-neutral-300">personal</p>{" "}
      <BiChevronRight size={18} className="text-neutral-500" />{" "}
      <p className="cursor-pointer hover:text-neutral-300">ideas</p>
    </div>
  );
}
