export interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  children?: FileItem[]
}

export const mockData: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    children: [
      { id: "1-1", name: "Resume.pdf", type: "file" },
      { id: "1-2", name: "Cover Letter.docx", type: "file" },
    ],
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    children: [
      { id: "2-1", name: "Vacation.jpg", type: "file" },
      { id: "2-2", name: "Family.png", type: "file" },
    ],
  },
  { id: "3", name: "Project Proposal.pptx", type: "file" },
  { id: "4", name: "Budget.xlsx", type: "file" },
]

