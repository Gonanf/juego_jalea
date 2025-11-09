export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  const session = await auth.api.getSession({
    headers: getHeaders(event)
  })
  
  if (!session || !session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
  
  const isAdmin = await auth.api.isAdmin({
    headers: getHeaders(event)
  })
  
  if (!isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required'
    })
  }
  
  const users = await db.query.user.findMany({
    with: {
      permissions : true
    }
  })
  
  return users
})