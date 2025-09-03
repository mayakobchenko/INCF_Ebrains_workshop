import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()
const clientId = process.env.OIDC_CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET


const baseUrl = "https://core.kg.ebrains.eu/v3/"
const authToken = "";

const globalConfig = {
  headers: {
    Authorization: `Bearer ${authToken}`,
    },
}
  
async function getJSON(url) {
  response = await fetch(url, globalConfig)
  if (response.status === 200) {
    return await response.json()
  } else {
    return {
      error: response.status
    }}}

async function postJSON(url, queryObj) {
  const config = {
    ...globalConfig,
    method: "POST",
    body: JSON.stringify(queryObj)}
  config.headers["Content-Type"] = "application/json"
  response = await fetch(url, config)
  if (response.status === 200) {
    return await response.json()
  } else {
    return {
      error: response.status
        }
    }
}
    
function checkResponse(response) {
  if (response.error) {
    if (response.error === 401) {
      throw new Error("You are not authenticated. Perhaps your token has expired?");
    } else {
      throw new Error("Error. Status code " + response.error);
    }
  } else {
    return response.data;
  }
}

async function loadKGNode(nodeId) {
  response = await getJSON(
    baseUrl + "instances/" + nodeId + "?stage=RELEASED"
  );
  return checkResponse(response);
}

async function saveKGNode(node) {
  response = await postJSON(
    baseUrl + "instances/?space=myspace",
    node
  );
  return checkResponse(response);
}

async function followLinks(node, propertyNames) {
  /*
    For the given list of property names, we get the link URI from the node,
    extract the UUID from the URI, then use this to retrieve the linked node from the KG.
    We then replace the original property in the node object
    with the linked node that we've retrieved.
  */
  for (let propertyName of propertyNames) {
    const propertyPath = `https://openminds.ebrains.eu/vocab/${propertyName}`;
    const uri = node[propertyPath]["@id"];
    const uuid = uri.split("/").slice(-1)[0];
    const linkedNode = await loadKGNode(uuid);
    node[propertyPath] = linkedNode;
  }
}