export default defineEventHandler(async (event) => {
  const userid = getRouterParam(event, 'userid')
  const body = await readBody(event)
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
  
  const user = await getUserData(db, userid!, 'id')
  
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }
  
  const permission = await db.query.permissions.findFirst({
    where: eq(tables.permissions.name, body.role)
  })
  
  if (!permission) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Role not found'
    })
  }
  
  //TODO: Rethink the permission system using the BetterAuth roles system
  
  return { success: true, message: `User role updated to ${body.role}` }
})