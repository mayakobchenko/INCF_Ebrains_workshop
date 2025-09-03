//https://github.com/apdavison/ebrains-kg-tutorial-javascript
//is this my user id?
//7aec2bf2-82c8-40c1-bd64-173cabcfd842
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const maya_token = process.env.MAYA_EBRAIN_TOKEN
const token_maya = "Bearer " + maya_token

const baseUrl = "https://core.kg.ebrains.eu/v3/"
const datasetId = "4df8c324-af31-4cfc-a8af-a7ebf1d59fa1"
//const url = baseUrl + "instances/" + datasetId + "?stage=RELEASED"
const myHeaders = new Headers()
myHeaders.append("Content-Type", "application/json")
myHeaders.append("Authorization", token_maya)
myHeaders.append("Accept", '*/*')

export async function getJSON(url) {
  const response = await fetch(url, { headers: myHeaders })
  if (response.status === 200) {
    return await response.json()
  } else {
    return {error: response.status}}
}

export async function loadKGNode(nodeId) {
  const response = await getJSON(baseUrl + "instances/" + nodeId + "?stage=RELEASED")
  return checkResponse(response)
}

async function saveKGNode(node) {
  const response = await postQuery(baseUrl + "instances/?space=myspace", node)
  return checkResponse(response)
}

async function followLinks(node, propertyNames) {
  for (let propertyName of propertyNames) {
    const propertyPath = `https://openminds.ebrains.eu/vocab/${propertyName}`
    let uri
    if (Array.isArray(node[propertyPath]))
    {uri = node[propertyPath][0]["@id"]}
    else {uri = node[propertyPath]["@id"]}
    const uuid = uri.split("/").slice(-1)[0]
    const linkedNode = await loadKGNode(uuid)
    node[propertyPath] = linkedNode
  }
}

function checkResponse(response) {
  if (response.error) {
    if (response.error === 401) {
      throw new Error("You are not authenticated. Perhaps your token has expired?");
    } else {
      throw new Error("Error. Status code " + response.error)}
    } else { return response.data }
}
  
async function postQuery(url, queryObj) {
  const config = {
    headers: myHeaders ,
    method: "POST",
    body: JSON.stringify(queryObj)
  }
  const response = await fetch(url, config)
  if (response.status === 200) {
    return await response.json()
  } else {
    return {error: response.status}
  }
}

async function queryKG(searchTerm) {
  const query = {
    "@context": {
      "@vocab": "https://core.kg.ebrains.eu/vocab/query/",
      query: "https://schema.hbp.eu/myTrialQuery/",
      propertyName: {
        "@id": "propertyName",
        "@type": "@id",
      },
      path: {
        "@id": "path",
        "@type": "@id",
      },
    },
    meta: {
      type: "https://openminds.ebrains.eu/core/DatasetVersion",
      responseVocab: "https://schema.hbp.eu/myTrialQuery/",
    },
    structure: [
      {
        propertyName: "query:fullName",
        path: [{"@id": "https://openminds.ebrains.eu/vocab/hasVersion",
                "reverse": true},
                "https://openminds.ebrains.eu/vocab/fullName"],
        required: true,
        filter: {
          op: "CONTAINS",
          value: searchTerm,
        },
      },
      {
        propertyName: "query:versionIdentifier",
        path: "https://openminds.ebrains.eu/vocab/versionIdentifier",
      },
      {
        "propertyName": "query:digitalIdentifier",
        "path": "https://openminds.ebrains.eu/vocab/digitalIdentifier",
        "structure": {
            "propertyName": "query:identifier",
            "path": "https://openminds.ebrains.eu/vocab/identifier"
        }
      },
      {
        "propertyName": "query:repository",
        "path": "https://openminds.ebrains.eu/vocab/repository",
        "structure": [
            {
            "propertyName": "query:name",
            "path": "https://openminds.ebrains.eu/vocab/name"
            },
            {
            "propertyName": "query:IRI",
            "path": "https://openminds.ebrains.eu/vocab/IRI"
            }
        ]
      },
      {
        propertyName: "query:experimentalApproach",
        path: "https://openminds.ebrains.eu/vocab/experimentalApproach",
      },
      {
        propertyName: "query:releaseDate",
        path: "https://openminds.ebrains.eu/vocab/releaseDate",
      },
    ],
  }
  const response = await postQuery(baseUrl + "queries/?stage=RELEASED&restrictToSpaces=dataset&size=10", query)
  return checkResponse(response)
}

async function queryPeople() {
  const query = {
    "@context": {
      "@vocab": "https://core.kg.ebrains.eu/vocab/query/",
      query: "https://schema.hbp.eu/myTrialQueryPeople/",
      propertyName: {
        "@id": "propertyName",
        "@type": "@id",
      },
      path: {
        "@id": "path",
        "@type": "@id",
      },
    },
    meta: {
      type: "https://openminds.ebrains.eu/core/Person",
      responseVocab: "https://schema.hbp.eu/myTrialQueryPeople/",
    },
    structure: [
      {
        propertyName: "query:givenName",
        path: "https://openminds.ebrains.eu/vocab/givenName",
      },
      {
        propertyName: "query:familyName",
        path: "https://openminds.ebrains.eu/vocab/familyName",
      },
      {
        propertyName: "query:user",
        path: "https://core.kg.ebrains.eu/vocab/meta/user",
        },
      {

        }
    ],
  };
  const response = await postQuery(baseUrl + "queries/?stage=IN_PROGRESS&restrictToSpaces=myspace&size=10", query)
  return checkResponse(response)
}

const givenName = "Maya_try"
const familyName = "Kobchenko_try"
const person = {
    "@type": ["https://openminds.ebrains.eu/core/Person"],
    "https://openminds.ebrains.eu/vocab/givenName": givenName,
    "https://openminds.ebrains.eu/vocab/familyName": familyName
}
    
const searchTerm = "Alzheimer"
try {
    //const datasetVersion = await loadKGNode(datasetId)
    //await followLinks(datasetVersion, ["accessibility", "digitalIdentifier", "studyTarget", "dataType"])
    //console.log(datasetVersion)
    //const personWithId = await saveKGNode(person)
    //console.log(personWithId)
    //const datasetVersions = await queryKG(searchTerm)
    //console.log(JSON.stringify(datasetVersions, null, 2))
    const people_mypace = await queryPeople()
    console.log(JSON.stringify(people_mypace , null, 2))
    //console.log(datasetVersions)
} catch (error) {
    console.error(error.message)
}
    
//44221f80-af27-43b8-ba2e-9fc7d04c3dfb
//4498f836-2de3-4b41-b7f1-62c77e0510b2