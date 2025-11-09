export default defineEventHandler(async (event) => {
    return useDrizzle().query.categories.findFirst({
        where: eq(tables.categories.name, getRouterParam(event,'id')!),
    })
})