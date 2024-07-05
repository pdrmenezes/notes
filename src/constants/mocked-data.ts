export const MOCK_FILE_TREE = [
    { name: "personal", isDirectory: true, parentDirectory: "", isOpen: true },
    {
      name: "ideas",
      isDirectory: false,
      parentDirectory: "/personal",
      isOpen: false,
    },
    {
      name: "trips",
      isDirectory: false,
      parentDirectory: "/personal",
      isOpen: false,
    },
    {
      name: "plans",
      isDirectory: false,
      parentDirectory: "/personal",
      isOpen: false,
    },
    {
      name: "goals",
      isDirectory: true,
      parentDirectory: "/personal",
      isOpen: false,
    },
    { name: "work", isDirectory: true, parentDirectory: "", isOpen: true },
    { name: "mei", isDirectory: false, parentDirectory: "/work", isOpen: false },
    {
      name: "projects",
      isDirectory: false,
      parentDirectory: "/work",
      isOpen: false,
    },
  ];