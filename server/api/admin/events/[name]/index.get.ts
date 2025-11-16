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


  
  const result = await db.query.events.findFirst({
    where: eq(tables.events.name, name!),
    with: {
      games: true,
      winners: true
    }
  });
  
  return result
})