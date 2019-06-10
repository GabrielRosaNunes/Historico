/*{
    idade: inteiro
    peso:   flutuante
    estatura: flutuante
    saude: sim ou nÃ£o
    mudanca: sim ou nÃ£o
    tratamento: sim ou nÃ£o
    motivo: texto
    contatomedico: texto
    medicacao: texto
}*/

class HistoricoAtual {
    
    constructor(data) {
        this.data = data;
    }

    include() {
        dataArray = [
            this.validIdade(this.data.Idade),
            this.validPeso(this.data.peso),
            this.validEstatura(this.data.estatura),
            this.validSaude(this.data.saude),
            this.validMudMeses(this.data.mudMeses),
            this.validTratMedico(this.data.tratMedico),
            this.validDataUlt(this.data.datUlt),
            this.validContMedico(this.data.contMedico),
            this.validMedicacao(this.data.medicacao)
        ];

        dataArray.forEach(element => {
            if (element !== true) {
                return element;
            }
        });
        this.insertData();
        return;
    }
    validIdade(data){
        if (typeof data == "number") {
            return true;
        } else {
            return "a idade precisa ser um número";
        }
    }
    validPeso(data) {
        if (typeof data == "number") {
            return true;
        } else {
            return "o peso precisa ser um número";
        }
    }
    validEstatura(data) {
        if (typeof data == "number") {
            return true;
        } else {
            return "a estatura precisa ser um número";
        }
    }
    validSaude(data) {
        if (typeof data == "String") {
            if (data.toLowerCase() == "sim" || data.toLowerCase() == "não") {
                return true;
            } else {
                return "A string precisa ser sim ou não";
            }
        } else {
            return "a saúde precisa ser uma string";
        }
    }
    validMudMeses(data) {
        if (typeof data == "String") {
            if (data.toLowerCase() == "sim" || data.toLowerCase() == "não") {
                return true;
            } else {
                return "A string precisa ser sim ou não";
            }
        } else {
            return "a saúde precisa ser uma string";
        }
    }

    validTratMedico(data) {
        if (typeof data == "String") {
            if (data.toLowerCase() == "sim" || data.toLowerCase() == "não") {
                return true;
            } else {
                return "A string precisa ser sim ou não";
            }
        } else {
            return "a saúde precisa ser uma string";
        }
    }
    validDataUlt(data) {
        if (data instanceof Date) {
            return true;
        } else {
            return "A data da última consulta precisa ser do tipo data";
        }
    }
    validMotivo(data) {
        if (typeof data == "String") {
            return true;
        } else {
            return "o motivo precisa estar em string";
        }
    }
    validContMedico(data) {
        if (typeof data == "String") {
            return true;
        } else {
            return "o contato médico precisa estar em string";
        }
    }
    validMedicacao(data) {
        if (typeof data == "String") {
            return true;
        } else {
            return "a descrição da medicação precisa estar em string";
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

module.exports = HistoricoAtual;