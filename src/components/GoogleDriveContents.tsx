"use client";

import React, { useState, useMemo } from "react";
import { UploadIcon, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { FileTreeItem, FolderTreeItem } from "./RowItem";
import BreadCrumbs from "./BreadCrumbs";
import type { SelectFile, SelectFolder } from "../server/db/schema";

export default function GoogleDriveClone(
  props: Readonly<{
    files: SelectFile[];
    folders: SelectFolder[];
  }>,
) {
  const { files, folders } = props;
  const [currentFolder, setCurrentFolder] = useState<number>(1);

  const getChildFolders = () => {
    return folders.filter((folder) => folder.parentId === currentFolder);
  }

  const getChildFiles = () => {
    return files.filter((file) => file.parentId === currentFolder);
  }

  const navigate = (id: number) => {
    setCurrentFolder(id);
  };

  const path = useMemo(() => {
    const newPath = [];
    let currentId: number = currentFolder;
    while (currentId) {
      const folder: SelectFolder | undefined = folders.find(
        (f) => f.id === currentId,
      );
      if (folder) {
        newPath.unshift(folder);
        currentId = folder.parentId ?? undefined;
      } else {
        break;
      }
    }
    return newPath;
  }, [currentFolder, folders]);

  const handleUpload = () => {
    // Mock upload functionality
    console.log("Upload clicked");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">Google Drive</h1>
        <Button
          onClick={handleUpload}
          className="flex items-center bg-blue-600 text-white hover:bg-blue-700"
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>
      <BreadCrumbs path={path} onNavigate={navigate} />
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
        {getChildFolders().map((item) => (
          <FolderTreeItem key={item.id} folder={item} onNavigate={navigate} />
        ))}
        {getChildFiles().map((item) => (
          <FileTreeItem key={item.id} file={item} />
        ))}
      </div>
    </div>
  );
}
