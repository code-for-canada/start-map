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

airtable = {}
records = {}
for table_name in [DATA_TABLE, IMG_TABLE]:
  airtable[table_name] = Airtable(BASE_ID, table_name, api_key=AIRTABLE_API_KEY)
  records[table_name] = airtable[table_name].get_all()

for i, rec in enumerate(records[DATA_TABLE]):
  img_record_ids = rec['fields']['img_code'] if ('img_code' in rec['fields']) else []
  print(img_record_ids)
  img_codes = []
  for rid in img_record_ids:
    [match] = [r['fields']['Name'] for r in records['imgs'] if r['id'] == rid]
    img_codes.append(match)

  record_update = {
      "id": rec["id"],
      "fields": {
        "images": [{"url": "https://start-map-demo-images2.s3.amazonaws.com/{}.jpg".format(c)} for c in img_codes]
        }
      }
  res = airtable['info'].update(record_update['id'], record_update['fields'])
  print(res)
