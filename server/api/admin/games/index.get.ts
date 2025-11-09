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
  
  const games = await db.query.games.findMany({
    with: {
      user: true,
      event: true,
      puntuations: true,
      files: true,
      pictures: true,
      categories: true
    }
  })
  
  return games
})