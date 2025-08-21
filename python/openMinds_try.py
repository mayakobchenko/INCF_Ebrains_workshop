from datetime import date
from openminds import Collection, IRI
import openminds.latest.core as omcore

# Create an empty metadata collection

collection = Collection()

# Create some metadata

mgm = omcore.Organization(
    full_name="Metro-Goldwyn-Mayer Studios, Inc.",
    short_name="MGM",
    homepage=IRI("https://www.mgm.com")
)

stan = omcore.Person(
    given_name="Stan",
    family_name="Laurel",
    affiliations=omcore.Affiliation(member_of=mgm, start_date=date(1942, 1, 1))
)

ollie = omcore.Person(
    given_name="Oliver",
    family_name="Hardy",
    affiliations=omcore.Affiliation(member_of=mgm, start_date=date(1942, 1, 1))
)

# Add the metadata to the collection

collection.add(stan, ollie, mgm)

# Check the metadata are valid

failures = collection.validate()

# Save the collection in a single JSON-LD file

collection.save("my_collection.jsonld")

# Save each node in the collection to a separate file

# creates files within the 'my_collection' directory
collection.save("my_collection", individual_files=True)

# Load a collection from file
new_collection = Collection()
new_collection.load("my_collection.jsonld")
