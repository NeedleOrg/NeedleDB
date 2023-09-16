const fs = require("fs");

class DATABASE {
  #DATA = [];
  #FILENAME = "";
  #COLUMNS = [];
  #AUTOSAVE = false;
  #AUTOFILE = null;
  constructor(FILENAME, AUTOSAVE) {
    if (FILENAME) {
      this.#FILENAME = FILENAME;
      this.LOAD();
    }

    if (AUTOSAVE) {
      this.#AUTOSAVE = true;
    } else {
      this.#AUTOSAVE = false;
    }
  }

  /**
   * Initializes the AUTOSAVE feature.
   *
   * @param {boolean} CONTROL - (optional) Specifies whether the AUTOSAVE feature is enabled or disabled. Defaults to the current state of the feature.
   * @param {string} AUTOFILE - (optional) Specifies the filename for the autosaved file. Defaults to the current filename.
   */
  AUTOSAVE(CONTROL, AUTOFILE) {
    this.#AUTOSAVE = typeof CONTROL !== "undefined" ? CONTROL : !this.#AUTOSAVE;
    this.#AUTOFILE = typeof AUTOFILE === "string" ? AUTOFILE : this.#FILENAME;
  }

  /**
   * Watches a file for changes and updates the data and columns accordingly.
   *
   * @param {string} FILENAME - The name of the file to watch for changes.
   * @return {object} An object with a code property indicating the status of the watch operation.
   */
  WATCH(FILENAME) {
    if (FILENAME || this.#FILENAME) {
      const targetFilename = FILENAME || this.#FILENAME;
      fs.watch(targetFilename, () => {
        const parsedContent = JSON.parse(
          fs.readFileSync(targetFilename, "utf-8")
        );
        this.#DATA = parsedContent.DATA;
        this.#COLUMNS = parsedContent.COLUMNS;
      });
      return { code: 1 };
    } else {
      return { code: -1 };
    }
  }
  SAVE(FILENAME) {
    const targetFilename = FILENAME || this.#FILENAME;
    try {
      fs.writeFileSync(
        targetFilename,
        JSON.stringify({ DATA: this.#DATA, COLUMNS: this.#COLUMNS })
      );
      return { code: 1 };
    } catch (error) {
      return { code: -2, error };
    }
  }

    /**
   * Loads the content of a file into the object.
   *
   * @param {string} FILENAME - The name of the file to load.
   * @return {object} - An object indicating the success of the operation.
   */
  LOAD(FILENAME) {
    const content = fs.readFileSync(FILENAME || this.#FILENAME, "utf-8");
    const parsedContent = JSON.parse(content);
    this.#DATA = parsedContent.DATA || [];
    this.#COLUMNS = parsedContent.COLUMNS || [];
    
    return { code: 1 };
  }
  SETDEFFILE(FILENAME) {
    this.#FILENAME = FILENAME;
  }

  NEWCOLUMN(NAME, DEFAULT) {
    let ColumnExists = false;
    this.#COLUMNS.forEach((e, i, a) => {
      if (e === NAME) {
        ColumnExists = true;
      }
    });

    if (typeof NAME !== "string" || !NAME) {
      ColumnExists = true;
    }

    if (!ColumnExists) {
      this.#COLUMNS.push(NAME);
      this.#DATA.forEach((e, i, a) => {
        if (typeof DEFAULT !== "undefined") {
          e[NAME] = DEFAULT;
        } else {
          e[NAME] = "";
        }
      });
      if (this.#AUTOSAVE) {
        this.SAVE(this.#AUTOFILE);
      }
    }
  }

