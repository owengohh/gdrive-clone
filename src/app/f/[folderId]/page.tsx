import GoogleDriveClone from "../../../components/GoogleDriveContents";
import { QUERIES } from "../../../server/db/queries";

export default async function FolderPage(props: {
  readonly params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId, 10);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }
  const [files, folders, parents] = await Promise.all([
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getAllParentsForFolder(parsedFolderId),
  ]);

  return (
    <main className="min-h-screen bg-gray-900">
      <GoogleDriveClone
        files={files}
        folders={folders}
        parents={parents}
        currentFolderId={parsedFolderId}
      />
    </main>
  );
}
