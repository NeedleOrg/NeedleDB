# DATABASE

Main database class, has multiple child functions and all of its values are set to private.

**Usage:** `const myDB = new require('needle-db')(FILENAME, AUTOSAVE)`

Method documentation at: [**METHODS**](https://github.com/NeedleChat/NeedleDB/tree/docs/docs/DATABASE/methods)

## FILENAME

Property used when creating a new Database, used for setting the [`#FILENAME`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/properties/%23FILENAME.md) property upon creating a new Database. Defaults `null`.

## AUTOSAVE

Property used when creating a new Database, used for setting the [`#AUTOSAVE`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/properties/%23AUTOSAVE.md) property upon creating a new Database, needs to have a default filename before using. Defaults `false`

