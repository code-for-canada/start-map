import os
from airtable import Airtable
from dotenv import load_dotenv
load_dotenv()

BASE_ID = os.getenv("START_AIRTABLE_BASE_ID")
AIRTABLE_API_KEY = os.getenv("START_AIRTABLE_API_KEY")
DATA_TABLE = os.getenv("START_DATA_TABLE")
DATA_TABLE_LINKED_FIELDNAME = os.getenv("START_DATA_TABLE_LINKED_FIELD")
IMG_TABLE = os.getenv("START_OLD_IMAGE_TABLE")
IMG_TABLE_CONTENT_FIELDNAME = os.getenv("START_OLD_IMAGE_TABLE_CONTENT_FIELD")
BASE_URL_IMG_IMPORT = os.getenv("START_BASE_URL_IMG_IMPORT")

airtable = {}
records = {}
for table_name in [DATA_TABLE, IMG_TABLE]:
  print("Fetching records from table: {}".format(table_name))
  airtable[table_name] = Airtable(BASE_ID, table_name, api_key=AIRTABLE_API_KEY)
  records[table_name] = airtable[table_name].get_all()

total_records = len(records[DATA_TABLE])
for i, rec in enumerate(records[DATA_TABLE]):
  count = i + 1
  img_record_ids = rec['fields']['img_code'] if ('img_code' in rec['fields']) else []
  img_codes = []
  for rid in img_record_ids:
    [match] = [r['fields']['Name'] for r in records['imgs'] if r['id'] == rid]
    img_codes.append(match)

  record_update = {
      "id": rec["id"],
      "fields": {
        "images": [{"url": "{}/{}.jpg".format(BASE_URL_IMG_IMPORT, c)} for c in img_codes]
        }
      }
  res = airtable['info'].update(record_update['id'], record_update['fields'])
  print("Updated record {}/{}. Attachments imported from:".format(count, total_records))
  for a in record_update["fields"]["images"]:
    print("- {}".format(a["url"]))
