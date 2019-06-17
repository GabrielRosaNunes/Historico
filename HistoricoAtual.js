/*{
    idade: inteiro
    peso:   flutuante
    estatura: flutuante
    saude: sim ou não
    mudanca: sim ou não
    tratamento: sim ou não
    motivo: texto
    contatomedico: texto
    medicacao: texto
}*/
const Mysql = require('./model');
class HistoricoAtual {
    
    constructor(data) {
        this.data = data;
        this.model = new Mysql('remotemysql.com','SnzXxLqqun','mcvjZM2PZI','SnzXxLqqun','historico_atual');
    }

    include() {
        var dataArray = [this.validId(this.data.idPaciente),
            this.validIdade(this.data.idade),
            this.validPeso(this.data.peso),
            this.validEstatura(this.data.estatura),
            this.validSaude(this.data.saude),
            this.validMudMeses(this.data.mudMeses),
            this.validTratMedico(this.data.tratMedico),
            this.validDataUlt(this.data.datUlt),
            this.validMotivo(this.data.motivo),
            this.validContMedico(this.data.contMedico),
            this.validMedicacao(this.data.medicacao)
        ];
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
    validIdade(data){
        if (typeof data == "number") {
            return true;
        } else {
            return "a idade precisa ser um numero";
        }
    }
    validPeso(data) {
        if (typeof data == "number") {
            return true;
        } else {
            return "o peso precisa ser um numero";
        }
    }
    validEstatura(data) {
        if (typeof data == "number") {
            return true;
        } else {
            return "a estatura precisa ser um numero";
        }
    }
    validId(id) {
        if (typeof id !== "number") {
            return "o id precisa ser do tipo numero";
        } else {
            return true;
        }
    }
    validSaude(data) {
        if (typeof data == "string") {
            if (data == "sim" || data == "nao") {
                return true;
            } else {
                return "A string precisa ser sim ou nao";
            }
        } else {
            return "a saude precisa ser uma string";
        }
    }
    validMudMeses(data) {
        if (typeof data == "string") {
            if (data == "sim" || data == "nao") {
                return true;
            } else {
                return "A string precisa ser sim ou nao";
            }
        } else {
            return "a mudanca precisa ser uma string ";
        }
    }

    validTratMedico(data) {
        if (typeof data == "string") {
            if (data.toLowerCase() == "sim" || data.toLowerCase() == "nao") {
                return true;
            } else {
                return "A string precisa ser sim ou nao";
            }
        } else {
            return "a tratMedico precisa ser uma string";
        }
    }
    validDataUlt(data) {
        if (typeof data == "number") {
            return true;
        } else {
            return "A data da ultima consulta precisa ser do tipo data";
        }
    }
    validMotivo(data) {
        if (typeof data == "string") {
            return true;
        } else {
            return "o motivo precisa estar em string";
        }
    }
    validContMedico(data) {
        if (typeof data == "string") {
            return true;
        } else {
            return "o contato medico precisa estar em string";
        }
    }
    validMedicacao(data) {
        if (typeof data == "string") {
            return true;
        } else {
            return "a descricaoo da medicacao precisa estar em string";
        }
    }

    insertData() {
        var campos = '';
        var values = '';
        if (this.data.idade != '' || this.data.idade != undefined) {
            campos += 'idade,';
            values += this.data.idade+ ",";
        }
        if (this.data.peso  != '' && this.data.peso != undefined) {
            campos += 'peso,'
            values +=this.data.peso+ ",";
        }
        if (this.data.estatura != '' && this.data.estatura != undefined) {
            campos += 'estatura,'
            values += this.data.estatura+",";
        }
        if (this.data.saude != '' && this.data.saude != undefined) {
            campos += 'saude_geral,';
            values += '"'+this.data.saude+'",';
        }
        if (this.data.mudMeses != '' && this.data.mudMeses != undefined) {
            campos += 'mudanca_meses,'
            values += '"'+this.data.mudMeses+'",';
        }
        if (this.data.tratMedico != '' && this.data.tratMedico != undefined) {
            campos += 'tratamento_medico,';
            values += '"'+this.data.tratMedico+'",';
        }
        if (this.data.datUlt != '' && this.data.datUlt != undefined) {
            campos += 'data_consulta,';
            values += '"'+this.data.datUlt+'",';
        }
        if (this.data.motivo != '' && this.data.motivo != undefined) {
            campos += 'motivo,';
            values += '"'+this.data.motivo+'",';
        }
        if (this.data.contMedico != '' && this.data.contMedico != undefined)  {
            campos += 'contato,';
            values += '"'+this.data.contMedico+'",';
        }
        if (this.data.medicacao != '' && this.data.medicacao != undefined) {
            campos += 'medicacao,';
            values += '"'+this.data.medicacao+'",';
        }
        if (this.data.idPaciente != '' && this.data.idPaciente != undefined) {
            campos += 'id_paciente';
            values += this.data.idPaciente
        }

        return this.model.insert(campos,values);
    }

    getAll() {
        return this.model.getAll('*');
    }

    getAllById() {
        this.data.idPaciente = parseInt(this.data.idPaciente);
        if (this.data.idPaciente != undefined && this.data.idPaciente != null && this.data.idPaciente != NaN && typeof this.data.idPaciente == "number") {
            return this.model.getAll('*','id_paciente='+this.data.idPaciente);
        } else {
            return "o campo idPaciente deve estar preenchido e ser um número";
        }
    }

    update() {
        var set = '';
        var dataUpdate = this.data;
        this.dataUpdate = [];
        var validValues = [[this.validIdade(dataUpdate.idade),dataUpdate.idade,'idade'],
                           [this.validPeso(dataUpdate.peso),dataUpdate.peso,'peso'],
                           [this.validEstatura(dataUpdate.estatura),dataUpdate.estatura,'estatura'],
                           [this.validSaude(dataUpdate.saude),dataUpdate.saude,'saude_geral'],
                           [this.validMudMeses(dataUpdate.mudMeses),dataUpdate.mudMeses,'mudanca_meses'],
                           [this.validTratMedico(dataUpdate.tratMedico),dataUpdate.tratMedico,'tratamento_medico'],
                           [this.validDataUlt(dataUpdate.datUlt),dataUpdate.datUlt,'data_consulta'],
                           [this.validMotivo(dataUpdate.motivo),dataUpdate.motivo,'motivo'],
                           [this.validContMedico(dataUpdate.contMedico),dataUpdate.contMedico,'contato'],
                           [this.validMedicacao(dataUpdate.medicacao),dataUpdate.medicacao,'medicacao'],
                           [this.validId(dataUpdate.idPaciente),dataUpdate.idPaciente,'id_paciente']];
        var response = this.validAll(validValues);
        if (response !== true) {
            return response;
        }
        this.dataUpdate.forEach((element) => {
            if (set == '') {
                set += element[0]+"='"+element[1]+"'";
            } else {
                set += ","+element[0]+"='"+element[1]+"'";
            }
        })
        console.log(set);
        if (dataUpdate.id != null && typeof dataUpdate.id == 'number') {
            this.model.update(set,'id='+dataUpdate.id);
        }
        return true;
    }

    validAll(data) {
        data.forEach((element) => {
            console.log(element);
            if (this.boolErrorValidAll === true ) {return;}
            if (element[1] != undefined && element[1] != null && element[1] != NaN) {
                if (element[0] === true) {
                    this.dataUpdate.push([element[2],element[1]]);
                } else {
                    this.boolErrorValidAll = true;
                    this.errorValidAll = element[0];
                }
            }
        })
        if (this.boolErrorValidAll === true) {
            return this.errorValidAll;
        } else {
            return true;
        }
    }

    remove() {
        console.log(this.data.idPaciente);
        if (typeof this.data.idPaciente == 'number') {
            this.model.remove('id_paciente='+this.data.idPaciente);
            return true;
        } else {
            return "o campo idPaciente deve estar preenchido e ser um número";
        }
    }
}
/*this.validIdade(this.data.Idade),
this.validPeso(this.data.peso),
this.validEstatura(this.data.estatura),
this.validSaude(this.data.saude),
this.validMudMeses(this.data.mudMeses),
this.validTratMedico(this.data.tratMedico),
this.validDataUlt(this.data.datUlt),
this.validContMedico(this.data.contMedico),
this.validMedicacao(this.data.medicacao)*/

module.exports = HistoricoAtual;