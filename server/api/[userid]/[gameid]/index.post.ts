import { postGame } from "~~/server/utils/utilities"

export default defineEventHandler(async (event) => {
  const userid = getRouterParam(event, 'userid')
  const gameid = getRouterParam(event, 'gameid')
  const db = useDrizzle()

  const session = await auth.api.getSession({
    headers: getHeaders(event)
  })

  await isTheUserOwner(db, userid!, session, 'nickname')

  const existingGame = await db.query.games.findFirst({
    where: and(eq(tables.games.title, gameid!), eq(tables.games.user_id, session.user.id))
  })

  if (existingGame) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Game with this title already exists'
    })
  }

  const formData = await readFormData(event);
  const request = getRequestURL(event)
  
  return postGame(formData, db, session, existingGame, request);  
})