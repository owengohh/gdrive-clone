"use client";
import { UploadIcon, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { FileTreeItem, FolderTreeItem } from "./RowItem";
import BreadCrumbs from "./BreadCrumbs";
import type { SelectFile, SelectFolder } from "../server/db/schema";

export default function GoogleDriveClone(
  props: Readonly<{
    files: SelectFile[];
    folders: SelectFolder[];
    parents: SelectFolder[];
  }>,
) {
  const { files, folders, parents } = props;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">Google Drive</h1>
        <Button
          onClick={() => {
            console.log("Upload");
          }}
          className="flex items-center bg-blue-600 text-white hover:bg-blue-700"
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>
      <BreadCrumbs path={parents} />
      <div className="rounded-lg bg-gray-800 p-4 shadow-md">
        <div className="flex items-center border-b border-gray-700 p-2 font-semibold text-gray-300">
          <div className="flex flex-1 cursor-pointer items-center">
            Name <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
          <div className="w-24 cursor-pointer">
            Type <ArrowUpDown className="ml-1 inline h-4 w-4" />
          </div>
          <div className="w-24 cursor-pointer text-right">
            Size <ArrowUpDown className="ml-1 inline h-4 w-4" />
          </div>
        </div>
        {folders.map((item) => (
          <FolderTreeItem key={item.id} folder={item} />
        ))}
        {files.map((item) => (
          <FileTreeItem key={item.id} file={item} />
        ))}
      </div>
    </div>
  );
}
