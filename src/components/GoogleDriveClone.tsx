"use client";

import React, { useState, useMemo } from "react";
import { mockFiles, mockFolders } from "../lib/mockData";
import { UploadIcon, ArrowUpDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { FileTreeItem, FolderTreeItem } from "./RowItem";
import BreadCrumbs from "./BreadCrumbs";

const GoogleDriveClone: React.FC = () => {
  const [currentFolder, setCurrentFolder] = useState<string>("root");
  const [sortColumn, setSortColumn] = useState<"name" | "type" | "size">(
    "name",
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const getCurrentFolderContents = () => {
    const folders = mockFolders.filter(
      (folder) => folder.parent === currentFolder,
    );
    const files = mockFiles.filter((file) => file.parent === currentFolder);
    const contents = [...folders, ...files];
    return contents.sort((a, b) => {
      if (sortColumn === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortColumn === "type") {
        if (sortDirection === "asc") {
          return a.type === "folder" ? -1 : 1;
        } else {
          return a.type === "folder" ? 1 : -1;
        }
      } else if (sortColumn === "size") {
        if (a.type === "folder" && b.type === "folder") return 0;
        if (a.type === "folder") return sortDirection === "asc" ? -1 : 1;
        if (b.type === "folder") return sortDirection === "asc" ? 1 : -1;
        return sortDirection === "asc"
          ? Number.parseInt(a.size) - Number.parseInt(b.size)
          : Number.parseInt(b.size) - Number.parseInt(a.size);
      }
      return 0;
    });
  };

  const navigate = (id: string) => {
    setCurrentFolder(id);
  };

  const path = useMemo(() => {
    const newPath = [];
    let currentId = currentFolder;
    while (currentId) {
      const folder = mockFolders.find((f) => f.id === currentId);
      if (folder) {
        newPath.unshift(folder);
        currentId = folder.parent ?? "";
      } else {
        break;
      }
    }
    return newPath;
  }, [currentFolder]);

  const handleUpload = () => {
    // Mock upload functionality
    console.log("Upload clicked");
  };

  const handleSort = (column: "name" | "type" | "size") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
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
          <div
            className="flex flex-1 cursor-pointer items-center"
            onClick={() => handleSort("name")}
          >
            Name <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
          <div
            className="w-24 cursor-pointer"
            onClick={() => handleSort("type")}
          >
            Type <ArrowUpDown className="ml-1 inline h-4 w-4" />
          </div>
          <div
            className="w-24 cursor-pointer text-right"
            onClick={() => handleSort("size")}
          >
            Size <ArrowUpDown className="ml-1 inline h-4 w-4" />
          </div>
        </div>
        {getCurrentFolderContents().map((item) =>
          item.type === "folder" ? (
            <FolderTreeItem key={item.id} folder={item} onNavigate={navigate} />
          ) : (
            <FileTreeItem key={item.id} file={item} />
          ),
        )}
      </div>
    </div>
  );
};

export default GoogleDriveClone;
