import { db } from "~/server/db";
import GoogleDriveClone from "../components/GoogleDriveContents";
import { filesTable, foldersTable } from "~/server/db/schema";

export default async function Home() {
  const files = await db.select().from(filesTable);
  const folders = await db.select().from(foldersTable);
  return (
    <main className="min-h-screen bg-gray-900">
      <GoogleDriveClone files={files} folders={folders} />
    </main>
  );
}
