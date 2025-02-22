import { ColumnDef } from "@tanstack/react-table";
import { SelectFile } from "~/server/db/schema";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { deleteFile } from "~/server/actions";
import { RenameModal } from "../RenameModal";
import * as React from "react";

export const columns: ColumnDef<SelectFile>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Size",
    accessorKey: "size",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const file = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only text-white">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <RenameModal currentFolderId={file.id} />
            <DropdownMenuItem
              onClick={async (e) => {
                e.stopPropagation();
                await deleteFile(file.id);
              }}
              className="text-red-500"
            >
              Delete File
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
