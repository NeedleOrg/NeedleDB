# NEWCOLUMN(NAME, DEFAULT)
**Usage:** [`DATABASE.NEWCOLUMN(NAME, DEFAULT)`](https://github.com/NeedleChat/NeedleDB/blob/docs/docs/DATABASE.md)

Creates a new column for the data base.

### NAME
Mandatory string for naming the column.

### DEFAULT
In case you already have entries within your database, the method will add that column to each of them and put `DEFAULT` as its value. Defaults `null`.
