import * as z from 'zod'

export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  const userid = getRouterParam(event,'userid');
  const session = await auth().api.getSession({
    headers: event.headers,
  })

  await isTheUserOwner(db,userid!,session,'id');
  
  const schema = z.object({
    nickname: z.string().min(1).max(25)
  })
  const body = await readValidatedBody(event,schema.parse);

  return await db.update(tables.user).set(body);
})
