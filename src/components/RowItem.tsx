import { FolderIcon, FileIcon } from "lucide-react";
import type { SelectFile, SelectFolder } from "../server/db/schema";
import Link from "next/link";

export function FileTreeItem(props: { readonly file: SelectFile }) {
  const { file } = props;
  return (
    <Link
      className="flex items-center rounded-lg p-2 hover:bg-gray-700"
      href={file.url}
      target="_blank"
    >
      <div className="flex flex-1 items-center">
        <FileIcon className="mr-2 h-5 w-5 text-gray-400" />
        <span className="text-gray-200">{file.name}</span>
      </div>
      <div className="w-24 text-gray-400">File</div>
      <div className="w-24 text-right text-gray-400">{file.size}</div>
    </Link>
  );
}

export function FolderTreeItem(props: {
  readonly folder: SelectFolder;
}) {
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
    </Link>
  );
}
