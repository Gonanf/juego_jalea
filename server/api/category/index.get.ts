export default defineEventHandler(async (event) => {
    return useDrizzle().query.categories.findMany()
})