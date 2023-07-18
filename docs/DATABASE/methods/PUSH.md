# PUSH(DATA)

**Usage:** [`DATABASE.PUSH(DATA)`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE.md)

Pushes a [`DATABASE.FORMAT`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/classes/FORMAT.md) into the [`DATABASE.#DATA`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/properties/%23DATA.md) for adding a new entry/row.

Must have all columns in it, else it will get `code -1`

### DATA
[`DATABASE.FORMAT`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/classes/FORMAT.md) that will be pushed into [`DATABASE.#DATA`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/properties/%23DATA.md) as a new row.

## Operation codes

##### `Code 1`
[`DATABASE.FORMAT`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/classes/FORMAT.md) pushed successfully into [`DATABASE.#DATA`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/properties/%23DATA.md)


##### `Code -1`
Error on the [`DATABASE.FORMAT`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE/classes/FORMAT.md)
