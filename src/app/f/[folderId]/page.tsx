import { db } from "~/server/db";
import GoogleDriveClone from "../../../components/GoogleDriveContents";
import { filesTable, foldersTable } from "~/server/db/schema";
import { eq } from "drizzle-orm";

async function getAllParent(folderId: number) {
  const parents = [];
  let currentFolderId: number | null = folderId;
  while (currentFolderId) {
    const folder = await db
      .selectDistinct()
      .from(foldersTable)
      .where(eq(foldersTable.id, currentFolderId));
    if (!folder[0]) {
      throw new Error("Folder not found");
    }
    console.log(folder);
    parents.unshift(folder[0]);
    currentFolderId = folder[0]?.parentId;
  }
  return parents;
}

export default async function FolderPage(props: {
  readonly params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId, 10);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }
  const filesPromise = db
    .select()
    .from(filesTable)
    .where(eq(filesTable.parentId, parsedFolderId));
  const foldersPromise = db
    .select()
    .from(foldersTable)
    .where(eq(foldersTable.parentId, parsedFolderId));
  const parentsPromise = getAllParent(parsedFolderId);

  const [files, folders, parents] = await Promise.all([
    filesPromise,
    foldersPromise,
    parentsPromise,
  ]);
  return (
    <main className="min-h-screen bg-gray-900">
      <GoogleDriveClone files={files} folders={folders} parents={parents} />
    </main>
  );
}