  PUSH(DATA) {
    let flag = true;
    const DAT = Object.assign({}, DATA);
    this.#COLUMNS.forEach((e, i, a) => {
      if (typeof DAT[e] !== "undefined") {
      } else {
        flag = false;
      }
    });

    if (flag) {
      this.#DATA.push(DAT);
      if (this.#AUTOSAVE) {
        this.SAVE(this.#AUTOFILE);
      }
      return { code: 1 };
    } else {
      return { code: -1 };
    }
  }

  SET(INDEX, COLUMN, VALUE) {
    if (typeof this.#DATA[INDEX][COLUMN] !== "undefined") {
      this.#DATA[INDEX][COLUMN] = VALUE;
      if (this.#AUTOSAVE) {
        this.SAVE(this.#AUTOFILE);
      }
      return { code: 1 };
    } else {
      return { code: -1 };
    }
  }

  REPLACE(INDEX, DATA) {
    let flag = true;

    this.#COLUMNS.forEach((e, i, a) => {
      if (typeof DATA[e] === "undefined") {
        flag = false;
      }
    });

    if (typeof this.#DATA[INDEX] === "undefined") {
      flag = false;
    }

    if (flag) {
      this.#DATA[INDEX] = DATA;
      if (this.#AUTOSAVE) {
        this.SAVE(this.#AUTOFILE);
      }
      return { code: 1 };
    } else {
      return { code: -1 };
    }
  }

  REPLACECOLUMN(COLUMN, VALUE){
    let ColumnExists = false;

    this.#COLUMNS.forEach((e, i, a) => {
      if (e === COLUMN) {
        ColumnExists = true;
      }
    });

    if(ColumnExists){
      this.#DATA.forEach((e,i,a)=>{
        e[COLUMN] = VALUE
      })

      if (this.#AUTOSAVE) {
        this.SAVE(this.#AUTOFILE);
      }
    }else{
    }
  }

  READ(INDEX, COLUMN) {
    if (typeof this.#DATA[INDEX][COLUMN] !== "undefined") {
      return this.#DATA[INDEX][COLUMN];
    } else {
      return null;
    }
  }

  GET(INDEX) {
    if (typeof this.#DATA[INDEX] !== "undefined") {
      return this.#DATA[INDEX];
    } else {
      return null;
    }
  }

  DELETE(INDEX) {
    this.#DATA.splice(INDEX, 1);
    if (this.#AUTOSAVE) {
      this.SAVE(this.#AUTOFILE);
    }
  }

  CLEARVALUE(INDEX, COLUMN) {
    if (typeof this.#DATA[INDEX][COLUMN] !== "undefined") {
      this.#DATA[INDEX][COLUMN] = null;
      if (this.#AUTOSAVE) {
        this.SAVE(this.#AUTOFILE);
      }
    }
  }

  CLEARCOLUMN(COLUMN) {
    let ColumnExists = false;

    this.#COLUMNS.forEach((e, i, a) => {
      if (e === COLUMN) {
        ColumnExists = true;
      }
    });

    if (ColumnExists) {
      this.#DATA.forEach((e, i, a) => {
        e[COLUMN] = null;
        if (this.#AUTOSAVE) {
          this.SAVE(this.#AUTOFILE);
        }
      });
    } else {
    }
  }

  DELETECOLUMN(COLUMN) {
    let ColumnExists = -1;

    this.#COLUMNS.forEach((e, i, a) => {
      if (e === COLUMN) {
        ColumnExists = i;
      }
    });

    if (ColumnExists != -1) {
      this.#COLUMNS.splice(ColumnExists, 1);
      this.#DATA.forEach((e, i, a) => {
        if (e[COLUMN]) {
          delete e[COLUMN];
          if (this.#AUTOSAVE) {
            this.SAVE(this.#AUTOFILE);
          }
        } else {
        }
      });
    } else {
    }
  }

  FORMAT() {
    const COLUMNLIST = this.#COLUMNS;
    class PUSHFORMAT {
      constructor() {
        COLUMNLIST.forEach((e, i, a) => {
          this[e] = null;
        });
      }

      CLEARVALUE(COLUMN) {
        if (typeof this[COLUMN] !== "undefined") {
          this[COLUMN] = null;
        }
      }

      READ(COLUMN) {
        if (typeof this[COLUMN] !== "undefined") {
          return this[COLUMN];
        } else {
          return null;
        }
      }

      GET() {
        return this;
      }

      SET(COLUMN, VALUE) {
        if (typeof this[COLUMN] !== "undefined") {
          this[COLUMN] = VALUE;
          return { code: 1 };
        } else {
          return { code: -1 };
        }
      }
    }

    return new PUSHFORMAT();
  }

  SEARCH(COLUMN, VALUE){
    let MATCHINGINDEXES = []
    let ColumnExists = false;

    this.#COLUMNS.forEach((e, i, a) => {
      if (e === COLUMN) {
        ColumnExists = true;
      }
    });

    if(ColumnExists){
      this.#DATA.forEach((e,i,a)=>{
        let tempCellValue
        let tempValue
        if(typeof e[COLUMN] === 'string'){
          tempCellValue = e[COLUMN].toUpperCase()
        }else{
          tempCellValue = e[COLUMN]
        }

        if(typeof VALUE === 'string'){
          tempValue = VALUE.toUpperCase()
        }else{
          tempValue = VALUE
        }

        if(tempCellValue === tempValue){
          MATCHINGINDEXES.push(i)
        }else{

        }
      })

      return MATCHINGINDEXES
    }
  }

  FINDQUICKINDEX(COLUMN, VALUE) {
    const INDEX = this.#DATA.findIndex((DATA) => DATA[COLUMN] === VALUE);
    return INDEX;
  }

  COLUMNDATA(COLUMN) {
    let ColumnExists = false;
    let ColumnData = []
    this.#COLUMNS.forEach((e, i, a) => {
      if (e === COLUMN) {
        ColumnExists = true;
      }
    });

    if(ColumnExists){
      this.#DATA.forEach((e,i,a)=>{
        ColumnData[i] = e[COLUMN]
      })

      return ColumnData
    }else{
      return []
    }
  }

  GETCOLUMNLIST() {
    return this.#COLUMNS;
  }

  GETDEFFILE() {
    return this.#FILENAME;
  }

  GETJSONDATA() {
    return this.#DATA;
  }

  AUTOSAVESTATUS() {
    return this.#AUTOSAVE;
  }

  SETAUTOFILE(AUTOFILE) {
    this.#AUTOFILE = AUTOFILE;
  }

  GETAUTOFILE() {
    return this.#AUTOFILE;
  }

  GETINDEXLENGTH() {
    return this.#DATA.length;
  }
}

module.exports = DATABASE;

// SQL, Whats that? We use Needle DB
