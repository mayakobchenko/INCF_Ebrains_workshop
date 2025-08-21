import pandas as pd
import json


file_path = 'user_accounts.xlsx'
df = pd.read_excel(file_path)

names_list = [
    {
        'First name': row['First name'],
        'Last name': row['Last name'],
        'email': row['email']
    }
    for index, row in df.iterrows()
]

# Print the resulting list nicely
print(names_list)
emails_list = [row['email'] for index, row in df.iterrows()]  # list

print(json.dumps(names_list, indent=4))
# Print the resulting dictionary
print(len(names_list))
print(len(emails_list))
print(len(set(emails_list)))


def find_duplicates(lst):
    seen = set()
    duplicates = set()

    [duplicates.add(x) if x in seen else seen.add(x) for x in lst]

    return list(duplicates)


# Example usage
my_list = [1, 2, 3, 4, 5, 1, 3, 2]
duplicates = find_duplicates(emails_list)
print(duplicates)
