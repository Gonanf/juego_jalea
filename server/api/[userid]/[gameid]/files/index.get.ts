export default defineEventHandler(async (event) => {
    const userid = getRouterParam(event,"userid")
  const gameid = getRouterParam(event,"gameid")

  return hubBlob().list({
    prefix: `${userid}/${gameid}/files`
  })
})
