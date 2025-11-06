import { drizzle } from 'drizzle-orm/d1'
export { sql, eq, and, or } from 'drizzle-orm'
import { DefaultLogger, LogWriter } from 'drizzle-orm/logger';
import * as schema from '../database/schema'

export const tables = schema

class MyLogWriter implements LogWriter {
  async write(message: string) {
    console.log("FUNCANDO:",(await hubDatabase().prepare("SELECT * FROM user;").run()).results, message)
  }
}

const logger = new DefaultLogger({ writer: new MyLogWriter() });

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema, logger })
}


