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
        role: 'admin',
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

  const body = await readBody<{reason: string, time: number}>(event)
  
  const result = await auth().api.banUser({
    body: {
        userId: user.id,
        banReason: body.reason,
        banExpiresIn: body.time,
    },
    headers: event.headers,
});
  return result
})