import { auth } from "@clerk/nextjs/server";
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
          const user = await auth();
          if (!user.userId) {
            throw new Error("User not found");
          }
          await db.insert(foldersTable).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parentId: index !== 0 ? 1 : null,
              ownerId: user.userId,
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
              ownerId: user.userId,
            })),
          );
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
