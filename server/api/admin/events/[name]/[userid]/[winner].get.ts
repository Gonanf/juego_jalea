export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  const name = getRouterParam(event, 'name')
  const session = await auth().api.getSession({
    headers: event.headers
  })


  if (!session || !session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const isAdmin = await auth().api.userHasPermission({
    body: {
      userId: session.user.id,
      role: session.user.role,
      permission: { "events": ["create", "update"] }
    },
  });



  if (!isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required'
    })
  }


  const e = await db.query.events.findFirst({
    where: eq(tables.events.name, getRouterParam(event, 'name')!),
    with: {
      evaluators: true
    }
  })

  if (!e?.evaluators.find((f) => f.user_id == session.user.id)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Not an evaluator'
    })
  }

  const gameid = getRouterParam(event, 'winner')?.replaceAll('%20', ' ')
  const userid = getRouterParam(event, 'userid')?.replaceAll('%20', ' ')

  const user = await db.query.user.findFirst({
    where: eq(tables.user.nickname, userid)
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  const game = await db.query.games.findFirst({
    where: and(eq(tables.games.title, gameid), eq(tables.games.user_id, user.id))
  })

  if (!game) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Game not found'
    })
  }

  const result = await db.insert(tables.event_winners).values({ event_id: e?.id!, game_id: game?.id! })

  return result
})