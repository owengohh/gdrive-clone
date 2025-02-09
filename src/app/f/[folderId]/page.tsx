import GoogleDriveClone from "./_components/GoogleDriveContents";
import { QUERIES } from "../../../server/db/queries";
import { auth } from "@clerk/nextjs/server";
import { AppSidebar } from "./_components/AppSidebar";
import BreadCrumbs from "./_components/BreadCrumbs";
import { Separator } from "../../../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar";

export default async function FolderPage(props: {
  readonly params: Promise<{ folderId: string }>;
}) {
  const session = await auth();
  if (!session.userId) {
    return <div>Unauthorized</div>;
  }
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId, 10);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }
  const [files, folders, parents, rootFolder, foldersInRoot] =
    await Promise.all([
      QUERIES.getFiles(parsedFolderId),
      QUERIES.getFoldersForUserInFolder(session.userId, parsedFolderId),
      QUERIES.getAllParentsForFolder(parsedFolderId),
      QUERIES.getRootFolderForUser(session.userId),
      QUERIES.getFoldersForUserInRootFolder(session.userId),
    ]);
  return (
    <SidebarProvider>
      <AppSidebar
        rootFolder={rootFolder}
        folderTree={foldersInRoot}
        currentFolderId={parsedFolderId}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <BreadCrumbs path={parents} />
        </header>
        <main className="min-h-screen bg-zinc-950">
          <GoogleDriveClone
            files={files}
            folders={folders}
            currentFolderId={parsedFolderId}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
