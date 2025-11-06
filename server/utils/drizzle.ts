import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1'
export { sql, eq, and, or } from 'drizzle-orm'
import {eq} from 'drizzle-orm'
import { DefaultLogger, LogWriter } from 'drizzle-orm/logger';
import * as schema from '../database/schema'
import * as z from "zod";
import {createSelectSchema, createInsertSchema, createUpdateSchema} from 'drizzle-zod'
import { Session } from '#auth';

export const tables = schema

export const SelectUsers = createSelectSchema(tables.users);

export const SelectGames = createSelectSchema(tables.games);
export const InsertGames = createInsertSchema(tables.games);
export const UpdateGames = createUpdateSchema(tables.games);


class MyLogWriter implements LogWriter {
  async write(message: string) {
    console.log("FUNCANDO:", message)
  }
}

const logger = new DefaultLogger({ writer: new MyLogWriter() });

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema, logger })
}

export async function getUserData(db: DrizzleD1Database<_>, username: string) {
  if (z.uuid().safeParse(username).success)
    return db.query.users.findFirst({
      where: eq(tables.users.id,username)
    })

    if (z.email().safeParse(username).success)
    return db.query.users.findFirst({
      where: eq(tables.users.email,username)
    })

  return db.query.users.findFirst({
      where: eq(tables.users.nickname,username)
    })
}

export async function isTheUserOwner(db: DrizzleD1Database<_>,userid: string,session: Session){
    if (!session || !session.user?.email){
      throw createError({
      statusCode: 400,
      statusMessage: 'User Not Validated',
     })
    }

    const user = await getUserData(db,session.user.email);
  
    const data = await getUserData(db,userid!);
  
    if (data.length == 0 || user.length == 0){
      throw createError({
      statusCode: 404,
      statusMessage: 'User Not Found',
     })
    }
  
    if (user.id !=  data.id){
      throw createError({
      statusCode: 400,
      statusMessage: 'User is not the owner',
     })
    }

    return user
}