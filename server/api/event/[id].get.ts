export default defineEventHandler(async (event) => {
    return useDrizzle().query.events.findFirst({
        where: eq(tables.events.name, getRouterParam(event,'id')!),
        with: {
            games: true,
            winners: true,
        }
    })
})