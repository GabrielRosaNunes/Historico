/*
    {
        cirurgia: sim ou nÃ£o
        data-cirurgia: {
            {
                mes/ano:
                doenÃ§a:
                cirurgia:
                mÃ©dico
            }
        }
        internado: sim ou nÃ£o
        texto-internado: texto

    }
*/

class HistoricoPregresso {
    constructor(data) {
        this.data = data;
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
            if (data.toLowerCase() == "sim" || data.toLowerCase() == "não") {
                return true;
            } else {
                return "A string precisa ser sim ou não";
            }
        } else {
            return "a cirurgia precisa ser uma string";
        }
    }
    validDatCirur(data) {
        
    }
    internado(data) {
        if (typeof data == "String") {
            if (data.toLowerCase() == "sim" || data.toLowerCase() == "não") {
                return true;
            } else {
                return "O dado de internação precisa ser sim ou não";
            }
        } else {
            return "a internação precisa ser uma string";
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
        db.query("INSERT INTO XXXX (CAMPO1,CAMPO2) VALUES (1,2)");
        return true;
    }
    getData(campos,where,orderby,groups) {
        result = db.query(`SELECT ${campos} FROM TABLENAME WHERE ${where} ORDER BY ${orderby} GROUP BY ${groups}`);
        return result;
    }
    remove(where) {
        db.query(`DELETE FROM TABLENAME WHERE ${where}`);
        return true;
    }
    update(set,where) {
        db.query(`UPDATE SET ${set} WHERE ${where}`);
        return true;
    }
}

module.exports = HistoricoPregresso;