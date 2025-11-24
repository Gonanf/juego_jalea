import { DrizzleD1Database } from "drizzle-orm/d1";
import { WhereNode } from "kysely";
import * as z from "zod";

export async function postGame(
  formData: FormData,
  db: DrizzleD1Database<_>,
  session: any,
  game: any,
  request: URL,
  mode?: "update",
) {
  //TODO: Revise performance
  const body: Record<string, any> = Object.fromEntries(formData.entries());
  body.pictures = formData.getAll("pictures").filter((f) => f instanceof File);
  body.categories = body.categories ? body.categories.split(",") : [];
  body.files = formData.getAll("files").filter((f) => f instanceof File);
  body.file_types = formData.getAll("file_types");
  body.file_names = formData.getAll("file_names");
  body.price = Number(formData.get("price") ?? 0);
  body.user_id = String(session.user.id);

  if (
    body.event_id &&
    !db.query.events.findFirst({ where: eq(tables.events.id, body.event_id) })
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Event not found",
    });
  }
  const prepared_url = `${request.protocol}//${request.host}/api/${session.user.nickname}`;
  // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
  console.log("👷 - body:", body);

  //TODO: allow event id again once i fix this
  const parsed = InsertGames.extend({
    cover: z
      .file()
      .max(1024 * 1024)
      .optional(),
    pictures: z.array(z.file().max(2048 * 2048)).optional(),
    categories: z.array(z.string()).optional(),
    files: z.array(z.file().max(1000000000).min(1)).max(5).optional(),
    file_types: z.array(z.enum(["windows", "linux", "source"])).optional(),
    file_names: z.array(z.string().max(50)).optional(),
  }).parse(body);

  const {
    cover,
    pictures,
    categories,
    files,
    file_types,
    file_names,
    ...gameData
  } = parsed;
  if (cover)
    await hubBlob().put(
      `${session.user.nickname}/${parsed.title}/pictures/${cover.name}`,
      cover,
    );

  let result;
  if (!mode) {
    result = await createGame(
      gameData,
      `${prepared_url}/${parsed.title}/pictures/${cover?.name}`,
      db,
    );
  } else {
    result = await editGame(
      gameData,
      `${prepared_url}/${parsed.title}/pictures/${cover?.name}`,
      session,
      db,
      game.id,
    );
  }

  // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
  console.log("👷 - res:", result.insertedId);

  for (const image of pictures ?? []) {
    await hubBlob().put(
      `${session.user.nickname}/${parsed.title}/pictures/${image.name}`,
      image,
    );
    await db.insert(tables.pictures).values({
      picture_url: `${prepared_url}/${parsed.title}/pictures/${image.name}`,
      game_id: result.insertedId,
    });
  }

  for (const cat of categories ?? []) {
    console.log("cat:", cat);
    if (
      !db.query.categories.findFirst({
        where: eq(tables.categories.id, cat),
      })
    ) {
      continue;
    }
    await db
      .insert(tables.game_categories)
      .values({ category_id: cat, game_id: result.insertedId });
  }

  for (const [index, value] of files?.entries() ?? []) {
    const type = file_types ? file_types[index] : [];
    const name = file_names ? file_names[index] : [];
    if (!type || !name) continue;
    await hubBlob().put(
      `${session.user.nickname}/${parsed.title}/files/${value.name}`,
      value,
    );
    await db.insert(tables.game_files).values({
      type: type!,
      name: name!,
      link: `${prepared_url}/${parsed.title}/files/${value.name}`,
      game_id: result.insertedId,
    });
  }

  return result;
}

async function createGame(
  gameData: any,
  cover: string,
  db: DrizzleD1Database<_>,
) {
  const [res] = await db
    .insert(tables.games)
    .values({
      ...gameData,
      cover,
    })
    .returning({ insertedId: tables.games.id });

  return res;
}

async function editGame(
  gameData: any,
  cover: string,
  db: DrizzleD1Database<_>,
  session: any,
  gameid: string,
) {
  const [res] = await db
    .update(tables.games)
    .set({
      ...gameData,
      cover,
    })
    .where(
      and(
        eq(tables.games.id, gameid),
        eq(tables.games.user_id, session.user.id),
      ),
    )
    .returning({ insertedId: tables.games.id });

  return res;
}

export async function deleteGameData(gameid: string, db: DrizzleD1Database<_>) {
  await db.delete(tables.pictures).where(eq(tables.pictures.game_id, gameid));

  await db
    .delete(tables.game_categories)
    .where(eq(tables.game_categories.game_id, gameid));

  await db
    .delete(tables.game_files)
    .where(eq(tables.game_files.game_id, gameid));
}

export async function deleteGamePunctuations(
  gameid: string,
  db: DrizzleD1Database<_>,
) {
  await db
    .delete(tables.puntuation)
    .where(eq(tables.puntuation.game_id, gameid));
}
