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

export async function deleteFolder(folderId: number) {
  await db.delete(foldersTable).where(eq(foldersTable.id, folderId));
}

export async function createFolder(name: string, parentId: number) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }
  return await db.insert(foldersTable).values({
    name,
    parentId,
    ownerId: session.userId,
  });
}
