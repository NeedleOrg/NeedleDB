# REPLACE(INDEX, DATA)
**Usage:** [`DATABASE.REPLACE(INDEX, DATA)`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE.md)

Replaces a whole `INDEX` with a new [`DATABASE.FORMAT`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/classes/FORMAT.md). It must be an existing `INDEX` and a valid [`DATABASE.FORMAT`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/classes/FORMAT.md)

### INDEX
`INDEX` to replace.

### DATA
[`DATABASE.FORMAT`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/classes/FORMAT.md) to replace with.

## Operation Codes

##### `Code 1`
Successfully replaced the `INDEX`

##### `Code -1`
Invalid `INDEX` or [`DATABASE.FORMAT`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/classes/FORMAT.md)

