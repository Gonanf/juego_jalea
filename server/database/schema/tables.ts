import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"
import { user } from "./authentication";

/////////////////////// TABLES ///////////////////////

export const events = sqliteTable('events', {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').unique(),
  createdAt: integer({ mode: 'timestamp_ms' }).$default(() => new Date()),
  updatedAt: integer({ mode: 'timestamp_ms' }).$onUpdate(() => new Date()),
})


export const games = sqliteTable('games', {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: integer(),
  cover: text('cover'),
  user_id: text('user_id').notNull().references(() => user.id, { onDelete: "cascade" }),
  event_id: text('event_id').references(() => events.id, { onDelete: "cascade" }),
  createdAt: integer({ mode: 'timestamp_ms' }).$default(() => new Date()),
  updatedAt: integer({ mode: 'timestamp_ms' }).$onUpdate(() => new Date()),
})

export const pictures = sqliteTable('pictures', {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  picture_url: text('picture_url').notNull(),
  game_id: text('game_id').notNull().references(() => games.id, { onDelete: "cascade" }),
  createdAt: integer({ mode: 'timestamp_ms' }).$default(() => new Date()),
  updatedAt: integer({ mode: 'timestamp_ms' }).$onUpdate(() => new Date()),
})

export const categories = sqliteTable('categories', {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  createdAt: integer({ mode: 'timestamp_ms' }).$default(() => new Date()),
  updatedAt: integer({ mode: 'timestamp_ms' }).$onUpdate(() => new Date()),
})

export const game_categories = sqliteTable('game_categories', {
  game_id: text('game_id').notNull().references(() => games.id, { onDelete: "cascade" }),
  category_id: text('category_id').notNull().references(() => categories.id, { onDelete: "cascade" }),
  createdAt: integer({ mode: 'timestamp_ms' }).$default(() => new Date()),
  updatedAt: integer({ mode: 'timestamp_ms' }).$onUpdate(() => new Date()),
},
  (game_categories) => [
    primaryKey({
      columns: [game_categories.game_id, game_categories.category_id],
    }),
  ])

export const game_files = sqliteTable('game_files', {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: text('type', { enum: ["source", "windows", "linux"] }),
  name: text('name').notNull(),
  link: text('link').notNull(),
  game_id: text('game_id').notNull().references(() => games.id, { onDelete: "cascade" }),
  createdAt: integer({ mode: 'timestamp_ms' }).$default(() => new Date()),
  updatedAt: integer({ mode: 'timestamp_ms' }).$onUpdate(() => new Date()),
})

export const logs = sqliteTable('logs', {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  operation: text('operation'),
  user_id: text('user_id').notNull().references(() => user.id, { onDelete: "cascade" }),
  user_ip: text('user_ip'),
  createdAt: integer({ mode: 'timestamp_ms' }).$default(() => new Date()),
  updatedAt: integer({ mode: 'timestamp_ms' }).$onUpdate(() => new Date()),
})

export const puntuation = sqliteTable('puntuation', {
  user_id: text('user_id').notNull().references(() => user.id, { onDelete: "cascade" }),
  game_id: text('game_id').notNull().references(() => games.id, { onDelete: "cascade" }),
  puntuation: integer().notNull()
},

  (puntuation) => [
    primaryKey({
      columns: [puntuation.game_id, puntuation.user_id],
    }),
  ])

export const event_winners = sqliteTable('event_winners', {
  event_id: text('user_id').notNull().references(() => user.id, { onDelete: "cascade" }),
  game_id: text('game_id').notNull().references(() => games.id, { onDelete: "cascade" }),
},

  (event_winners) => [
    primaryKey({
      columns: [event_winners.game_id, event_winners.event_id],
    }),
  ])