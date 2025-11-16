import * as z from 'zod'

export default defineEventHandler(async (event) => {
    const db = useDrizzle()
    const userid = getRouterParam(event,'userid')
    let gameid = getRouterParam(event,'gameid')
        gameid = gameid?.replaceAll('%20',' ')
    const session = await auth().api.getSession({
    headers: event.headers,
  })

  const schema = z.object({puntuation: z.number().min(0).max(5)})

  const body = await readValidatedBody(event,schema.parse)

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
    console.log(gameid)
    throw createError({
      statusCode: 404,
      statusMessage: 'The game does not exist'
    })
  }

  const existent = await db.query.puntuation.findFirst({
    where: and(eq(tables.puntuation.game_id,game.id),eq(tables.puntuation.user_id,session.user.id))
  })

  if (existent){
    return db.update(tables.puntuation).set({puntuation: body.puntuation})
  }
  
  return db.insert(tables.puntuation).values({game_id: game.id, user_id: session.user.id, puntuation: body.puntuation})
})
