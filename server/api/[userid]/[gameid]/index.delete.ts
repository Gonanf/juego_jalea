import { deleteGameData, deleteGamePunctuations } from "~~/server/utils/utilities"

export default defineEventHandler(async (event) => {
  const userid = getRouterParam(event, 'userid')
  const gameid = getRouterParam(event, 'gameid')
  const db = useDrizzle()
  
  const user_data = await getUserData(db, userid!, 'nickname')
  const session = await auth.api.getSession({
    headers: getHeaders(event)
  })
  
  await isTheUserOwner(db, userid!, session, 'nickname')
  
  const existingGame = await db.query.games.findFirst({
    where: and(eq(tables.games.title, gameid!), eq(tables.games.user_id, user_data.id))
  })
  
  if (!existingGame) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Game not found'
    })
  }
  
  await db.delete(tables.games)
    .where(and(eq(tables.games.title, gameid!), eq(tables.games.user_id, user_data.id)))
  
  await deleteGameData(existingGame.id, db);

  await deleteGamePunctuations(existingGame.id,db);
  
  return { success: true, message: 'Game deleted successfully' }
})
