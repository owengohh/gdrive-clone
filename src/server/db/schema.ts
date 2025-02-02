import "server-only";

import {
  integer,
  pgTable,
  text,
  timestamp,
  serial,
  index,
} from "drizzle-orm/pg-core";

export const filesTable = pgTable(
  "files",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    url: text("url").notNull(),
    parentId: integer("parentId").notNull(),
    size: integer("size").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => {
    return {
      indexes: [index("parentIdIndex").on(table.parentId)],
    };
  },
);

export const foldersTable = pgTable(
  "folders",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    parentId: integer("parentId"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => {
    return {
      indexes: [index("parentIdIndex").on(table.parentId)],
    };
  },
);

export type InsertFile = typeof filesTable.$inferInsert;
export type SelectFile = typeof filesTable.$inferSelect;

export type InsertFolder = typeof foldersTable.$inferInsert;
export type SelectFolder = typeof foldersTable.$inferSelect;
