export default defineEventHandler(async (event) => {
  return await useDrizzle().query.users.findMany({
    with:{
      permissions: true,
      puntuations: true,
    }
  })
})
