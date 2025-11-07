export default defineEventHandler(async (event) => {
  const userid = getRouterParam(event,"userid")
  const gameid = getRouterParam(event,"gameid")
  const file = getRouterParam(event,"file")

  //TODO: Send placeholder if not found

  return hubBlob().get(`pictures/${userid}/${gameid}/${file}`)
})
