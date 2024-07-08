import { wait } from "@/lib/utils";
import { INITIAL_CONTENT } from "../constants/initial-editor-content";
import { MOCK_FILE_TREE } from "../constants/mocked-data";

export async function getFiles() {
  await wait(300);
  return MOCK_FILE_TREE;
}

export async function createFile({ request, params }: any) {
  console.log("data/file/createFile request, params: ", request, params);

  await wait(300);
  return MOCK_FILE_TREE;
}

export async function getFileContent(filePath: string) {
  console.log("data/file/getFileContent filePath: ", filePath);

  await wait(300);
  return INITIAL_CONTENT;
}

export async function updateFile({request, params}:any){
  console.log("data/file/updateFile request, params: ", request, params);
  
  // const formData = await request.formData();
  // const updates = Object.fromEntries(formData);
  // await updateFile(params.contactId, updates);
  // return redirect(`/files/${params.contactId}`);
}
