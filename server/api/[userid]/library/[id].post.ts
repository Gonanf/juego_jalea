export default defineEventHandler(async (event) => {
  const body = await readBody<{game_id: string}>(event)

  const userid = getRouterParam(event, 'userid')
  const db = useDrizzle()

  const session = await auth().api.getSession({
    headers: event.headers
  })

  await isTheUserOwner(db, userid!, session, 'nickname')

  return db.insert(tables.user_library).values({user_id: session?.user.id!,game_id: body.game_id})
})
