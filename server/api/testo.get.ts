export default defineEventHandler(async (event) => {
  return await useDrizzle().query.user.findMany({
    with:{
      permissions: true,
      puntuations: true,
    }
  })
})
