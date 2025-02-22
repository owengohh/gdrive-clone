"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { DropdownMenuItem } from "../../../../components/ui/dropdown-menu";
import { useState } from "react";
import { renameFile } from "~/server/actions";
import { useRouter } from "next/navigation";

export function RenameModal(props: { readonly currentFolderId: number }) {
  const { currentFolderId } = props;
  const [newFolderName, setNewFolderName] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!newFolderName.trim()) return;
    try {
      await renameFile(currentFolderId, newFolderName);
      setNewFolderName("");
      setOpen(false);
      navigate.refresh();
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          Rename File
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="folderName"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Rename
            </Button>
            <Button
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
