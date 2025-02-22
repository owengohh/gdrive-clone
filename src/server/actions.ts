"use server";

import { db } from "~/server/db";
import { eq, and } from "drizzle-orm";
import { filesTable, foldersTable } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }
  const [file] = await db
    .select()
    .from(filesTable)
    .where(
      and(eq(filesTable.id, fileId), eq(filesTable.ownerId, session.userId)),
    );

  if (!file) {
    return { error: "File not found" };
  }

  const utApiResult = await utApi.deleteFiles([
    file.url.replace("https://utfs.io/f/", ""),
  ]);

  console.log(utApiResult);

  const dbDeleteResult = await db
    .delete(filesTable)
    .where(
      and(eq(filesTable.id, fileId), eq(filesTable.ownerId, session.userId)),
    );
  console.log(dbDeleteResult);

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));
  return { success: true };
}

export async function createFolderAction(formData: FormData) {
  const name = formData.get("folderName") as string;
  const parentId = Number(formData.get("parentId"));

  const session = await auth();
  if (!session.userId) {
    throw new Error("User not authenticated");
  }

  await db.insert(foldersTable).values({
    name,
    parentId,
    ownerId: session.userId,
  });
}

export async function renameFile(fileId: number, newName: string) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }
  console.log("Renaming file", fileId, newName);
  await db
    .update(filesTable)
    .set({ name: newName })
    .where(
      and(eq(filesTable.id, fileId), eq(filesTable.ownerId, session.userId)),
    );
}

export async function deleteFolder(folderId: number) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }
  await db
    .delete(foldersTable)
    .where(
      and(
        eq(foldersTable.id, folderId),
        eq(foldersTable.ownerId, session.userId),
      ),
    );
}

export async function renameFolder(folderId: number, newName: string) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }
  console.log("Renaming folder", folderId, newName);
  await db
    .update(foldersTable)
    .set({ name: newName })
    .where(
      and(
        eq(foldersTable.id, folderId),
        eq(foldersTable.ownerId, session.userId),
      ),
    );
}
