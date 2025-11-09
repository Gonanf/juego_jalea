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
  
  const totalUsers = await db.select().from(tables.user)
  const totalGames = await db.select().from(tables.games)
  const totalEvents = await db.select().from(tables.events)
  const totalPuntuations = await db.select().from(tables.puntuation)
  
  const stats = {
    users: totalUsers.length,
    games: totalGames.length,
    events: totalEvents.length,
    puntuations: totalPuntuations.length
  }
  
  return stats
})