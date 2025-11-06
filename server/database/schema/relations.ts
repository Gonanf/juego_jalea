import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"
import { relations, sql } from "drizzle-orm"
import {users} from "./authentication";
import {categories, events, game_categories, game_files, games, logs, permissions, pictures, puntuation, user_permissions } from "./tables";

/////////////////////// RELATIONS ///////////////////////
export const user_relation = relations(users, ({many}) => ({
    logs: many(logs),
    games: many(games),
    permissions: many(user_permissions),
    puntuations: many(puntuation)
}))

export const game_relations = relations(games, ({one,many}) => ({
    user: one(users,{fields: [games.user_id], references: [users.id]}),
    event: one(events,{fields: [games.event_id], references: [events.id]}),
    puntuations: many(puntuation),
    files: many(game_files),
    pictures: many(pictures),
    categories: many(game_categories)
}))

export const log_relations = relations(logs, ({one}) => ({
    user: one(users,{fields: [logs.user_id], references: [users.id]})
}))

export const puntuation_relations = relations(puntuation,({one}) => ({
    user: one(users,{fields: [puntuation.user_id], references: [users.id]}),
    game: one(games,{fields: [puntuation.game_id], references: [games.id]})
}))

export const event_relations = relations(events,({many}) => ({
    games: many(games)
}))

export const game_files_relations = relations(game_files,({one}) => ({
    game: one(games, {fields: [game_files.game_id], references: [games.id]})
}))

export const game_categories_relations = relations(game_categories,({one}) => ({
    game: one(games,{fields: [game_categories.game_id], references: [games.id]}),
    category: one(categories,{fields: [game_categories.category_id], references: [categories.id]})
}))

export const category_relations = relations(categories, ({many}) => ({
    games: many(game_categories)
}))

export const user_permissions_relations = relations(user_permissions,({one}) => ({
    user: one(users,{fields: [user_permissions.user_id],references: [users.id]}),
    permission: one(permissions,{fields: [user_permissions.permission_id],references: [permissions.id]})
}))

export const pictures_relations = relations(pictures,({one}) => ({
    game: one(games,{fields: [pictures.game_id], references: [games.id]})
}))

export const permission_relations = relations(permissions,({many}) => ({
    users: many(user_permissions)
}))