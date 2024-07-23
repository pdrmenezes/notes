import { BreadCrumbs } from "@/components/breadcrumbs";
import { TextEditor } from "@/components/text-editor";

export default function FilePage({
  params,
}: {
  params: { filePath: string[] };
}) {
  return (
    <section className="flex flex-col p-8 pb-0 truncate">
      <BreadCrumbs paths={params.filePath || []} />
      <TextEditor content="# New Text" />
    </section>
  );
}
