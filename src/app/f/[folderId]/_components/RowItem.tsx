import { FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import type { SelectFile, SelectFolder } from "../../../../server/db/schema";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { deleteFile } from "~/server/actions";

export function FileTreeItem(props: { readonly file: SelectFile }) {
  const { file } = props;
  return (
    <div className="flex items-center">
      <Link
        className="flex flex-1 items-center rounded-lg p-2 hover:bg-gray-700"
        href={file.url}
        target="_blank"
      >
        <div className="flex flex-1 items-center">
          <FileIcon className="mr-2 h-5 w-5 text-gray-400" />
          <span className="text-gray-200">{file.name}</span>
        </div>
        <div className="w-24 text-gray-400">{file.type}</div>
        <div className="w-24 text-right text-gray-400">{file.size}</div>
      </Link>
      <Button className="w-24 text-right" variant="ghost" aria-label="Delete file" onClick={() => deleteFile(file.id)}>
        <Trash2Icon size={20} />
      </Button>
    </div>
  );
}

export function FolderTreeItem(props: { readonly folder: SelectFolder }) {
  const { folder } = props;
  return (
    <Link
      className="flex w-full items-center rounded-lg p-2 text-left hover:bg-gray-700"
      href={`/f/${folder.id}`}
    >
      <div className="flex flex-1 items-center">
        <FolderIcon className="mr-2 h-5 w-5 text-yellow-400" />
        <span className="text-gray-200">{folder.name}</span>
      </div>
      <div className="w-24 text-gray-400">Folder</div>
      <div className="w-24 text-right text-gray-400">-</div>
      <div className="w-24 text-right text-gray-400">-</div>
    </Link>
  );
}
