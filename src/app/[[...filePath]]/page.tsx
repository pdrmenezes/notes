import { BreadCrumbs } from "@/components/breadcrumbs";
import { TextEditor } from "@/components/text-editor";
import { Suspense } from "react";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ filePath: string[] }>;
};

export default async function FilePage({ params }: Props) {
  const filePath = (await params).filePath || [];

  if (filePath.length === 0) {
    redirect("/welcome");
  }

  const path = filePath.join("/");

  return (
    <section className="flex flex-col p-8 pb-0 truncate">
      <BreadCrumbs paths={filePath || []} />
      <Suspense fallback={<p className="pt-8">Loading editor...</p>}>
        <TextEditor path={path} />
      </Suspense>
    </section>
  );
}
