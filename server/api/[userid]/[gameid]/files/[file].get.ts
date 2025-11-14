export default defineEventHandler(async (event) => {
  //TODO: Administer view permission with paid and library system
  const userid = getRouterParam(event, "userid");
  const gameid = getRouterParam(event, "gameid");
  const file = getRouterParam(event, "file");

  return hubBlob().get(`${userid}/${gameid}/files/${file}`);
});
