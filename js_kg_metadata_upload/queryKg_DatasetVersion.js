import checkResponse from basic_fetch_kg.js
  
    
export async function postQuery(url, queryObj) {
  const config = {
    headers: myHeaders ,
    method: "POST",
    body: JSON.stringify(queryObj)
  }
  const response = await fetch(url, config)
  if (response.status === 200) {
    return await response.json()
  } else {
    return {error: response.status}}}

export async function queryKG_DatasetVersion(searchTerm) {
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
