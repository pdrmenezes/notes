import { BreadCrumbs } from "@/components/breadcrumbs";
import { TextEditor } from "@/components/text-editor";
import { Suspense } from "react";

type Props = {
  params: Promise<{ filePath: string[] }>;
};

export default async function FilePage({ params }: Props) {
  const filePath = (await params).filePath || ["new"];

  return (
    <section className="flex flex-col p-8 pb-0 truncate">
      <BreadCrumbs paths={filePath || []} />
      <Suspense fallback={<p className="pt-8">Loading editor...</p>}>
        <TextEditor path={filePath.join("-")} />
      </Suspense>
    </section>
  );
}
