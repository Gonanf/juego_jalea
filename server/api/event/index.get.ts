export default defineEventHandler(async (event) => {
    return useDrizzle().query.events.findMany({
        with: {
            games: true,
            winners: true,
            evaluators: true,
        }
    })
})