import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"
import {users} from "./authentication";

/////////////////////// TABLES ///////////////////////
export const permissions = sqliteTable('permissions',{
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull().unique(),
    created_at: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
    updated_at: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`).$onUpdate(() => sql`(current_timestamp)`)
})

export const user_permissions = sqliteTable('user_permissions',{
  user_id: text('user_id').notNull().references(() => users.id, {onDelete: "cascade"}),
  permission_id: text('permission_id').notNull().references(() => permissions.id, {onDelete: "cascade"}),
  meta: text('meta',{ mode: 'json' }),
  created_at: text('created_at')
  .notNull()
  .default(sql`(current_timestamp)`),
  updated_at: text('updated_at')
  .notNull()
  .default(sql`(current_timestamp)`).$onUpdate(() => sql`(current_timestamp)`)
},

  (user_permissions) => [
    primaryKey({
      columns: [user_permissions.user_id, user_permissions.permission_id],
    }),
  ])

export const events = sqliteTable('events',{
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  created_at: text('created_at')
  .notNull()
  .default(sql`(current_timestamp)`),
  updated_at: text('updated_at')
  .notNull()
  .default(sql`(current_timestamp)`).$onUpdate(() => sql`(current_timestamp)`)
})


export const games = sqliteTable('games',{
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    title: text('title').notNull(),
    description: text('description').notNull(),
    price: integer(),
    cover: text('cover'),
    user_id: text('user_id').notNull().references(() => users.id, {onDelete: "cascade"}),
    event_id: text('event_id').references(() => events.id, {onDelete: "cascade"}),
    created_at: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
    updated_at: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`).$onUpdate(() => sql`(current_timestamp)`)
  })

export const pictures = sqliteTable('pictures',{
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    picture_url: text('picture_url').notNull(),
    game_id: text('game_id').notNull().references(() => games.id, {onDelete: "cascade"}),
    created_at: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
    updated_at: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`).$onUpdate(() => sql`(current_timestamp)`)
  })

export const categories = sqliteTable('categories',{
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
    created_at: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
    updated_at: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`).$onUpdate(() => sql`(current_timestamp)`)
})

export const game_categories = sqliteTable('game_categories',{
    game_id: text('game_id').notNull().references(() => games.id, {onDelete: "cascade"}),
    category_id: text('category_id').notNull().references(() => categories.id, {onDelete: "cascade"}),
        created_at: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
    updated_at: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`).$onUpdate(() => sql`(current_timestamp)`)
  },
(game_categories) => [
    primaryKey({
      columns: [game_categories.game_id, game_categories.category_id],
    }),
  ])

export const game_files = sqliteTable('game_files',{
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: text('type',{enum: ["source","windows","linux"]}),
  name: text('name').notNull(),
  link: text('link').notNull(),
  game_id: text('game_id').notNull().references(() => games.id, {onDelete: "cascade"}),
    created_at: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
    updated_at: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`).$onUpdate(() => sql`(current_timestamp)`)
})

export const logs = sqliteTable('logs',{
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  operation: text('operation'),
  user_id: text('user_id').notNull().references(() => users.id, {onDelete: "cascade"}),
  user_ip: text('user_ip'),
  created_at: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
    updated_at: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`).$onUpdate(() => sql`(current_timestamp)`)
})

export const puntuation = sqliteTable('puntuation',{
  user_id: text('user_id').notNull().references(() => users.id, {onDelete: "cascade"}),
  game_id: text('game_id').notNull().references(() => games.id, {onDelete: "cascade"}),
  puntuation: integer().notNull()
},

(puntuation) => [
    primaryKey({
      columns: [puntuation.game_id, puntuation.user_id],
    }),
  ])