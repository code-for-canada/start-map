# Airtable Migrations

This Python script is used to migrate Airtable from having two tables ("info"
and "imgs") connected by reference fields, to having a single "info" table with
images stored as attachments.

## Setup

Requirements: Install `python` and `pip`. (not documented here)

```
pip install pipenv
pipenv install
# Copy and edit config file.
cp sample.env .env
```

## Running script

Before running the script, create a new field in the `info` table called
`images` and ensure it's of type "attachment". This is where the images will be imported.

```
pipenv run python migrate-airtable.py 
```

After the migration runs successfully, you should see the images slowly show up
in the Airtable UI. When you're satisfied, you may remove
- the `img_code` column from the `info` table, and
- the whole `imgs` table.

## Trial run

Though Airtable keeps history for reversion, running a migration is something
that you may want to test first. Here's how:

1. Visit https://airtable.com/ and sign in
2. Find the base you'd like to work on.
3. Click the "down arrow" and then "Duplicate base", in the popup:
    - any workspace will work as destination
    - Duplicated records: YES
4. Rename the base to ensure you can tell it apart.
5. Click the new duplicate base to enter.
6. Click "Help" in top-right, then "API documentation"
7. Note the "base ID" in the URL. (e.g., For a url `https://airtable.com/appxPXKHJxmVgAGzE/api/docs`, the base ID is `appxPXKHJxmVgAGzE`.)
8. Check the box to "show API key" (top-right).
9. Go to "Authentication" section and note the `api_key` in format `keyXXXXXXXXXXXXXX`
10. Use these two values in the `.env` file.
11. Follow the directions in the "Running script" section above.
