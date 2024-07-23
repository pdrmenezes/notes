export const MOCK_FILE_TREE = [
  {
    id: 1,
    name: "personal",
    isDirectory: true,
    parentDirectory: undefined,
    nodes: [
      {
        id: 2,
        name: "ideas",
        isDirectory: false,
        parentDirectory: "personal",
      },
      {
        id: 3,
        name: "trips",
        isDirectory: false,
        parentDirectory: "personal",
      },
      {
        id: 4,
        name: "plans",
        isDirectory: false,
        parentDirectory: "personal",
      },
      {
        id: 5,
        name: "goals",
        isDirectory: true,
        parentDirectory: "personal",
        nodes: [],
      },
      {
        id: 6,
        name: "finances",
        isDirectory: true,
        parentDirectory: "personal",
        nodes: [
          {
            id: 7,
            name: "dream house",
            isDirectory: true,
            parentDirectory: "personal/finances",
            nodes: [
              {
                id: 12,
                name: "property",
                isDirectory: false,
                parentDirectory: "personal/finances/dream-house",
              },
              {
                id: 13,
                name: "references",
                isDirectory: false,
                parentDirectory: "personal/finances/dream-house",
              },
              {
                id: 14,
                name: "big file name to test text truncating",
                isDirectory: false,
                parentDirectory: "personal/finances/dream-house",
              },
            ],
          },
          {
            id: 11,
            name: "cousin's wedding",
            isDirectory: false,
            parentDirectory: "personal/finances",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "work",
    isDirectory: true,
    parentDirectory: undefined,
    nodes: [
      {
        id: 9,
        name: "mei",
        isDirectory: false,
        parentDirectory: "work",
      },
      {
        id: 10,
        name: "projects",
        isDirectory: false,
        parentDirectory: "work",
      },
    ],
  },
];

export type mockedDataType = (typeof MOCK_FILE_TREE)[0];
