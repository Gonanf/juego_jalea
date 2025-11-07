// import { getServerSession } from "#auth";
import { getUserData } from "~~/server/utils/drizzle";

export default defineEventHandler(async (event) => {
  return 'in progress';
  const userid = getRouterParam(event,'userid');
  const gameid = getRouterParam(event,'gameid');
  const db = useDrizzle()

  //TODO: Add verification for gameid and that exists
  //TODO: Add user verification trought permissions

/*     const session = await getServerSession(event);
  
    const user = await isTheUserOwner(db,userid!,session); */

  const body = await readFormData(event);
  const file = body.get('file') as File
  
  if (!file || !file.size) {
  throw createError({
    statusCode: 400,
    statusMessage: 'File not provider',
   })
  }

  //TODO: Change this into permission
  ensureBlob(file, {
    maxSize: '1GB',
  })

  return hubBlob().put(file.name, file, {
    addRandomSuffix: false,
    prefix: `files/${user.email}/${gameid}`
  })

})
