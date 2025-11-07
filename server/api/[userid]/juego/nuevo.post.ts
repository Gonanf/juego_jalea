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
  body.price = Number(body.price)
  body.user_id = user.id

  const request = getRequestURL(event)
  const prepared_url = `${request.protocol}//${request.host}/api/${userid}`
  // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
  console.log('👷 - formData:', body);

  //TODO: allow event id again once i fix this
  const parsed = InsertGames.omit({event_id: true}).extend({cover: z.file().max(1024*1024).optional(), pictures: z.array(z.file().max(2048*2048)).optional()}).parse(body);

  //TODO: Account for categories
  const {cover, pictures, ...gameData} = parsed
  if (cover) await hubBlob().put(`${user.id}/${parsed.title}/pictures/${cover.name}`,cover)

  const [res] = await db.insert(tables.games).values({...gameData, cover: `${prepared_url}/${parsed.title}/pictures/${cover?.name}`}).returning({ insertedId: tables.games.id });

  // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
  console.log('👷 - res:', res.insertedId);
  
  for (const image of pictures??[]){
    await hubBlob().put(`${userid}/${parsed.title}/pictures/${image.name}`,image)
    await db.insert(tables.pictures).values({picture_url: `${prepared_url}/${parsed.title}/pictures/${image.name}`,game_id: res.insertedId})
  }
  

  return res;
})
