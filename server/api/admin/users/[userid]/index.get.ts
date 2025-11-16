export default defineEventHandler(async (event) => {
  const userid = getRouterParam(event, 'userid')
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
  
  const user = await getUserData(db, userid!, 'id')
  
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }
  
  const userWithDetails = await db.query.user.findFirst({
    where: eq(tables.user.id, userid!),
    with: {
      puntuations: true,
      games: {
        with: {
          puntuations: true,
          files: true,
          pictures: true,
          categories: true
        }
      }
    }
  })
  
  return userWithDetails
})