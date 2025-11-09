import { deleteGameData, postGame } from "~~/server/utils/utilities"

export default defineEventHandler(async (event) => {
  const userid = getRouterParam(event, 'userid')
  const gameid = getRouterParam(event, 'gameid')
  const db = useDrizzle()

  const formData = await readFormData(event);
  
  const user_data = await getUserData(db, userid!, 'nickname')
  const session = await auth().api.getSession({
    headers: event.headers
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

  await deleteGameData(existingGame.id,db);
  const request = getRequestURL(event)
  
  return postGame(formData,db,session,existingGame,request,"update");  
})
