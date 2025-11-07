export default defineEventHandler(async (event) => {
  const userid = getRouterParam(event,'userid')
  const gameid = getRouterParam(event,'gameid')
  const db = useDrizzle();
  const user_data = await getUserData(db,userid!,'nickname');

  return db.query.games.findMany({
    where: and(eq(tables.games.title,gameid!),eq(tables.games.user_id,user_data.id)),
    with: {
      user: true,
      event: true,
      puntuations: true,
      files: true,
      pictures: true,
      categories: true
    }
  })
})
