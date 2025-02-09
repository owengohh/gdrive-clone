"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { DropdownMenuItem } from "../../../../components/ui/dropdown-menu";
import { useState } from "react";
import { UploadButton } from "../../../../components/uploadthing";
import { useRouter } from "next/navigation";

export function NewFileDialog(props: { currentFolderId: number }) {
  const navigate = useRouter();
  let { currentFolderId } = props;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={() => setOpen(true)}
        >
          New File
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New File</DialogTitle>
          <DialogDescription>
            Upload a new file to the current folder.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <UploadButton
            endpoint="driveUploader"
            onClientUploadComplete={() => {
              navigate.refresh();
              setOpen(false);
            }}
            input={{ folderId: currentFolderId }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
