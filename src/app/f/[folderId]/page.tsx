import GoogleDriveClone from "./_components/GoogleDriveContents";
import { QUERIES } from "../../../server/db/queries";
import { auth } from "@clerk/nextjs/server";

export default async function FolderPage(props: {
  readonly params: Promise<{ folderId: string }>;
}) {
  const session = await auth();
  if (!session.userId) {
    return <div>Unauthorized</div>;
  }
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId, 10);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }
  const [files, folders, parents, rootFolder] = await Promise.all([
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getAllParentsForFolder(parsedFolderId),
    QUERIES.getRootFolderForUser(session.userId),
  ]);

  return (
    <main className="min-h-screen bg-gray-900">
      <GoogleDriveClone
        files={files}
        folders={folders}
        parents={parents}
        currentFolderId={parsedFolderId}
        rootFolderId={rootFolder!.id}
      />
    </main>
  );
}
