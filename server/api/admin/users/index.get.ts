export default defineEventHandler(async (event) => {
  const db = useDrizzle()
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
  
  const users = await db.query.user.findMany({
    with: {
      games: true,
      puntuations: true
    }
  })
  
  return users
})