import type { SelectFolder } from "../server/db/schema";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import React from "react";

export default function BreadCrumbs(props: {
  readonly path: SelectFolder[];
  readonly onNavigate: (id: number) => void;
}) {
  const { path, onNavigate } = props;
  return (
    <div className="mb-4 flex items-center text-gray-400">
      {path.map((folder, index) => (
        <React.Fragment key={folder.id}>
          {index > 0 && <ChevronRightIcon className="mx-2 h-4 w-4" />}
          <button
            className="hover:text-gray-200"
            onClick={() => onNavigate(folder.id)}
          >
            {index === 0 ? <HomeIcon className="h-4 w-4" /> : folder.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
