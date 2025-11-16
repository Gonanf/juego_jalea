import { avg } from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const db = useDrizzle()

    //TODO: Make a util that automatically trims the spaces
let userid = getRouterParam(event,'userid')
    userid = userid?.replaceAll('%20',' ')

    const user = await db.query.user.findFirst({
        where: eq(tables.user.nickname, getRouterParam(event, 'userid')!)
    })

    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found'
        })
    }

    let gameid = getRouterParam(event,'gameid')
    gameid = gameid?.replaceAll('%20',' ')

    const games_data = await db.query.games.findFirst({
        where: and(eq(tables.games.user_id, user?.id!), eq(tables.games.title, gameid)),
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
    })

    if (!games_data) {
        throw createError({
            statusCode: 404,
            statusMessage: 'The game was not found'
        })
    }
    if (games_data?.event) {
        const evaluators = db.select().from(tables.user).innerJoin(tables.event_evaluators, and(eq(tables.user.id, tables.event_evaluators.user_id), eq(tables.event_evaluators.event_id, games_data?.event?.id))).as('evaluators')
        const [evaluation] = await db.select({ avg: avg(tables.puntuation.puntuation) }).from(tables.puntuation).innerJoin(evaluators, and(eq(tables.puntuation.game_id, games_data?.id), eq(tables.puntuation.user_id, evaluators.user.id)))
        games_data.evaluation = evaluation.avg ?? 0;
    }
    const [punctuation] = await db.select({ avg: avg(tables.puntuation.puntuation) }).from(tables.puntuation).where(eq(tables.puntuation.game_id, games_data?.id))
    games_data.punctuation = punctuation.avg ?? 0;

    return games_data
})