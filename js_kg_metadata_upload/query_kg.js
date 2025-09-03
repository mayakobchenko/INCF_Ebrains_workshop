//is this my user id?
//7aec2bf2-82c8-40c1-bd64-173cabcfd842
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { queryKG_DatasetVersion } from './queryKg_DatasetVersion'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const maya_token = process.env.MAYA_EBRAIN_TOKEN
const token_maya = "Bearer " + maya_token

const baseUrl = "https://core.kg.ebrains.eu/v3/"
const datasetId = "4df8c324-af31-4cfc-a8af-a7ebf1d59fa1"
const myHeaders = new Headers()
myHeaders.append("Content-Type", "application/json")
myHeaders.append("Authorization", token_maya)
myHeaders.append("Accept", '*/*')

//get queries
export async function getJSON(url) {
  const response = await fetch(url, { headers: myHeaders })
  if (response.status === 200) {
    return await response.json()
  } else {return {error: response.status}}}

export async function loadKGNode(nodeId) {
  const response = await getJSON(baseUrl + "instances/" + nodeId + "?stage=RELEASED")
    return checkResponse(response)}
  
async function followLinks(node, propertyNames) {
  for (let propertyName of propertyNames) {
    const propertyPath = `https://openminds.ebrains.eu/vocab/${propertyName}`
    let uri
    if (Array.isArray(node[propertyPath]))
    {uri = node[propertyPath][0]["@id"]}
    else {uri = node[propertyPath]["@id"]}
    const uuid = uri.split("/").slice(-1)[0]
    const linkedNode = await loadKGNode(uuid)
    node[propertyPath] = linkedNode}}    

function checkResponse(response) {
  if (response.error) {
    if (response.error === 401) {
      throw new Error("You are not authenticated. Perhaps your token has expired?");
    } else {throw new Error("Error. Status code " + response.error)}
    } else { return response.data }}    