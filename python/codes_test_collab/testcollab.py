import requests

token = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLYU01NTRCM2RmMHBIamZYWi1aRl94bUUwMThPS1R0RkNjMjR3aVVqQmFvIn0.eyJleHAiOjE3NTU3ODM3NjYsImlhdCI6MTc1NTc4MTk2NCwiYXV0aF90aW1lIjoxNzU1Nzc2MDg1LCJqdGkiOiJlOGJiZWM2NS02NDI2LTQ1NTctYTVkMC1lMzBjMGIzNDRiMTgiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsImF1ZCI6WyJqdXB5dGVyaHViIiwibGFiLWpzYyIsInR1dG9yaWFsT2lkY0FwaSIsInh3aWtpIiwianVweXRlcmh1Yi1qc2MiLCJ0ZWFtIiwibGFiLWNpbmVjYSIsInBsdXMiLCJncm91cCJdLCJzdWIiOiJiZWQ0NTlmYi0yMmI4LTQ1NDMtOWU4My0zMzllZjEzMTY3MTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJrZyIsInNpZCI6IjMzYjZmMjFmLWYzYTEtNGZhMC05ZDk4LTYwM2U4MGQ2MmY4YyIsInNjb3BlIjoicHJvZmlsZSByb2xlcyBlbWFpbCBvcGVuaWQgZ3JvdXAgY2xiLndpa2kucmVhZCB0ZWFtIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJTb3BoaWEgUGllc2NobmlrIiwibWl0cmVpZC1zdWIiOiI1OTUxNjkyNTA2NDQyODk4IiwicHJlZmVycmVkX3VzZXJuYW1lIjoic3BpZXNjaG5payIsImdpdmVuX25hbWUiOiJTb3BoaWEiLCJmYW1pbHlfbmFtZSI6IlBpZXNjaG5payIsImVtYWlsIjoic29waGlhLnBpZXNjaG5pa0BtZWRpc2luLnVpby5ubyJ9.SMv-c1dVbhxBBOIoPto9zlQaoYVWyAfTfywe1TQOYRCDf_l2x-61qgs-ovPhCHHaNuqbwGH7KRcoKauXsRrZfeKlA5Mjx1Eck3NKAFo30tD6NSuAaNmEUNm7Zgx6iMB8yz190LdC4w_3LlDiVJQumcCw2RxdAgVqURAqYCGvECkCNKZfjIAwcgxAuEbOF84IE-2lH6rBn_IqUzLx_1VusLQR02lwnl4jhIIWnpl2upy5tGfOO-8OFhH6RO_3CESiq3wzipyM0Q6LbTvbWXCGwEf78ESY4Xq9Qn4Qd8crVdPU2gH4tA7dOibavPE-mz-NioQ1P2wa90DZC4DLemzRqg"

def fetch_json_data(url):
    try:
        headers = {'Content-Type': 'application/json',
                   "Authorization": token, 'Accept': '*/*'}
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        json_data = response.json()
        # response_headers = response.headers
        # print("Response Headers:")
        # for key, value in response_headers.items():
        #     print(f"{key}: {value}")
        return json_data

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except requests.exceptions.ConnectionError as conn_err:
        print(f"Connection error occurred: {conn_err}")
    except requests.exceptions.Timeout as timeout_err:
        print(f"Timeout error occurred: {timeout_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"An error occurred: {req_err}")
    except ValueError as json_err:
        print(f"JSON decoding error: {json_err}")

# collab base url: 'https://wiki.ebrains.eu/rest'


collab_base_url = 'https://wiki.ebrains.eu/rest/v1/collabs/d-724d4af0-fe28-4032-8837-120b0d64a81c'

# contact_my_collab_admin = 'https://wiki.ebrains.eu/rest/v1/collabs/d-724d4af0-fe28-4032-8837-120b0d64a81c/contactadministrator'

collab_workshop_url = 'https://wiki.ebrains.eu/rest/v1/collabs/incf-neuroscience-summer-school-2025'

# members_url = "https://wiki.ebrains.eu/rest/v1/identity/units/incf-neuroscience-summer-school-2025"

me_url = 'https://wiki.ebrains.eu/rest/v1/identity/users/mayakobchenko'

collab_admin_url = 'https://wiki.ebrains.eu/rest/v1/collabs/incf-neuroscience-summer-school-2025/team/administrator/users'

collab_editor_url = 'https://wiki.ebrains.eu/rest/v1/collabs/incf-neuroscience-summer-school-2025/team/editor/users'

# /v1/collabs/{collabId}/team/{role}/units
# URL of the JSON endpoint
# url = 'https://core.kg.ebrains.eu/v3/instances/59409fce-c223-431f-bfbe-6de0e3d81b60?stage=IN_PROGRESS'

# url = 'https://core.kg.ebrains.eu/v3/queries/de7e79ae-5b67-47bf-b8b0-8c4fa830348e/instances?stage=IN_PROGRESS&instanceId=54719155-54c7-4456-8987-36b7d5dce071'

# Fetch the JSON data
data = fetch_json_data(collab_admin_url)

# Print the fetched data
if data:
    print(data)
    # print(data['data'])


def put_json_data(url_put):
    try:
        headers = {'Content-Type': 'application/json',
                   "Authorization": token, 'Accept': '*/*'}
        response = requests.put(url_put, headers=headers, timeout=5)
        response_headers = response.headers
        print("Response Headers:")
        for key, value in response_headers.items():
            print(f"{key}: {value}")
        return response.status_code
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")


# add a user
# 'https://wiki.ebrains.eu/rest//v1/collabs/incf-neuroscience-summer-school-2025/team/editor/users/{username}'
put_url = 'https://wiki.ebrains.eu/rest/v1/collabs/incf-neuroscience-summer-school-2025/team/editor/users/mayakobchenko'


put_data = put_json_data(put_url)

# Print the fetched data
if put_data:
    print(put_data)



