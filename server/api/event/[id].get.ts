import { avg, inArray } from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const db = useDrizzle()



    const event_data = await db.query.events.findFirst({
        where: eq(tables.events.name, getRouterParam(event, 'id')!)
    })

    const games_data = await db.query.games.findMany({
        where: eq(tables.games.event_id, event_data?.id!),
        with: {
            puntuations: true,
            user: true,
            pictures: true,
            files: true,
        },
    })
    const evaluators = db.select().from(tables.user).innerJoin(tables.event_evaluators, and(eq(tables.user.id, tables.event_evaluators.user_id),eq(tables.event_evaluators.event_id,event_data?.id!))).as('evaluators')


    for (const [index, val] of games_data.entries()) {
        const [evaluation] = await db.select({ avg: avg(tables.puntuation.puntuation) }).from(tables.puntuation).innerJoin(evaluators, and(eq(tables.puntuation.game_id, val?.id), eq(tables.puntuation.user_id, evaluators.user.id)))
        games_data[index].evaluation = evaluation.avg ?? 0;
                const [punctuation] = await db.select({ avg: avg(tables.puntuation.puntuation) }).from(tables.puntuation).where(eq(tables.puntuation.game_id, val?.id))
                games_data[index].punctuation = punctuation.avg ?? 0;
    }


    const winners_data = await db.query.event_winners.findMany({
        where: eq(tables.event_winners.event_id, event_data?.id!),
        with: {
            game: {
                with: {
                    puntuations: true,
                    user: true,
                    pictures: true,
                    files: true,
                }
            }
        },
    })

    for (const [index, val] of winners_data.entries()) {
        const [puntuation] = await db.select({ avg: avg(tables.puntuation.puntuation) }).from(tables.puntuation).where(eq(tables.puntuation.game_id, val?.game.id))
        winners_data[index].game.puntuation = puntuation.avg ?? 0;
        const [evaluation] = await db.select({ avg: avg(tables.puntuation.puntuation) }).from(tables.puntuation).innerJoin(evaluators, and(eq(tables.puntuation.game_id, val?.game.id), eq(tables.puntuation.user_id, evaluators.user.id)))
        winners_data[index].game.evaluation = evaluation.avg ?? 0;
    }


    return {
        ...event_data,
        winners: winners_data,
        games: games_data
    }
})