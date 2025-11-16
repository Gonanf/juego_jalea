export default defineEventHandler(async (event) => {
  const userid = getRouterParam(event, 'userid')
  const db = useDrizzle()

  const session = await auth().api.getSession({
    headers: event.headers
  })

  await isTheUserOwner(db, userid!, session, 'nickname')

return db.query.user_library.findMany({
    where: eq(tables.user_library.user_id,session?.user.id!),
    with: {
        game: true
    }
})

})