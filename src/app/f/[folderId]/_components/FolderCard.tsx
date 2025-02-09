import { Folder, MoreVertical, Pencil, Trash } from "lucide-react";
import { Card, CardTitle } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function FolderCard({ folder }: { folder: any }) {
  return (
    <Card className="group flex items-center justify-between rounded-xl border border-gray-700 p-4 text-gray-300 transition hover:bg-gray-900 hover:shadow-lg">
      {/* Folder Icon and Name (With Link) */}
      <Link href={`/f/${folder.id}`} className="flex items-center">
        <Folder className="size-6 stroke-[1.5] text-gray-400 group-hover:text-white" />
        <CardTitle className="ml-3 text-sm font-medium group-hover:text-white">
          {folder.name}
        </CardTitle>
      </Link>

      {/* Dropdown Menu for Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <MoreVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => console.log(`Rename ${folder.name}`)}
          >
            <Pencil className="mr-2 size-4" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => console.log(`Delete ${folder.name}`)}
            className="text-red-500"
          >
            <Trash className="mr-2 size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
