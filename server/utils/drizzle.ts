import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1'
export { sql, eq, and, or } from 'drizzle-orm'
import {eq} from 'drizzle-orm'
import { DefaultLogger, LogWriter } from 'drizzle-orm/logger';
import * as schema from '../database/schema'
import * as z from "zod";
import {createSelectSchema, createInsertSchema, createUpdateSchema} from 'drizzle-zod'

export const tables = schema

export const Selectuser = createSelectSchema(tables.user);

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
    return db.query.user.findFirst({
      where: eq(tables.user.id,username)
    })

    if (z.email().safeParse(username).success)
    return db.query.user.findFirst({
      where: eq(tables.user.email,username)
    })

  return db.query.user.findFirst({
      where: eq(tables.user.nickname,username)
    })
}

export async function isTheUserOwner(db: DrizzleD1Database<_>,userid: string,session: any){
    if (!session || !session.user){
      throw createError({
      statusCode: 400,
      statusMessage: 'User Not Validated',
     })
    }

    const user = await getUserData(db,session.user.email);
  
    const data = await getUserData(db,userid!);
  
    if (!data || !user){
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

