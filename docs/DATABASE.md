# DATABASE

Main database class, has multiple child functions and all of its values are set to private.

### Usage:

`const myDB = new require('Needle-db')(FILENAME, AUTOSAVE)`

## FILENAME

Property used when creating a new Database, used for setting the `#FILENAME` property upon creating a new Database. Defaults `null`.

## AUTOSAVE

Property used when creating a new Database, used for setting the `#AUTOSAVE` property upon creating a new Database, needs to have a default filename before using. Defaults `false`
