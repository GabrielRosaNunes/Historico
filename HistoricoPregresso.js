/*
    {
        cirurgia: sim ou não
        data-cirurgia: {
            {
                mes/ano: 
                doença: texto
                cirurgia: texto
                médico: texto
            }
        }
        internado: sim ou não
        texto-internado: texto

    }
*/

class HistoricoPregresso {
    constructor(data,db) {
        this.data = data;
        this.db = db;
    }
    include() {
        dataArray = [this.validCirur(),
                    this.validDatCirur(),
                    this.internado(),
                    this.textInternado()]
        dataArray.forEach(element => {
            if (element !== true) {
                return element;
            }
        });
        this.insertData();
        return;
    }

    validCirur(data) {
        if (typeof data == "String") {
            if (data.toLowerCase() == "sim" || data.toLowerCase() == "n�o") {
                return true;
            } else {
                return "A string precisa ser sim ou nao";
            }
        } else {
            return "a cirurgia precisa ser uma string";
        }
    }
    validDatCirur(data) {
        
    }
    internado(data) {
        if (typeof data == "String") {
            if (data.toLowerCase() == "sim" || data.toLowerCase() == "nao") {
                return true;
            } else {
                return "O dado de internacaoo precisa ser sim ou nao";
            }
        } else {
            return "a internacao precisa ser uma string";
        }
    }

    textInternado(data) {
        if (typeof data == "String") {
            return true;
        } else {
            return "o textoInternado precisa estar em string";
        }
    }

    insertData(data) {
        this.db.query("INSERT INTO XXXX (CAMPO1,CAMPO2) VALUES (1,2)",(err,response)=>{
            if (err) throw err;
        });
        return true;
    }
    getData(campos,where,orderby,groups) {
        result = this.db.query(`SELECT ${campos} FROM TABLENAME WHERE ${where} ORDER BY ${orderby} GROUP BY ${groups}`,(err,response)=>{
            if (err) throw err;
            this.responseGetData = response;
        });
        return this.responseGetData;
    }
    remove(where) {
        this.db.query(`DELETE FROM TABLENAME WHERE ${where}`,(err,response) => {
            if (err) throw err;
        });
        return true;
    }
    update(set,where) {
        this.db.query(`UPDATE SET ${set} WHERE ${where}`,(err,response)=>{
            if (err) throw err;
        });
        return true;
    }
}

module.exports = HistoricoPregresso;