const Express = require('express');
const app = Express();
const BodyParser = require('body-parser');
const HistoricoAtual = require('./HistoricoAtual');
const HistoricoPregresso = require('./HistoricoPregresso');
const Mysql = require('mysql');
var db = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'teste'
})

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

app.get('/historico-atual/all/',(req,res)=>{
    var getHist = new HistoricoAtual(req.body,db);
    response = getHist.getData();
    res.send('foi buscado');
});

app.get('/historico-atual/',(req,res)=>{
    var getHist = new HistoricoAtual(req.body,db);
    response = getHist.getById();
    res.send(response);
});

app.post('/historico-atual/',(req,res)=>{
    var postHistAtual = new HistoricoAtual(req.body,db);
    response = postHistAtual.include();
    res.send(response);
})

app.put('/historico-atual/',(req,res)=>{
    var getHist = new HistoricoAtual(req.body,db);
    response = getHist.update();
    res.send(response);
});

app.delete('/historico-atual/',(req,res)=>{
    var getHist = new HistoricoAtual(req.body,db);
    response = getHist.delete();
    res.send(response);
});
app.get('/',(req,res)=>{
    res.send("Digite uma das rotas dos históricos")
})
/* Histórico Médico Pregresso - Rotas*/

app.get('/historico-pregresso/all/',(req,res)=>{
    var getHist = new HistoricoPregresso(req.body,db);
    response = getHist.getData();
})
app.get('/historico-pregresso/',(req,res)=>{
    var getHist = new HistoricoPregresso(req.body,db);
    response = getHist.getById();
    res.send(response);
});
app.post('/historico-pregresso/',(req,res)=>{
    var getHist = new HistoricoPregresso(req.body,db);
    response = getHist.include();
    res.send(response);
})

app.put('/historico-pregresso/',(req,res)=>{
    var getHist = new HistoricoPregresso(req.body,db);
    response = getHist.update();
    res.send(response);
});

app.delete('/historico-pregresso/',(req,res)=>{
    var getHist = new HistoricoPregresso(req.body,db);
    response = getHist.delete();
    res.send(response);
})

app.listen(8080, () => {
    console.log('O server esta rodando na porta 8080');
})
