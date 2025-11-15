import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"
import { relations, sql } from "drizzle-orm"
import {user} from "./authentication";
import {categories, event_evaluators, event_winners, events, game_categories, game_files, games, logs, pictures, puntuation, user_library } from "./tables";

/////////////////////// RELATIONS ///////////////////////
export const user_relation = relations(user, ({many}) => ({
    logs: many(logs),
    games: many(games),
    puntuations: many(puntuation),
    library: many(user_library)
}))

export const game_relations = relations(games, ({one,many}) => ({
    user: one(user,{fields: [games.user_id], references: [user.id]}),
    event: one(events,{fields: [games.event_id], references: [events.id]}),
    puntuations: many(puntuation),
    evaluations: many(puntuation,{relationName: "evaluations"}),
    files: many(game_files),
    pictures: many(pictures),
    categories: many(game_categories),
    wins: many(event_winners)
}))

export const user_library_relations = relations(user_library, ({one}) => ({
    user: one(user,{fields: [user_library.user_id], references: [user.id]}),
    game: one(games,{fields: [user_library.game_id], references: [games.id]}),
}))

export const log_relations = relations(logs, ({one}) => ({
    user: one(user,{fields: [logs.user_id], references: [user.id]})
}))

export const puntuation_relations = relations(puntuation,({one}) => ({
    user: one(user,{fields: [puntuation.user_id], references: [user.id]}),
    game: one(games,{fields: [puntuation.game_id], references: [games.id]})
}))

export const event_relations = relations(events,({many}) => ({
    games: many(games),
    winners: many(event_winners),
    evaluators: many(event_evaluators)
}))

export const event_evaluator_relations = relations(event_evaluators, ({one}) => ({
    user: one(user,{fields: [event_evaluators.user_id], references: [user.id]}),
    event: one(events,{fields: [event_evaluators.event_id], references: [events.id]}),
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

export const pictures_relations = relations(pictures,({one}) => ({
    game: one(games,{fields: [pictures.game_id], references: [games.id]})
}))

export const event_winners_relations = relations(event_winners,({one}) => ({
    event: one(events,{fields: [event_winners.event_id], references: [events.id]}),
    game: one(games,{fields: [event_winners.game_id], references: [games.id]})
}))