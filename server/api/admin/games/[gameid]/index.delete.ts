export default defineEventHandler(async (event) => {
  const gameid = getRouterParam(event, 'gameid')
  const db = useDrizzle()
  const session = await auth().api.getSession({
    headers: getHeaders(event)
  })
  
  if (!session || !session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
  
  const isAdmin = await auth().api.isAdmin({
    headers: getHeaders(event)
  })
  
  if (!isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required'
    })
  }
  
  const existingGame = await db.query.games.findFirst({
    where: eq(tables.games.id, gameid!)
  })
  
  if (!existingGame) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Game not found'
    })
  }
  
  await db.delete(tables.games)
    .where(eq(tables.games.id, gameid!))
  
  return { success: true, message: 'Game deleted successfully' }
})