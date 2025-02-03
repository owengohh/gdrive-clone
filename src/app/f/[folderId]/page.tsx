import { db } from "~/server/db";
import GoogleDriveClone from "../../../components/GoogleDriveContents";
import { filesTable, foldersTable } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export default async function FolderPage(props: {
  readonly params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId, 10);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const files = await db
    .select()
    .from(filesTable)
    .where(eq(filesTable.parentId, parsedFolderId));
  const folders = await db
    .select()
    .from(foldersTable)
    .where(eq(foldersTable.parentId, parsedFolderId));
  return (
    <main className="min-h-screen bg-gray-900">
      <GoogleDriveClone files={files} folders={folders} />
    </main>
  );
}
