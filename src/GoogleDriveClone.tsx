"use client"

import type React from "react"
import { useState } from "react"
import { type FileItem, mockData } from "../mockData"
import { FolderIcon, FileIcon, ChevronDownIcon, ChevronRightIcon, UploadIcon } from "lucide-react"
import { Button } from "~/components/ui/button"

const FileTreeItem: React.FC<{ item: FileItem; level: number }> = ({ item, level }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleFolder = () => {
    if (item.type === "folder") {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className="mb-1">
      <div
        className={`flex items-center p-2 hover:bg-gray-700 rounded-lg cursor-pointer`}
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={toggleFolder}
      >
        {item.type === "folder" &&
          (isOpen ? (
            <ChevronDownIcon className="w-4 h-4 mr-2 text-gray-400" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 mr-2 text-gray-400" />
          ))}
        {item.type === "folder" ? (
          <FolderIcon className="w-5 h-5 mr-2 text-yellow-400" />
        ) : (
          <FileIcon className="w-5 h-5 mr-2 text-gray-400" />
        )}
        {item.type === "file" ? (
          <a href={`#file-${item.id}`} className="text-blue-400 hover:underline">
            {item.name}
          </a>
        ) : (
          <span className="text-gray-200">{item.name}</span>
        )}
      </div>
      {item.type === "folder" && isOpen && item.children && (
        <div className="ml-4">
          {item.children.map((child) => (
            <FileTreeItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

const GoogleDriveClone: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>(mockData)

  const handleUpload = () => {
    // Mock upload functionality
    const newFile: FileItem = {
      id: `${files.length + 1}`,
      name: `New File ${files.length + 1}.txt`,
      type: "file",
    }
    setFiles([...files, newFile])
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-100">Google Drive Clone</h1>
        <Button onClick={handleUpload} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white">
          <UploadIcon className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-md p-4">
        {files.map((item) => (
          <FileTreeItem key={item.id} item={item} level={0} />
        ))}
      </div>
    </div>
  )
}

export default GoogleDriveClone

