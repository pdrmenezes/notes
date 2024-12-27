import { BreadCrumbs } from "@/components/breadcrumbs";
import { TextEditor } from "@/components/text-editor";

type Props = {
  params: Promise<{ filePath: string[] }>;
};

export default async function FilePage({ params }: Props) {
  const filePath = (await params).filePath;

  return (
    <section className="flex flex-col p-8 pb-0 truncate">
      <BreadCrumbs paths={filePath || []} />
      <TextEditor path={filePath.join("-")} />
    </section>
  );
}
