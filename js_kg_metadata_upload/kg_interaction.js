import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()
const clientId = process.env.OIDC_CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET


const baseUrl = "https://core.kg.ebrains.eu/v3/"
const authToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLYU01NTRCM2RmMHBIamZYWi1aRl94bUUwMThPS1R0RkNjMjR3aVVqQmFvIn0.eyJleHAiOjE3NTU1OTk2MDIsImlhdCI6MTc1NTU5NzgwMSwiYXV0aF90aW1lIjoxNzU1NTk3ODAwLCJqdGkiOiJlNjYwN2EyZi1lYTA5LTQyZDQtYmFlMS1hMDYxMjA0ZTU2NzgiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsImF1ZCI6WyJqdXB5dGVyaHViIiwibGFiLWpzYyIsInR1dG9yaWFsT2lkY0FwaSIsInh3aWtpIiwianVweXRlcmh1Yi1qc2MiLCJ0ZWFtIiwibGFiLWNpbmVjYSIsInBsdXMiLCJncm91cCJdLCJzdWIiOiI3YWVjMmJmMi04MmM4LTQwYzEtYmQ2NC0xNzNjYWJjZmQ4NDIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJrZyIsInNpZCI6IjU1OGVkMWNiLTEyZDktNDdkNS04YmI4LWNiYTcyNTYzZDYwMyIsInNjb3BlIjoicHJvZmlsZSByb2xlcyBlbWFpbCBvcGVuaWQgZ3JvdXAgY2xiLndpa2kucmVhZCB0ZWFtIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJNYXlhIEtvYmNoZW5rbyIsIm1pdHJlaWQtc3ViIjoiMjM4MDk0NjMyOTI1NTYxNiIsInByZWZlcnJlZF91c2VybmFtZSI6Im1heWFrb2JjaGVua28iLCJnaXZlbl9uYW1lIjoiTWF5YSIsImZhbWlseV9uYW1lIjoiS29iY2hlbmtvIiwiZW1haWwiOiJtYXlhLmtvYmNoZW5rb0BtZWRpc2luLnVpby5ubyJ9.nRymJsmWNxvP9XErnrpYrP5Hr6XI-dwMB-f2dVrG3HCyT99YgenVma9a32cmR6NiTDDK8YXil2kG_Wc09jhe75jfTzM3DmumF8b1OboOwV9NnFf_vV6O4xgkRHrO1L23rfFqcMaKtyn8MNmMPkT7H0At9mCY140tEtu0ibnNSSAxEvm6lCMbgODDqCnsgIsHfZ3DEZdKQzUc6fdysQj2I3oEZUmeS_QrbWh4bKaOkw96JTydjDOu4lHUUl4IVyyZ9qh29WrYojAYzIp6GCE_cXjaQ6Y6QaKGgNSQQuFOLKpdsChtaNa3FyzHFwGJn-U-GCleTGwlD6Bby1FGrrHynQ";

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