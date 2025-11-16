import { avg } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const db = useDrizzle()
    const game_data = await db.query.user.findFirst({
        where: eq(tables.user.nickname,getRouterParam(event,'userid')!),
        with: {
            games: {
                with: {
          puntuations: true,
          pictures: true,
          categories: {
            with: {
              category: true
            }
          },
          files: true,
          event: true,
        }
            },
            puntuations: true,
            library: true
        }
    })

    for (const [index, val] of game_data.games.entries()) {
    
        // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
        console.log('👷 - val:', val);
                const [punctuation] = await db.select({ avg: avg(tables.puntuation.puntuation) }).from(tables.puntuation).where(eq(tables.puntuation.game_id, val?.id))
        game_data.games[index].punctuation = punctuation.avg ?? 0;
        if (!val.event) {
          continue
        }
        const evaluators = db.select().from(tables.user).innerJoin(tables.event_evaluators, and(eq(tables.user.id, tables.event_evaluators.user_id), eq(tables.event_evaluators.event_id, val.event?.id))).as('evaluators')
        const [evaluation] = await db.select({ avg: avg(tables.puntuation.puntuation) }).from(tables.puntuation).innerJoin(evaluators, and(eq(tables.puntuation.game_id, val?.id), eq(tables.puntuation.user_id, evaluators.user.id)))
        game_data.games[index].evaluation = evaluation.avg ?? 0;
      }
    
      return game_data
})