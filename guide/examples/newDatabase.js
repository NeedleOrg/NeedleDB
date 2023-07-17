//  Imports the library
  const needle = require('needle-db')

//  Creates a new Database
  const myDB = new needle()

//  Creates a new column within that database
  myDB.NEWCOLUMN("MyColumn")

//  Creates a push format and sets it up
  const pushFormat = myDB.FORMAT()
  pushFormat.SET("MyColumn", "Hey There!")

//  Pushes the format into the DB
  myDB.PUSH(pushFormat)
  console.log(myDB.GETJSONDATA()) //  Expected Output: [ { MyColumn: 'Hey There!' } ]
