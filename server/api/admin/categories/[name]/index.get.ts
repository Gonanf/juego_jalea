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
  
  const result = await db.query.categories.findFirst({
    where: eq(tables.categories.name, name!),
    with: {
      games: true
    }
  })
  
  return result
})