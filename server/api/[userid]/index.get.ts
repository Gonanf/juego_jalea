export default defineEventHandler(async (event) => {
    return useDrizzle().query.user.findFirst({
        where: eq(tables.user.nickname,getRouterParam(event,'userid')!),
        with: {
            games: true,
            puntuations: true,
            library: true
        }
    })
})