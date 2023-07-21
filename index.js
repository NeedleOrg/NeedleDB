const fs = require('fs')

class DATABASE {
    #DATA = []
    #FILENAME = ""
    #COLUMNS = []
    #AUTOSAVE = false
    #AUTOFILE = null
    constructor(FILENAME, AUTOSAVE){
        if(FILENAME){
            this.#FILENAME = FILENAME
            this.LOAD()
        }

        if(AUTOSAVE){
            this.#AUTOSAVE = true
        }else{
            this.#AUTOSAVE = false
        }
    }

    AUTOSAVE(CONTROL, AUTOFILE){
        if(typeof CONTROL !== 'undefined'){
            if(CONTROL){
                this.#AUTOSAVE = true
                if(typeof AUTOFILE === 'string'){
                    this.#AUTOFILE = AUTOFILE
                }else{
                    this.#AUTOFILE = this.#FILENAME
                }
            }else{
                this.#AUTOSAVE = false
                this.#AUTOFILE = null
            }
        }else{
            if(this.#AUTOSAVE){
                this.#AUTOSAVE = false
                this.#AUTOFILE = null
            }else{
                this.#AUTOSAVE = true
                if(typeof AUTOFILE === 'string'){
                    this.#AUTOFILE = AUTOFILE
                }else{
                    this.#AUTOFILE = this.#FILENAME
                }
            }
        }

    }

