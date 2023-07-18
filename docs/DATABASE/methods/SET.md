# SET(INDEX, COLUMN, VALUE)
**Usage:** [`DATABASE.SET(INDEX, COLUMN, VALUE)`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE.md)
Sets an specific value on an specific row and column, must be set on an existing `INDEX`/`ROW`.

### INDEX
Row index for changing the `VALUE`

### COLUMN
Row column for changing the `VALUE`

### VALUE
Value to set.

## Operation codes

##### `Code 1`
Value successfully set

##### `Code -1`
Unexisting `INDEX`/`ROW`
