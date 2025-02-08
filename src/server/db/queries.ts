import "server-only";

import { db } from "~/server/db";
import { filesTable, foldersTable } from "~/server/db/schema";
import { eq, and, isNull } from "drizzle-orm";

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
      .where(eq(filesTable.parentId, folderId))
      .orderBy(filesTable.id);
  },
  getFolders: function (folderId: number) {
    return db
      .select()
      .from(foldersTable)
      .where(eq(foldersTable.parentId, folderId))
      .orderBy(foldersTable.id);
  },
  getFolderById: async function (folderId: number) {
    return await db
      .select()
      .from(foldersTable)
      .where(eq(foldersTable.id, folderId))
      .then((result) => result[0]);
  },
  getRootFolderForUser: async function (userId: string) {
    return await db
      .select()
      .from(foldersTable)
      .where(
        and(eq(foldersTable.ownerId, userId), isNull(foldersTable.parentId)),
      )
      .then((result) => result[0]);
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      type: string;
      url: string;
      size: number;
      parentId: number;
    };
    userID: string;
  }) {
    console.log(input);
    return await db.insert(filesTable).values([
      {
        ...input.file,
        ownerId: input.userID,
      },
    ]);
  },
  onBoardUser: async function (input: { userID: string }) {
    const rootFolder = await db
      .insert(foldersTable)
      .values([
        {
          name: "root",
          parentId: null,
          ownerId: input.userID,
        },
      ])
      .returning({ id: foldersTable.id });
    console.log(rootFolder);
    await db.insert(foldersTable).values([
      {
        name: "Shared",
        parentId: rootFolder[0]!.id,
        ownerId: input.userID,
      },
      {
        name: "Trash",
        parentId: rootFolder[0]!.id,
        ownerId: input.userID,
      },
      {
        name: "Documents",
        parentId: rootFolder[0]!.id,
        ownerId: input.userID,
      },
      {
        name: "Images",
        parentId: rootFolder[0]!.id,
        ownerId: input.userID,
      },
    ]);
    return rootFolder[0]!.id;
  },
  createFolder: async function (input: {
    name: string;
    parentId: number;
    ownerId: string;
  }) {
    return await db.insert(foldersTable).values([
      {
        name: input.name,
        parentId: input.parentId,
        ownerId: input.ownerId,
      },
    ]);
  },
};