    WATCH(FILENAME){
        if(FILENAME){
            fs.watch(FILENAME, () => {
                const parsedContent = JSON.parse(fs.readFileSync(FILENAME, 'utf-8'))
                this.#DATA = parsedContent.DATA
                this.#COLUMNS = parsedContent.COLUMNS
              })
              return {code: 1}
        }else if(this.#FILENAME){
            fs.watch(this.#FILENAME, () => {
                const parsedContent = JSON.parse(fs.readFileSync(this.#FILENAME, 'utf-8'))
                this.#DATA = parsedContent.DATA
                this.#COLUMNS = parsedContent.COLUMNS
              })
              return {code: 1}
        }else{
            return {code: -1}
        }
    }

    SAVE(FILENAME){
        if(FILENAME){
            try {
                fs.writeFileSync(FILENAME, JSON.stringify({DATA: this.#DATA, COLUMNS: this.#COLUMNS}))
                return {code: 1}
            } catch (error) {
                return {code: -2, error: error}
            }
        }else if(this.#FILENAME){
            try {
                fs.writeFileSync(this.#FILENAME, JSON.stringify({DATA: this.#DATA, COLUMNS: this.#COLUMNS}))
                return {code: 1}
            } catch (error) {
                return {code: -2, error: error}
            }
        }else{
            return {code: -1}
        }
    }

    LOAD(FILENAME){
        if(FILENAME){
            try {
                const parsedContent = JSON.parse(fs.readFileSync(FILENAME, 'utf-8'))
                if(parsedContent.DATA){
                    this.#DATA = parsedContent.DATA
                }else{
                    this.#DATA = []
                }
                if(parsedContent.COLUMNS){
                    this.#COLUMNS = parsedContent.COLUMNS
                }else{
                    this.#COLUMNS = []
                }
                return {code: 1}
            } catch (error) {
                return {code: -1, error: error}
            } 
        }else if(this.#FILENAME){
            try {
                const parsedContent = JSON.parse(fs.readFileSync(this.#FILENAME, 'utf-8'))
                if(parsedContent.DATA){
                    this.#DATA = parsedContent.DATA
                }else{
                    this.#DATA = []
                }
                if(parsedContent.COLUMNS){
                    this.#COLUMNS = parsedContent.COLUMNS
                }else{
                    this.#COLUMNS = []
                }
                return {code: 1}
            } catch (error) {
                return {code: -1, error: error}
            } 
        }else{
            return {code: -2}
        }
    }

    SETDEFFILE(FILENAME){
        this.#FILENAME = FILENAME
    }

    NEWCOLUMN(NAME, DEFAULT){
        let ColumnExists = false
        this.#COLUMNS.forEach((e,i,a)=>{
            if(e === NAME){
                ColumnExists = true
            }
        })

        if(typeof NAME !== 'string' || !NAME){
            ColumnExists = true
        }

        if(!ColumnExists){
            this.#COLUMNS.push(NAME)
            this.#DATA.forEach((e,i,a)=>{
                if(typeof DEFAULT !== 'undefined'){
                    e[NAME] = DEFAULT
                }else{
                    e[NAME] = ""
                }
            })
            if(this.#AUTOSAVE){
                this.SAVE(this.#AUTOFILE)
            }
        } 
    }

    PUSH(DATA){
        let flag = true
        const DAT = Object.assign({}, DATA)
        this.#COLUMNS.forEach((e,i,a)=>{
            if(typeof DAT[e] !== 'undefined'){

            }else{
                flag = false
            }
        })

        if(flag){
            this.#DATA.push(DAT)
            if(this.#AUTOSAVE){
                this.SAVE(this.#AUTOFILE)
            }
            return {code: 1}
        }else{
            return {code: -1}
        }
    }

    SET(INDEX, COLUMN, VALUE){
        if(typeof this.#DATA[INDEX][COLUMN] !== 'undefined' ){
            this.#DATA[INDEX][COLUMN] = VALUE
            if(this.#AUTOSAVE){
                this.SAVE(this.#AUTOFILE)
            }
            return {code: 1}
        }else{
            return {code: -1}
        }
    }

    REPLACE(INDEX, DATA){
        let flag = true

        this.#COLUMNS.forEach((e,i,a)=>{
            if(typeof DATA[e] === 'undefined'){
                flag = false
            }
        })

        if(typeof this.#DATA[INDEX] === 'undefined'){
            flag = false
        }

        if(flag){
            this.#DATA[INDEX] = DATA
            if(this.#AUTOSAVE){
                this.SAVE(this.#AUTOFILE)
            }
            return {code: 1}
        }else{
            return {code: -1}
        }
    }

    READ(INDEX, COLUMN){
        if(typeof this.#DATA[INDEX][COLUMN] !== 'undefined' ){
            return this.#DATA[INDEX][COLUMN]
        }else{
            return null
        }
    }

    GET(INDEX){
        if(typeof this.#DATA[INDEX] !== 'undefined' ){
            return this.#DATA[INDEX]
        }else{
            return null
        }
    }

    DELETE(INDEX){
        this.#DATA.splice(INDEX,1)
        if(this.#AUTOSAVE){
            this.SAVE(this.#AUTOFILE)
        }
    }

    CLEARVALUE(INDEX, COLUMN){
        if(typeof this.#DATA[INDEX][COLUMN] !== 'undefined' ){
            this.#DATA[INDEX][COLUMN] = null
            if(this.#AUTOSAVE){
                this.SAVE(this.#AUTOFILE)
            }
        }
    }

    CLEARCOLUMN(COLUMN){
        let ColumnExists = false

        this.#COLUMNS.forEach((e,i,a)=>{
            if(e === COLUMN){
                ColumnExists = true
            }
        })

        if(ColumnExists){
            this.#DATA.forEach((e,i,a)=>{
                e[COLUMN] = null
                if(this.#AUTOSAVE){
                    this.SAVE(this.#AUTOFILE)
                }
            })
        }else{

        }
    }

    DELETECOLUMN(COLUMN){
        let ColumnExists = -1

        this.#COLUMNS.forEach((e,i,a)=>{
            if(e === COLUMN){
                ColumnExists = i
            }
        })

        if(ColumnExists != -1){
            this.#COLUMNS.splice(ColumnExists,1)
            this.#DATA.forEach((e,i,a)=>{
                if(e[COLUMN]){
                    delete e[COLUMN]
                    if(this.#AUTOSAVE){
                        this.SAVE(this.#AUTOFILE)
                    }
                }else{

                }
            })
        }else{

        }
    }

    FORMAT(){
        const COLUMNLIST = this.#COLUMNS
        class PUSHFORMAT {
            constructor(){
                COLUMNLIST.forEach((e,i,a)=>{
                    this[e] = null
                })
            }

            CLEARVALUE(COLUMN){
                if(typeof this[COLUMN] !== 'undefined' ){
                    this[COLUMN] = null
                }
            }

            READ(COLUMN){
                if(typeof this[COLUMN] !== 'undefined' ){
                    return this[COLUMN]
                }else{
                    return null
                }
            }
        
            GET(){
                return this
            }

            SET(COLUMN, VALUE){
                if(typeof this[COLUMN] !== 'undefined'){
                    this[COLUMN] = VALUE
                    return {code: 1}
                }else{
                    return {code: -1}
                }
            }
        }

        return new PUSHFORMAT()
    }

    FINDINDEX(COLUMN, VALUE){
        const INDEX = this.#DATA.findIndex(DATA => DATA[COLUMN] === VALUE)
        return INDEX
    }

    GETCOLUMNLIST(){
       return this.#COLUMNS 
    }

    GETDEFFILE(){
        return this.#FILENAME
    }

    GETJSONDATA(){
        return this.#DATA
    }

    AUTOSAVESTATUS(){
        return this.#AUTOSAVE
    }

    SETAUTOFILE(AUTOFILE){
        this.#AUTOFILE = AUTOFILE
    }

    GETAUTOFILE(){
        return this.#AUTOFILE
    }

    GETINDEXLENGTH(){
        return this.#DATA.length
    }
}

module.exports = DATABASE
