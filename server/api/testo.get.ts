export default defineEventHandler(async (event) => {
  const db = hubDatabase();

  return await useDrizzle().select().from(tables.accounts)
})
