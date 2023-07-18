# WATCH(FILENAME)
**Usage:** [`DATABASE.WATCH(FILENAME)`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE.md)

Watches for any change on the JSON file specified and updates [`#DATA`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/properties/%23DATA.md) and [`#COLUMNS`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/properties/%23COLUMNS.md) based of that data
## FILENAME
JSON file directory and name formatted with NeedleDB, defaults [`#FILENAME`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/properties/%23FILENAME.md)
  
## Operation Codes

### `Code 1`
Watch operation started with no error. (unexistent files may return code 1)

### `Code -1`
File not specified.
