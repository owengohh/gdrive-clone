import type { SelectFolder } from "../../../../server/db/schema";
import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbList,
  BreadcrumbEllipsis,
} from "../../../../components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

export default function BreadCrumbs(props: { readonly path: SelectFolder[] }) {
  const { path } = props;
  let finalPath: SelectFolder[] = path;
  let dropDownItems: SelectFolder[] = [];
  let dropDown = false;
  if (path.length > 3) {
    dropDown = true;
    dropDownItems = path.slice(1, -1);
    finalPath = [path[0]!, path[path.length - 1]!];
    console.log(dropDownItems);
    console.log(finalPath);
  }
  return (
    <div className="flex items-center text-gray-400">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Render First Path Item */}
          <BreadcrumbItem>
            <BreadcrumbLink href={`/f/${finalPath[0]!.id}`}>
              {finalPath[0]!.name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Render Dropdown if needed */}
          {dropDown && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-gray-500 hover:text-gray-700">
                    <BreadcrumbEllipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {dropDownItems.map((folder) => (
                      <DropdownMenuItem key={folder.id}>
                        <Link href={`/f/${folder.id}`} className="w-full">
                          {folder.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </>
          )}

          {/* Render Last Path Item */}
          {path.length > 1 && (
            <>
              <BreadcrumbSeparator />
              {finalPath.slice(1).map((folder, index) => (
                <React.Fragment key={folder.id}>
                  {index !== 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {index === finalPath.length - 1 ? (
                      <BreadcrumbPage>{folder.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={`/f/${folder.id}`}>
                        {folder.name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
