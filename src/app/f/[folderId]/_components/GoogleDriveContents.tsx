"use client";
import { ArrowUpDown } from "lucide-react";
import { FileTreeItem, FolderTreeItem } from "./RowItem";
import BreadCrumbs from "./BreadCrumbs";
import type { SelectFile, SelectFolder } from "../../../../server/db/schema";
import { UserButton, SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { UploadButton } from "../../../../components/uploadthing";
import { useRouter } from "next/navigation";
 
export default function GoogleDriveClone(
  props: Readonly<{
    files: SelectFile[];
    folders: SelectFolder[];
    parents: SelectFolder[];
    currentFolderId: number;
  }>,
) {
  const { files, folders, parents } = props;
  const navigate = useRouter();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">Google Drive</h1>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
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
          <div className="w-24 cursor-pointer text-right">Action</div>
        </div>
        {folders.map((item) => (
          <FolderTreeItem key={item.id} folder={item} />
        ))}
        {files.map((item) => (
          <FileTreeItem key={item.id} file={item} />
        ))}
      </div>
      <UploadButton
        endpoint="driveUploader"
        onClientUploadComplete={() => {
          navigate.refresh();
        }}
        input={{ folderId: props.currentFolderId }}
      />
    </div>
  );
}
