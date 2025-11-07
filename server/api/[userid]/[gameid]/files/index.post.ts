import { getServerSession } from "#auth";
import { getUserData } from "~~/server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const userid = getRouterParam(event,'userid');
  const gameid = getRouterParam(event,'gameid');
  const db = useDrizzle()

  //TODO: Add verification for gameid and that exists
  //TODO: Add user verification trought permissions

  const session = await getServerSession(event);
  if (!session || !session.user?.email){
    throw createError({
    statusCode: 400,
    statusMessage: 'User Not Validated',
   })
  }

  const user  = await getUserData(db,session.user.email);

  const data = await getUserData(db,userid!);

  if (data.length == 0 || user.length == 0){
    throw createError({
    statusCode: 404,
    statusMessage: 'User Not Found',
   })
  }

  if (user[0].id !=  data[0].id){
    throw createError({
    statusCode: 400,
    statusMessage: 'User is not the owner',
   })
  }

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
    prefix: `files/${user[0].email}/${gameid}`
  })

})
