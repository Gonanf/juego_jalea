import { getServerSession } from "#auth";
import { InsertGames, isTheUserOwner } from "~~/server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  const userid = getRouterParam(event,'userid');
  const session = await getServerSession(event);

  const user = await isTheUserOwner(db,userid!,session);
  
  const formData = await readFormData(event);

  // const gameData = InsertGames.omit({user_id: true}).parse(formData.get('game'));
  return 'Hello Nitro'
})
