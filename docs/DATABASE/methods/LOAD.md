# LOAD(FILENAME)
**Usage:** [`DATABASE.LOAD(FILENAME)`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE.md)

Loads specified file content into [`DATABASE`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE.md)

### FILENAME
File location for loading the [`DATABASE`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE.md). Defaults into [`#FILENAME`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/properties/%23FILENAME.md)

## Operation Codes

##### `Code 1`
[`DATABASE`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE.md) loaded with no error.

##### `Code -1`
Error on loading file, comes with an error log when accessing to the `.error` property

##### `Code -2`
No file specified

