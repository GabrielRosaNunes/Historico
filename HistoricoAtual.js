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

class HistoricoAtual {
    
    constructor(data) {
        this.data = data;
    }

    include() {
        console.log(this.data);
        return;
    }
    getData() {

    }
    remove() {

    }
    update() {

    }
}

module.exports = HistoricoAtual;