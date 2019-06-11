CREATE TABLE historico_atual (
    id int() not null auto_increment,
    idade int(3) not null,
    peso float(3,2) not null,
    estatura float(1,2) not null,
    saude_geral varchar(3) not null,
    mudanca_meses varchar(3) not null,
    tratamento_medico varchar(3) not null,
    data_consulta date(),
    motivo varchar(400),
    contato varchar(100),
    medicacao varchar(400)
)

CREATE TABLE historico_pregressa_cabec (

)

CREATE TABLE historico_pregressa_data (

)