import { InsertGames, isTheUserOwner } from "~~/server/utils/drizzle";
import * as z from 'zod'
import { auth } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  const userid = getRouterParam(event,'userid');
  const session = await auth().api.getSession({
    headers: event.headers,
  })

  const user = await isTheUserOwner(db,userid!,session,'nickname');
  
  const formData = await readFormData(event);
  const body = Object.fromEntries(formData.entries());
  body.pictures = formData.getAll('pictures')
  body.categories = formData.getAll('categories')
  body.price = Number(body.price)
  body.user_id = user.id

  if (body.event_id && !db.query.events.findFirst({where: eq(tables.events.id,body.event_id)})){
    throw createError({
      statusCode: 400,
      statusMessage: 'Event not found',
    })
  }

  const request = getRequestURL(event)
  const prepared_url = `${request.protocol}//${request.host}/api/${userid}`
  // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
  console.log('👷 - formData:', body);

  //TODO: allow event id again once i fix this
  const parsed = InsertGames.extend({cover: z.file().max(1024*1024).optional(), pictures: z.array(z.file().max(2048*2048)).optional(), categories: z.array(z.string()).optional()}).parse(body);

  const {cover, pictures, categories, ...gameData} = parsed
  if (cover) await hubBlob().put(`${user.id}/${parsed.title}/pictures/${cover.name}`,cover)

  const [res] = await db.insert(tables.games).values({...gameData, cover: `${prepared_url}/${parsed.title}/pictures/${cover?.name}`}).returning({ insertedId: tables.games.id });

  // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
  console.log('👷 - res:', res.insertedId);
  
  for (const image of pictures??[]){
    await hubBlob().put(`${userid}/${parsed.title}/pictures/${image.name}`,image)
    await db.insert(tables.pictures).values({picture_url: `${prepared_url}/${parsed.title}/pictures/${image.name}`,game_id: res.insertedId})
  }

  for (const cat of categories??[]){
    await db.insert(tables.game_categories).values({category_id: cat, game_id: res.insertedId})
  }
  
  return res;
})
