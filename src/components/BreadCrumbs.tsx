import type { SelectFolder } from "../server/db/schema";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function BreadCrumbs(props: { readonly path: SelectFolder[] }) {
  const { path } = props;
  return (
    <div className="mb-4 flex items-center text-gray-400">
      {path.map((folder, index) => (
        <React.Fragment key={folder.id}>
          {index > 0 && <ChevronRightIcon className="mx-2 h-4 w-4" />}
          <Link
            className="hover:text-gray-200"
            href={index === 0 ? "/f/1" : `/f/${folder.id}`}
          >
            {index === 0 ? <HomeIcon className="h-4 w-4" /> : folder.name}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
