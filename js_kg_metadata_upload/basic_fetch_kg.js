
const baseUrl = "https://core.kg.ebrains.eu/v3/"

export function checkResponse(response) {
  if (response.error) {
    if (response.error === 401) {
      throw new Error("You are not authenticated. Perhaps your token has expired?");
    } else {throw new Error("Error. Status code " + response.error)}
    } else { return response.data }}  