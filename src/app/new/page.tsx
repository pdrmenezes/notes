import { TextEditor } from "@/components/text-editor";

export default function NewFilePage() {
  const fileContent = `# Text file`

  return <TextEditor content={fileContent} />;
}
