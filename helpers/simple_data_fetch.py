# end points
# https://wiki.ebrains.eu/bin/download/Collabs/the-collaboratory/Documentation%20Wiki/API/WebHome/openapi.json?rev=1.2
# https://wiki.ebrains.eu/bin/view/Collabs/the-collaboratory/Documentation%20Wiki/API/
import requests
import json

token = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLYU01NTRCM2RmMHBIamZYWi1aRl94bUUwMThPS1R0RkNjMjR3aVVqQmFvIn0.eyJleHAiOjE3NTU4MDY0NDYsImlhdCI6MTc1NTgwNDY0NSwiYXV0aF90aW1lIjoxNzU1NTk3ODAwLCJqdGkiOiIwZTFiMjlhZC00YmE2LTRiYTktODliMi00NTEwZmM2ZWQwOTEiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsImF1ZCI6WyJqdXB5dGVyaHViIiwibGFiLWpzYyIsInR1dG9yaWFsT2lkY0FwaSIsInh3aWtpIiwianVweXRlcmh1Yi1qc2MiLCJ0ZWFtIiwibGFiLWNpbmVjYSIsInBsdXMiLCJncm91cCJdLCJzdWIiOiI3YWVjMmJmMi04MmM4LTQwYzEtYmQ2NC0xNzNjYWJjZmQ4NDIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJrZyIsInNpZCI6IjU1OGVkMWNiLTEyZDktNDdkNS04YmI4LWNiYTcyNTYzZDYwMyIsInNjb3BlIjoicHJvZmlsZSByb2xlcyBlbWFpbCBvcGVuaWQgZ3JvdXAgY2xiLndpa2kucmVhZCB0ZWFtIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJNYXlhIEtvYmNoZW5rbyIsIm1pdHJlaWQtc3ViIjoiMjM4MDk0NjMyOTI1NTYxNiIsInByZWZlcnJlZF91c2VybmFtZSI6Im1heWFrb2JjaGVua28iLCJnaXZlbl9uYW1lIjoiTWF5YSIsImZhbWlseV9uYW1lIjoiS29iY2hlbmtvIiwiZW1haWwiOiJtYXlhLmtvYmNoZW5rb0BtZWRpc2luLnVpby5ubyJ9.iq1MF_2RwA_IhwsqyO3kudNmKXO9zssX02SIu12bVCcuh2rpRUD4WxBAZUB_ueLNnkz6pC5aWjSNsjK_KhkPZdukdlYsYMpV1toOb3XpoqyfMAMlKS_hTcqUbskxfan-bdKRHGs589VS7LpqLc35UWHCvGURLQfZLG0yxPXOqrJ4Wh2xUiTvPz2ILv8OdfKl5Mq8qoIJd1RyF-trDdS_wmS_AxRPU5VyBRcbB85nWgVFqw31llDlXEYw-va2yUrjo2CaukD3unj428W32H9D5ApMMBt3P7-XiadHP8W2Frs51H3pUXLDMyEcyAupMnR0kko-O6a36HQh0xv-fwR3kg"


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
# collab_base_url = 'https://wiki.ebrains.eu/rest/v1/collabs/d-724d4af0-fe28-4032-8837-120b0d64a81c'
# contact_my_collab_admin = 'https://wiki.ebrains.eu/rest/v1/collabs/d-724d4af0-fe28-4032-8837-120b0d64a81c/contactadministrator'
# collab_workshop_url = 'https://wiki.ebrains.eu/rest/v1/collabs/incf-neuroscience-summer-school-2025'
# members_url = "https://wiki.ebrains.eu/rest/v1/identity/units/incf-neuroscience-summer-school-2025"
# me_url = 'https://wiki.ebrains.eu/rest/v1/identity/users/mayakobchenko'
# collab_admin_url = 'https://wiki.ebrains.eu/rest/v1/collabs/d-724d4af0-fe28-4032-8837-120b0d64a81c/team/administrator/users'
workshop_collab_editor_url = 'https://wiki.ebrains.eu/rest/v1/collabs/incf-neuroscience-summer-school-2025/team/editor/users'
my_collab_editor_url = 'https://wiki.ebrains.eu/rest/v1/collabs/d-724d4af0-fe28-4032-8837-120b0d64a81c/team/editor/users'

# /v1/collabs/{collabId}/team/{role}/units
# URL of the JSON endpoint
# url = 'https://core.kg.ebrains.eu/v3/instances/59409fce-c223-431f-bfbe-6de0e3d81b60?stage=IN_PROGRESS'
# url = 'https://core.kg.ebrains.eu/v3/queries/de7e79ae-5b67-47bf-b8b0-8c4fa830348e/instances?stage=IN_PROGRESS&instanceId=54719155-54c7-4456-8987-36b7d5dce071'

data_workshop = fetch_json_data(workshop_collab_editor_url)
data_my_collab = fetch_json_data(my_collab_editor_url)
if data_workshop:
    print('amount of users in workshop collab:')
    print(len(data_workshop))
    # print(json.dumps(data, indent=4))
if data_my_collab:
    print('amount of users in my collab:')
    print(len(data_my_collab))

users_my_collab = [
    {
        "firstName": user["firstName"],
        "lastName": user["lastName"],
        "username": user["username"]
    }
    for user in data_my_collab
]
users_workshop_collab = [
    {
        "firstName": user["firstName"],
        "lastName": user["lastName"],
        "username": user["username"]
    }
    for user in data_workshop
]
# Print the filtered response
# for item in users_my_collab:
# print(json.dumps(item, indent=4))

# with open('users_workshop_collab.json', 'r') as json_file:
#     data_json_file = json.load(json_file)
# data_incf_collab = [
#     {
#         "firstName": user["firstName"],
#         "lastName": user["lastName"],
#         "username": user["username"]
#     }
#     for user in data_json_file
# ]

are_identical = users_my_collab == users_workshop_collab
print("Are the lists identical?", are_identical)

set1 = set(json.dumps(d, sort_keys=True) for d in users_my_collab)
set2 = set(json.dumps(d, sort_keys=True) for d in users_workshop_collab)
only_in_my = set1 - set2
only_in_workshop = set2 - set1
print("Items in list1 but not in list2:")
for item in only_in_my:
    print(json.loads(item))
print("\nItems in list2 but not in list1:")
for item in only_in_workshop:
    print(json.loads(item))


def put_json_data(url_put):
    try:
        headers = {'Content-Type': 'application/json',
                   "Authorization": token, 'Accept': '*/*'}
        response = requests.put(url_put, headers=headers, timeout=5)
        # response_headers = response.headers
        # print("Response Headers:")
        # for key, value in response_headers.items():
        # print(f"{key}: {value}")
        return response.status_code
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")


# add a user
# 'https://wiki.ebrains.eu/rest//v1/collabs/incf-neuroscience-summer-school-2025/team/editor/users/{username}'
put_url = 'https://wiki.ebrains.eu/rest/v1/collabs/collabs/d-724d4af0-fe28-4032-8837-120b0d64a81c/team/editor/users/zahra'

search_people = 'https://wiki.ebrains.eu/rest/v1/identity/users'
find_user = 'https://wiki.ebrains.eu/rest/v1/identity/users/mayakobchenko/email'
data = fetch_json_data(find_user)

# Print the fetched data
if data:
    print(data)
