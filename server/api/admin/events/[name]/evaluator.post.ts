export default defineEventHandler(async (event) => {
  
  const db = useDrizzle()
  const body = await readBody<{id: string}>(event)
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
    where: eq(tables.events.name, name!)
  })

if (!e) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Event not found'
    })
  }

  const user = await db.query.user.findFirst({
    where: eq(tables.user.id, body.id)
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }


  const result = await db.insert(tables.event_evaluators).values({event_id: e?.id, user_id: user.id});
  
  return result
})
