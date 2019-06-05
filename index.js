const Express = require('express');
const app = Express();
const BodyParser = require('body-parser');
const HistoricoAtual = require('./HistoricoAtual');
const HistoricoPregresso = require('./HistoricoPregresso');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
    extended: true
}))
/*
    Histórico médico atual
        Idade:
        Peso:
        Estatura
        Saude Geral Sim ou Não
        Mudança meses Sim ou Não
        Tratamento médico Sim ou Não
        Data da última consulta
        Motivo: Texto Grande
        Contato Médico
        Medicação: Text Grande

        {
            idade: inteiro
            peso:   flutuante
            estatura: flutuante
            saude: sim ou não
            mudanca: sim ou não
            tratamento: sim ou não
            motivo: texto
            contatomedico: texto
            medicacao: texto
        }


    Histórico Médico Pregressa
        Já passou por alguma cirurgia? : sim ou não
            Mes/Ano, Doença, Cirurgia, Médico
        Ficou internado ou sofreu alguma doença grave nos últimos 5 anos? Sim ou não
            Se sim, insere o valor do dado

    {
        cirurgia: sim ou não
        data-cirurgia: {
            {
                mes/ano:
                doença:
                cirurgia:
                médico
            }
        }
        internado: sim ou não
        texto-internado: texto

    }
*/

/* Histórico Médico Atual - Rotas */

app.get('/historico-atual/',(req,res)=>{
    getHist = new HistoricoAtual(req.body);
    res.send(getHist);
});
app.post('/historico-atual/',(req,res)=>{
    postHistAtual = new HistoricoAtual(req.body);
    resposta = postHistAtual.include();
    res.send(req.body);
})

app.put('/historico-atual/',(req,res)=>{
    
});

app.delete('/historico-atual/',(req,res)=>{

});

/* Histórico Médico Pregresso - Rotas*/


app.get('/historico-pregresso/',(req,res)=>{
    res.send(index());
});
app.post('/historico-pregresso/',(req,res)=>{

})

app.put('/historico-pregresso/',(req,res)=>{
    
});

app.delete('/historico-pregresso/',(req,res)=>{

})

app.listen(8080, () => {
    console.log('foi o servers');
})
