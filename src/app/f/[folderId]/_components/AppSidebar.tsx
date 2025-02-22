import * as React from "react";
import { GalleryVerticalEnd, File, Image, Users, Trash2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { UserButton, SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { NewFolderDialog } from "./NewFolderDialog";
import { NewFileDialog } from "./NewFileDialog";
import { createFolderAction } from "~/server/actions";
// Icons Map
const folderIcons: Record<string, React.ComponentType> = {
  Documents: File,
  Images: Image,
  Shared: Users,
  Trash: Trash2,
};

// Function to get a folder by name
type Folder = {
  id: number;
  name: string;
  ownerId: string;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

const getFolderByName = (folderTree: Folder[], name: string) =>
  folderTree.find((folder) => folder.name.toLowerCase() === name.toLowerCase());

// Recursive function to render other folders dynamically
const renderSidebarFolders = (folder: Folder) => {
  return (
    <SidebarMenuItem key={folder.id}>
      <SidebarMenuButton asChild>
        <Link href={`/f/${folder.id}`}>{folder.name}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AppSidebar({
  rootFolder,
  folderTree,
  currentFolderId,
  ...props
}: {
  rootFolder:
    | {
        id: number;
        name: string;
        parentId: number | null;
        ownerId: string;
        createdAt: Date;
        updatedAt: Date;
      }
    | undefined;
  folderTree: {
    id: number;
    name: string;
    ownerId: string;
    parentId: number | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
  currentFolderId: number;
} & React.ComponentProps<typeof Sidebar>) {
  // Get predefined folders
  const documentsFolder = getFolderByName(folderTree, "Documents");
  const imagesFolder = getFolderByName(folderTree, "Images");
  const sharedFolder = getFolderByName(folderTree, "Shared");
  const trashFolder = getFolderByName(folderTree, "Trash");

  // Get remaining folders (Work, Personal, and all others)
  const nonDefaultFolders = folderTree.filter(
    (folder) =>
      !["Documents", "Images", "Shared", "Trash"].includes(folder.name),
  );

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/f/${rootFolder?.id}`}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Google Drive Clone</span>
                </div>
                <div className="ml-auto flex">
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* New Button */}
        <SidebarMenu className="my-2">
          <SidebarMenuItem className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="text-gray-500 hover:text-gray-700"
              >
                <Button className="w-10/12">+ New</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <NewFolderDialog
                  onCreate={createFolderAction}
                  currentFolderId={currentFolderId}
                />
                <NewFileDialog currentFolderId={currentFolderId} />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Default Folders */}
        <SidebarGroup>
          <SidebarMenu>
            {[
              { folder: documentsFolder, label: "Documents" },
              { folder: imagesFolder, label: "Images" },
              { folder: sharedFolder, label: "Shared" },
              { folder: trashFolder, label: "Trash" },
            ].map(({ folder, label }) =>
              folder ? (
                <SidebarMenuItem key={folder.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/f/${folder.id}`}
                      className="flex items-center"
                    >
                      {folderIcons[label] &&
                        React.createElement(folderIcons[label])}
                      <span className="ml-2">{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : null,
            )}
          </SidebarMenu>
        </SidebarGroup>

        {/* Spacing Between Default and Other Folders */}
        {nonDefaultFolders.length > 0 && (
          <div className="mt-2 border-t border-gray-700 pt-2">
            <SidebarGroup>
              <SidebarMenu>
                {nonDefaultFolders.map(renderSidebarFolders)}
              </SidebarMenu>
            </SidebarGroup>
          </div>
        )}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
