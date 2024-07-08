export const MOCK_FILE_TREE = [
  {
    id: "1",
    name: "personal",
    isDirectory: true,
    parentDirectory: undefined,
    isOpen: true,
  },
  {
    id: "2",
    name: "ideas",
    isDirectory: false,
    parentDirectory: "personal",
    isOpen: false,
  },
  {
    id: "3",
    name: "trips",
    isDirectory: false,
    parentDirectory: "personal",
    isOpen: false,
  },
  {
    id: "4",
    name: "plans",
    isDirectory: false,
    parentDirectory: "personal",
    isOpen: false,
  },
  {
    id: "5",
    name: "goals",
    isDirectory: true,
    parentDirectory: "personal",
    isOpen: false,
  },
  {
    id: "6",
    name: "finances",
    isDirectory: true,
    parentDirectory: "personal",
    isOpen: true,
  },
  {
    id: "7",
    name: "dream house",
    isDirectory: true,
    parentDirectory: "personal/finances",
    isOpen: true,
  },
  {
    id: "8",
    name: "work",
    isDirectory: true,
    parentDirectory: undefined,
    isOpen: true,
  },
  {
    id: "9",
    name: "mei",
    isDirectory: false,
    parentDirectory: "work",
    isOpen: false,
  },
  {
    id: "10",
    name: "projects",
    isDirectory: false,
    parentDirectory: "work",
    isOpen: false,
  },
];

export type mockedDataType = (typeof MOCK_FILE_TREE)[0];
