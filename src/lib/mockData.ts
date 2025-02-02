export type File = {
  id: string;
  name: string;
  type: "file";
  url: string;
  parent: string;
  size: string;
}

export type Folder = {
  id: string;
  name: string;
  type: "folder";
  parent: string | null;
};

export const mockFolders: Folder[] = [
    {id: "root", name: "root", type: "folder", parent: null},
    {id: "1", name: "Documents", type: "folder", parent: "root"},
    {id: "2", name: "Images", type: "folder", parent: "root"},
    {id: "3", name: "Work", type: "folder", parent: "root"},
    {id: "4", name: "Personal", type: "folder", parent: "root"},
    {id: "5", name: "Folder1", type: "folder", parent: "1"},
    {id: "6", name: "Folder2", type: "folder", parent: "1"},
];

export const mockFiles: File[] = [
    {id: "1", name: "Document1.txt", type: "file", url: "/files/document1.pdf", parent: "1", size: "1.5MB"},
    {id: "2", name: "Document2.txt", type: "file", url: "/files/document2.pdf", parent: "1", size: "2MB"},
    {id: "3", name: "Image1.jpg", type: "file", url: "/files/image1.jpg", parent: "2", size: "3MB"},
    {id: "4", name: "Image2.jpg", type: "file", url: "/files/image2.jpg", parent: "2", size: "4MB"},
    {id: "5", name: "Work1.doc", type: "file", url: "/files/work1.doc", parent: "3", size: "5MB"},
    {id: "6", name: "Work2.doc", type: "file", url: "/files/work2.doc", parent: "3", size: "6MB"},
    {id: "7", name: "Personal1.txt", type: "file", url: "/files/personal1.txt", parent: "4", size: "7MB"},
    {id: "8", name: "Personal2.txt", type: "file", url: "/files/personal2.txt", parent: "4", size: "8MB"},
];
