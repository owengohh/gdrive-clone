"use client";

import { Folder, MoreVertical, Pencil, Trash } from "lucide-react";
import { Card, CardTitle } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { deleteFolder, renameFolder } from "~/server/actions";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "~/components/ui/input";

interface Folder {
  id: number;
  name: string;
}

export default function FolderCard(props: { folder: Folder }) {
  const { folder } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [folderName, setFolderName] = useState(folder.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useRouter();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleRename = async () => {
    if (folderName !== folder.name) {
      try {
        await renameFolder(folder.id, folderName);
        navigate.refresh(); // Refresh the page
        setIsEditing(false);
      } catch (error) {
        console.error("Error in renaming folder:", error);
      }
    }
  };
  return (
    <Card className="group flex items-center justify-between rounded-xl border border-gray-700 p-4 text-gray-300 transition hover:bg-gray-900 hover:shadow-lg">
      {/* Folder Icon and Name (With Link) */}
      <div className="flex flex-grow items-center">
        <Folder className="size-6 stroke-[1.5] text-gray-400 group-hover:text-white" />
        {isEditing ? (
          <Input
            ref={inputRef}
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await handleRename();
              }
            }}
            className="ml-3 bg-transparent text-white"
          />
        ) : (
          <Link
            href={`/f/${folder.id}`}
            className="flex flex-grow items-center"
          >
            <CardTitle className="ml-3 text-sm font-medium group-hover:text-white">
              {folderName}
            </CardTitle>
          </Link>
        )}
      </div>

      {/* Dropdown Menu for Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <MoreVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <Pencil className="mr-2 size-4" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              console.log(`Delete ${folder.name}`);
              await deleteFolder(folder.id);
              navigate.refresh();
            }}
            className="text-red-500"
          >
            <Trash className="mr-2 size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
