import * as z from 'zod'

export default defineEventHandler(async (event) => {
    const db = useDrizzle()
    const userid = getRouterParam(event,'userid')
    const gameid = getRouterParam(event,'gameid')
    const session = await auth().api.getSession({
    headers: event.headers,
  })

  if (!session || !session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const game = await db.query.games.findFirst({
    where: eq(tables.games.title,gameid!)
  })

  if (!game){
    throw createError({
      statusCode: 404,
      statusMessage: 'The game does not exist'
    })
  }

  const existent = await db.query.puntuation.findFirst({
    where: and(eq(tables.puntuation.game_id,game.id),eq(tables.puntuation.user_id,session.user.id))
  })

  if (!existent){
    throw createError({
      statusCode: 404,
      statusMessage: 'The user did not rate this game'
    })
  }
  
  return existent
})
