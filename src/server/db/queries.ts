import "server-only";

import { db } from "~/server/db";
import { filesTable, foldersTable } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
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
  },
  getFiles: function (folderId: number) {
    return db
      .select()
      .from(filesTable)
      .where(eq(filesTable.parentId, folderId));
  },
  getFolders: function (folderId: number) {
    return db
      .select()
      .from(foldersTable)
      .where(eq(foldersTable.parentId, folderId));
  },
};
