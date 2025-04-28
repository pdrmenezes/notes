import { FileNode, FileTree } from "@/components/file-node";
import { TEMPLATE_FILE_TREE } from "@/constants/template-data";

const LS_KEY = "basic_notes";

function getNextId(files: FileNode[]): number {
  let maxId = 0;

  const findMaxId = (nodes: FileNode[]) => {
    for (const node of nodes) {
      maxId = Math.max(maxId, node.id);
      if (node.nodes) {
        findMaxId(node.nodes);
      }
    }
  };

  findMaxId(files);
  return maxId + 1;
}

export function initializeStorage() {
  if (typeof window === "undefined") return [];

  const storedData = localStorage.getItem(LS_KEY);
  if (!storedData) {
    localStorage.setItem(LS_KEY, JSON.stringify([]));
    return [];
  }

  return JSON.parse(storedData);
}

export function loadTemplate() {
  const newTree = TEMPLATE_FILE_TREE;
  saveFileTreeToLocalStorage(newTree);
  return newTree;
}

export function getFileTree(): FileNode[] {
  const storage = localStorage.getItem(LS_KEY);
  if (!storage) {
    initializeStorage();
  }

  const data = JSON.parse(storage || "[]");
  return data;
}

export function saveFileTreeToLocalStorage(tree: FileNode[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(LS_KEY, JSON.stringify(tree));
}

export function findFolderByPath(
  tree: FileNode[],
  parentPath: string | undefined
): FileNode[] {
  if (!parentPath) return tree;

  const pathParts = parentPath.split("/");
  let currentLevel = tree;

  for (const part of pathParts) {
    const folder = currentLevel.find(
      (node) => node.isDirectory && node.name === part
    );
    if (!folder || !folder.nodes) return [];
    currentLevel = folder.nodes;
  }

  return currentLevel;
}

export function getPathFromNode(node: FileNode): string {
  return node.parentDirectory
    ? `${node.parentDirectory}/${node.name}`
    : node.name;
}

export function createFile(
  tree: FileNode[],
  parentPath: string | undefined,
  fileName: string
): FileNode[] {
  const newTree = [...tree];
  const id = getNextId(newTree);
  const newNode = createFileNodeObject(id, fileName, false, parentPath);

  if (!parentPath) {
    newTree.push(newNode);
  } else {
    const pathParts = parentPath.split("/");
    let currentLevel = newTree;

    for (const part of pathParts) {
      const folder = currentLevel.find(
        (node) => node.isDirectory && node.name === part
      );
      if (!folder || !folder.nodes) return newTree;
      currentLevel = folder.nodes;
    }

    currentLevel.push(newNode);
  }

  return newTree;
}

export function createFolder(
  tree: FileNode[],
  parentPath: string | undefined,
  folderName: string
): FileNode[] {
  const newTree = [...tree];
  const id = getNextId(newTree);
  const newNode = createFileNodeObject(id, folderName, true, parentPath);

  if (!parentPath) {
    newTree.push(newNode);
  } else {
    const parentParts = parentPath.split("/");
    let currentLevel = newTree;

    for (const part of parentParts) {
      const folder = currentLevel.find(
        (node) => node.isDirectory && node.name === part
      );
      if (!folder || !folder.nodes) return newTree;
      currentLevel = folder.nodes;
    }

    currentLevel.push(newNode);
  }

  return newTree;
}

export function findNodeByPath(
  tree: FileNode[],
  path: string
): FileNode | undefined {
  if (!path) return undefined;

  const pathParts = path.split("/");
  const nodeName = pathParts[pathParts.length - 1];
  const parentPath =
    pathParts.length > 1 ? pathParts.slice(0, -1).join("/") : undefined;

  if (!parentPath) {
    return tree.find((node) => node.name === nodeName);
  } else {
    let currentLevel = tree;
    for (let i = 0; i < pathParts.length - 1; i++) {
      const folder = currentLevel.find(
        (node) => node.isDirectory && node.name === pathParts[i]
      );
      if (!folder || !folder.nodes) return undefined;
      currentLevel = folder.nodes;
    }

    return currentLevel.find((node) => node.name === nodeName);
  }
}

export function deleteNode(tree: FileNode[], nodePath: string): FileNode[] {
  const newTree = [...tree];
  const pathParts = nodePath.split("/");
  const nodeName = pathParts.pop() || "";
  const parentPath = pathParts.length > 0 ? pathParts.join("/") : undefined;

  if (!parentPath) {
    const nodeIndex = newTree.findIndex((node) => node.name === nodeName);
    if (nodeIndex !== -1) {
      newTree.splice(nodeIndex, 1);
    }
  } else {
    let currentLevel = newTree;
    for (const part of pathParts) {
      const folder = currentLevel.find(
        (node) => node.isDirectory && node.name === part
      );
      if (!folder || !folder.nodes) return newTree;
      currentLevel = folder.nodes;
    }

    const nodeIndex = currentLevel.findIndex((node) => node.name === nodeName);
    if (nodeIndex !== -1) {
      currentLevel.splice(nodeIndex, 1);
    }
  }

  return newTree;
}

export function renameNode(
  tree: FileNode[],
  nodePath: string,
  oldName: string,
  newName: string
) {
  const newTree = [...tree];
  const pathParts = nodePath.split("/");
  const nodeName = pathParts.pop() || "";
  const parentPath = pathParts.length > 0 ? pathParts.join("/") : undefined;

  let currentLevel = newTree;
  if (parentPath) {
    for (const part of pathParts) {
      const folder = currentLevel.find(
        (node) => node.isDirectory && node.name === part
      );
      if (!folder || !folder.nodes) return newTree;
      currentLevel = folder.nodes;
    }
  }

  const nodeToRename = currentLevel.find((node) => node.name === nodeName);
  if (!nodeToRename) return newTree;

  nodeToRename.name = newName;

  if (nodeToRename.isDirectory && nodeToRename.nodes) {
    const oldPath = parentPath ? `${parentPath}/${nodeName}` : nodeName;
    const newPath = parentPath ? `${parentPath}/${newName}` : newName;

    const updateChildrenPaths = (
      nodes: FileNode[],
      oldParentPath: string,
      newParentPath: string
    ) => {
      for (const node of nodes) {
        if (node.parentDirectory === oldParentPath) {
          node.parentDirectory = newParentPath;
        }

        if (node.isDirectory && node.nodes) {
          const oldChildPath = `${oldParentPath}/${node.name}`;
          const newChildPath = `${newParentPath}/${node.name}`;
          updateChildrenPaths(node.nodes, oldChildPath, newChildPath);
        }
      }
    };

    updateChildrenPaths(nodeToRename.nodes, oldPath, newPath);
  }

  return newTree;
}

export function copyFile(tree: FileNode[], filePath: string): FileNode[] {
  const newTree = [...tree];
  const pathParts = filePath.split("/");
  const fileName = pathParts.pop() || "";
  const parentPath = pathParts.length > 0 ? pathParts.join("/") : undefined;

  const fileNode = findNodeByPath(newTree, filePath);
  if (!fileNode || fileNode.isDirectory) return newTree;

  const id = getNextId(newTree);
  const copyFileName = `${fileName} copy`;
  const content = fileNode.data?.content;

  const newFileNode = createFileNodeObject(
    id,
    copyFileName,
    false,
    parentPath,
    content
  );

  let targetFolder = findFolderByPath(newTree, parentPath);
  targetFolder.push(newFileNode);

  return newTree;
}

export function pathToUrl(path: string): string {
  if (!path) return "";
  return path.split(" ").join("-");
}

export function getUrlPathFromNode(node: FileNode): string {
  const path = getPathFromNode(node);
  return pathToUrl(path);
}

export function findNodeByUrlPath(
  tree: FileTree["tree"],
  urlPath: string
): FileNode | undefined {
  if (!urlPath) return undefined;

  const pathParts = urlPath.split("/");
  let currentLevel = tree;
  let currentNode: FileNode | undefined;

  for (let i = 0; i < pathParts.length; i++) {
    const urlSegment = pathParts[i];
    currentNode = currentLevel.find(
      (node) => pathToUrl(node.name) === urlSegment
    );

    if (!currentNode) return undefined;

    if (i === pathParts.length - 1) {
      return currentNode;
    }

    if (currentNode.isDirectory && currentNode.nodes) {
      currentLevel = currentNode.nodes;
    } else {
      return undefined;
    }
  }

  return undefined;
}

export function getFileContent(path: string): any {
  if (typeof window === "undefined") return null;

  const node = findNodeByPath(getFileTree(), path);
  return node && !node.isDirectory && node.data ? node.data.content : null;
}

export function saveNoteContent(path: string, content: any): void {
  if (typeof window === "undefined") return;

  const tree = getFileTree();
  const node = findNodeByPath(tree, path);

  if (node && !node.isDirectory) {
    node.data = node.data || { type: "note" };
    node.data.content = content;

    saveFileTreeToLocalStorage(tree);
  }
}

export function getNoteContent(path: string): any {
  return getFileContent(path);
}

export function getStorage() {
  if (typeof window === "undefined") return { tree: TEMPLATE_FILE_TREE };

  const storedData = localStorage.getItem(LS_KEY);
  if (!storedData) {
    return initializeStorage();
  }

  return JSON.parse(storedData);
}

export function createFileNodeObject(
  id: number,
  name: string,
  isDirectory: boolean,
  parentDirectory?: string,
  content?: any
): FileNode {
  if (isDirectory) {
    return {
      id,
      name,
      isDirectory: true,
      parentDirectory,
      nodes: [],
    };
  } else {
    return {
      id,
      name,
      isDirectory: false,
      parentDirectory,
      data: {
        content: content || null,
        type: "note",
      },
    };
  }
}
