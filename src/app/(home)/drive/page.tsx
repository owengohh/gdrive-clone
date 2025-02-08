import { auth } from "@clerk/nextjs/server";
import { MUTATIONS, QUERIES } from "~/server/db/queries";
import { redirect } from "next/navigation";

export default async function DrivePage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <form
        action={async () => {
          "use server";
          const session = await auth();
          if (!session.userId) {
            return redirect("/sign-in");
          }
          const folderId = await MUTATIONS.onBoardUser({
            userID: session.userId,
          });
          return redirect(`/f/${folderId}`);
        }}
      >
        <button type="submit">Create root folder</button>
      </form>
    );
  }

  return redirect(`/f/${rootFolder.id}`);
}
