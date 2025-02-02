import { db } from "../../server/db/index";
import { mockFiles, mockFolders } from "~/lib/mockData";
import { filesTable, foldersTable } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form
        action={async () => {
          "use server";
          await db.insert(foldersTable).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parentId: index !== 0 ? 1 : null,
            })),
          );
          await db.insert(filesTable).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              type: "file",
              url: file.url,
              parentId: 1,
              size: 50000,
            })),
          );
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
