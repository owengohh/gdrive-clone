"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useRouter } from "next/navigation";

export function NewFolderDialog(props: {
  readonly onCreate: (formData: FormData) => Promise<void>;
  readonly currentFolderId: number;
}) {
  const navigate = useRouter();
  const { onCreate, currentFolderId } = props;
  const [folderName, setFolderName] = useState("");

  const [open, setOpen] = useState(false);
  // When the user submits the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!folderName.trim()) return; // Validate that the folder name is not empty

    try {
      // Prepare the FormData to be passed to the server action
      const formData = new FormData();
      formData.append("folderName", folderName);
      formData.append("parentId", String(currentFolderId));

      // Call the server action to create the folder
      await onCreate(formData);

      // After folder creation
      setFolderName(""); // Reset input
      setOpen(false); // Close the dialog
      navigate.refresh(); // Refresh the page
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={() => setOpen(true)}
        >
          New Folder
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for your new folder. Click &quot;Create&quot; when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folderName" className="text-right">
                Name
              </Label>
              <Input
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!folderName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
