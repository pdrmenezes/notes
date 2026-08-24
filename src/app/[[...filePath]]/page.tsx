import { BreadCrumbs } from "@/components/breadcrumbs";
import { BreadCrumbsSkeleton } from "@/components/breadcrumbs-skeleton";
import { ContentPanel } from "@/components/content-panel";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ filePath: string[] }>;
};

export default function FilePage({ params }: Props) {
  return (
    <section className="flex flex-col p-8 pb-0 truncate">
      <Suspense fallback={<BreadCrumbsSkeleton />}>
        <FileContent params={params} />
      </Suspense>
    </section>
  );
}

async function FileContent({ params }: Props) {
  const filePath = (await params).filePath || [];

  if (filePath.length === 0) {
    redirect("/welcome");
  }

  const path = filePath.join("/");

  return (
    <>
      <BreadCrumbs paths={filePath} />
      <ContentPanel path={path} />
    </>
  );
}
