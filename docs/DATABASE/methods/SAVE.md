# SAVE(FILENAME)
**Usage:** [`DATABASE.SAVE(FILENAME)`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE.md)

Saves the database onto a file.

### FILENAME
File location for saving the [`DATABASE`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE.md).
Defaults into [`#FILENAME`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/properties/%23FILENAME.md)

## Operation Codes

##### `Code 1`
[`DATABASE`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE.md) saved with no error.

##### `Code -1`
File not specified.

##### `Code -2`
Error on saving file, comes with an error log when accessing to the `.error` property
