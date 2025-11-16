import type { AsyncDataRequestStatus } from "#app";

export function hasUsername(session) {

// TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
console.log('👷 - session:', session.value);
  if (!session.value.data || !session.value.data.user){
    return true;
  }

  if (!session.value.data.user.nickname){
    return navigateTo({name: 'userid-complete', params: {userid: session.value.data.user.id}})
  }

  return true;
}

export function isTheUserOwner(session,userid){
  console.log(session,userid)
  if (!session.value.data){
    throw createError({
    statusCode: 404,
    message: 'Not autenticated',
    fatal: true
    })
  }

  if (session.value.data.user.id != userid && session.value.data.user.nickname != userid && session.value.data.user.email != userid){
     throw createError({
    statusCode: 404,
    message: 'Not the correct user',
    fatal: true
    })
  }

  return true;
}
