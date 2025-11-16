import { avg, desc, inArray, like } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  const query = getQuery(event)
  const games_data = await db.query.event_winners.findMany({
    limit: Number(query.limit) ?? 9,
    offset: Number(query.offset) ? (Number(query.offset) - 1) * (Number(query.limit) ?? 9) : 0,
    orderBy: [desc(tables.games.createdAt)],
    with: {
      game: {
        where: query.search ? like(tables.games.title, `%${query.search}%`) : undefined,
        with: {
          puntuations: true,
          user: true,
          pictures: true,
          categories: {
            with: {
              category: true
            }
          },
          files: true,
          event: true,
        }
      }
    },
    extras: {
      count: db.$count(tables.event_winners).as('')
    }
  })

  // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
  console.log('👷 - games_data:', games_data);

  for (const [index, val] of games_data.entries()) {

    // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
    console.log('👷 - val:', val);
    const [punctuation] = await db.select({ avg: avg(tables.puntuation.puntuation) }).from(tables.puntuation).where(eq(tables.puntuation.game_id, val?.game.id))
    games_data[index].game.punctuation = punctuation.avg ?? 0;
    if (!val.game.event) {
      continue
    }
    const evaluators = db.select().from(tables.user).innerJoin(tables.event_evaluators, and(eq(tables.user.id, tables.event_evaluators.user_id), eq(tables.event_evaluators.event_id, val.game.event?.id))).as('evaluators')
    const [evaluation] = await db.select({ avg: avg(tables.puntuation.puntuation) }).from(tables.puntuation).innerJoin(evaluators, and(eq(tables.puntuation.game_id, val?.game.id), eq(tables.puntuation.user_id, evaluators.user.id)))
    games_data[index].game.evaluation = evaluation.avg ?? 0;
  }
  return { games: games_data, count: await db.$count(tables.event_winners) }
})