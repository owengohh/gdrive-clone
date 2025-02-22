"use client";
import type { SelectFile, SelectFolder } from "../../../../server/db/schema";
import { columns } from "./datatable/columns";
import FolderCard from "./FolderCard";
import { DataTable } from "./datatable/data-table";

export default function GoogleDriveClone(
  props: Readonly<{
    files: SelectFile[];
    folders: SelectFolder[];
    currentFolderId: number;
  }>,
) {
  const { files, folders } = props;

  return (
    <div className="container mx-auto p-4">
      {/* Folders Grid */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-gray-300">Folders</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {folders.length > 0 ? (
            folders.map((folder) => (
              <FolderCard key={folder.id} folder={folder} />
            ))
          ) : (
            <p className="text-gray-400">No folders available.</p>
          )}
        </div>
        <div>
          <h2 className="mt-4 text-xl font-bold text-gray-300">Files</h2>
          {/* Files Table */}
          {files.length > 0 ? (
            <div className="container mx-auto py-4">
              <DataTable columns={columns} data={files} />
            </div>
          ) : (
            <p className="text-gray-400">No files available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
