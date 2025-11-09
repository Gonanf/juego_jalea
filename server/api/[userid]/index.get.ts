import * as z from 'zod'


export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  const userid = getRouterParam(event,'userid');
  const user = await getUserData(db,userid!,'nickname');
  
  

  return await db.query.user.findFirst({
    where: eq(tables.user.id,user.id),
    with:{
      games: true
    }
    
  });
})
