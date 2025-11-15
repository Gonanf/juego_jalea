export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  const name = getRouterParam(event,'name')
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
    where: eq(tables.events.name, getRouterParam(event,'name')!),
    with: {
      evaluators: true
    }
  })

  if (!e?.evaluators.find((f) => f.user_id == session.user.id)){
    throw createError({
      statusCode: 403,
      statusMessage: 'Not an evaluator'
    })
  }

  const game = await db.query.games.findFirst({
    where: eq(tables.games.title, getRouterParam(event,'winner')!)
  })

  const result = await db.insert(tables.event_winners).values({event_id: e?.id!, game_id: game?.id!})
  
  return result
})