import { BreadCrumbs } from "@/components/breadcrumbs";
import { ContentPanel } from "@/components/content-panel";
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
      <ContentPanel path={path} />
    </section>
  );
}
