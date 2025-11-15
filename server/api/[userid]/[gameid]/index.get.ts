import { avg } from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const db = useDrizzle()

    const user = await db.query.user.findFirst({
        where: eq(tables.user.nickname, getRouterParam(event, 'userid')!)
    })

    const games_data = await db.query.games.findFirst({
        where: and(eq(tables.games.user_id, user?.id!), eq(tables.games.title, getRouterParam(event, 'gameid')!)),
        with: {
            puntuations: true,
            user: true,
            pictures: true,
            files: true,
            categories: {
              with: {
                category: true
              }
            },
            event: {
                with: {
                    evaluators: true
                }
            }
        },
        extras:{
            punctuation: sql`avg(${tables.puntuation.puntuation})`.as('punctuation'),
        }
    })
    const evaluators = db.select().from(tables.user).innerJoin(tables.event_evaluators, and(eq(tables.user.id, tables.event_evaluators.user_id),eq(tables.event_evaluators.event_id,games_data?.event?.id!))).as('evaluators')


    const [evaluation] = await db.select({ avg: avg(tables.puntuation.puntuation) }).from(tables.puntuation).innerJoin(evaluators, and(eq(tables.puntuation.game_id, games_data?.id), eq(tables.puntuation.user_id, evaluators.user.id)))
    games_data.evaluation = evaluation.avg ?? 0;
    return games_data
})