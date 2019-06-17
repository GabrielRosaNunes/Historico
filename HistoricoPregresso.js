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
const Mysql = require('./model');
class HistoricoPregresso {
    constructor(data) {
        this.data = data;
        this.model = new Mysql('remotemysql.com','SnzXxLqqun','mcvjZM2PZI','SnzXxLqqun','historico_pregresso');
    }
    include() {
        console.log(this.data);
        var dataArray = [,this.validId(this.data.idPaciente),
                    this.validCirur(this.data.cirurgia),
                    this.internado(this.data.internado),]
        if (this.data.cirurgia = "sim") {
            dataArray.push(this.validDatCirur(this.data.datCirur));
        }
        if (this.data.internado = "sim") {
            dataArray.push(this.textInternado(this.data.textInternado));
        }

        dataArray.forEach((element) => {
            if (this.loopStop === true) {
                return;
            };
            if (typeof element != 'boolean' && element != true) {
                this.responseValid = element;
                this.loopStop = true;
                return;
            }
            return;
        });
        if (typeof this.responseValid != 'boolean' && this.responseValid != true &&  this.responseValid!= undefined) {
            return this.responseValid;
        }
        var response = this.insertData();
        return response;
    }
    validId(id) {
        if (typeof id != "number") {
            return "o id precisa ser do tipo numero";
        } else {
            return true;
        }
    }
    validCirur(data) {
        if (typeof data == "string") {
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
        data.forEach((element) => {
            if (this.boolErrorCirur) return;
            if (data.mes <= 0 && data.mes >= 13) {
                console.log(data.mes);
                this.boolErrorCirur = true;
                this.textErrorCirur = 'O mes precisa estar entre 1 e 12';
                return
            }
            if (typeof data.ano != 'number') {
                this.textErrorCirur = 'O ano precisa ser um número'
                this.boolErrorCirur = true;
                return
            }
            if (typeof data.doenca != 'string') {
                this.textErrorCirur = 'A doenca precisa ser um texto';
                this.boolErrorCirur = true;
                return;
            }
            if (typeof data.cirurgia != 'string') {
                this.textErrorCirur = 'A cirurgia precisa ser um texto';
                this.boolErrorCirur = true;
                return;
            }
            if (typeof data.medico != 'string') {
                this.textErrorCirur = 'O nome do medico precisa ser um texto';
                this.boolErrorCirur = true;
                return
            }
        })
        if (this.boolErrorCirur != true) {
            return this.textErrorCirur;
        } else {
            return true;
        }
    }
    internado(data) {
        if (typeof data == "string") {
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
        if (typeof data == "string") {
            return true;
        } else {
            return "o textoInternado precisa estar em string";
        }
    }
    insertData() {
        var columns = '';
        var values = '';
        columns += "id_paciente,";
        values += this.data.idPaciente;
        if (this.data.cirurgia != '' && this.data.cirurgia != undefined) {
            columns += 'cirurgia,';
            values += '"'+this.data.cirurgia+'",';
        } 
        if (this.data.internado != '' && this.data.internado != undefined) {
            columns += 'internado,';
            values += '"'+this.data.internado+'",';
        }
        if (this.data.textInternado != '' && this.data.internado != undefined) {
            columns += 'text_internado';
            values += '"'+this.data.textInternado+'"';
        }

        this.model.insert(columns,values);
        this.model.endConnection();
        var newModel = new Mysql('remotemysql.com','SnzXxLqqun','mcvjZM2PZI','SnzXxLqqun','historico_pregresso_data_cirurgia');
        if (this.data.cirurgia == "sim") {
            this.data.datCirur.forEach((element) =>{
                var columnsDatCirur = `id_paciente,mes,ano,doenca,cirurgia,medico`;
                var valuesDatCirur = `${element.idPacience},${element.mes},${element.ano},"${element.doenca}","${element.cirurgia}","${element.medico}"`;
                newModel.insert(columnsDatCirur,valuesDatCirur);
            })
        }
        return true;
    }
    update() {
        var set = '';
        var arraySet = [];

        if (this.data.cirurgia != '' && this.data.cirurgia != undefined) {
            if (this.validCirur(this.data.cirurgia) === true) {
                arraySet.push('cirurgia="'+this.data.cirurgia+'"');
            } else {
                return this.validCirur(this.data.cirurgia);
            }
        }
        if (this.data.internado != '' && this.data.internado != undefined) {
            if (this.internado(this.data.internado) === true) {
                arraySet.push('internado="'+this.data.internado+'"');
            } else {
                return this.internado(this.data.internado);
            }
            
        }
        if (this.data.textInternado != '' && this.data.textInternado != undefined) {
            if (this.textInternado(this.data.textInternado) === true) {
                arraySet.push('text_internado="'+this.data.textInternado+'"');
            } else {
                return this.textInternado(this.data.textInternado);
            }
            
        }
        arraySet.forEach((element) => {
            if (set == '') {
                set += element;
            } else {
                set += ","+element;
            }
        })

        if (this.data.idPaciente != null && this.data.idPaciente != undefined && typeof this.data.idPaciente == "number") {
            this.model.update(set,"id_paciente="+this.data.idPaciente);
        } else {
            return "O campo id paciente deve estar preenchido e ser um numero";
        }

        var arrayDatCirur = this.data.datCirur;
        var newModel = new Mysql('remotemysql.com','SnzXxLqqun','mcvjZM2PZI','SnzXxLqqun','historico_pregresso_data_cirurgia');
        var contador = 0;
        var boolErro = false;
        var textErro = '';
        if (this.data.cirurgia == "sim") {
            arrayDatCirur.forEach((element) =>{
                var setDatCirur = '';
                if (boolErro) return;
                if (element.mes != '' && element.mes != undefined) {
                    if (element.mes <= 0 && element.mes >= 13 && typeof element.mes == "number") {
                        textErro = "o mes precisa estar entre 1 e 12 e ser do tipo numero"
                    } else {
                        setDatCirur = ""
                    }
                }
                if (data.mes <= 0 && data.mes >= 13) {
                    return
                }
                if (typeof data.ano != 'number') {
                }
                if (typeof data.doenca != 'string') {
                }
                if (typeof data.cirurgia != 'string') {
                }
                if (typeof data.medico != 'string') {
                }
                newModel.insert(columnsDatCirur,valuesDatCirur);
            })
        }


        return true;
    }
}

module.exports = HistoricoPregresso;