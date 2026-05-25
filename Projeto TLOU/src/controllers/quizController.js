var quizModel = require("../models/quizModel");

function salvar(req, res) {
    var idUsuario = req.body.idUsuario;
    var respostas = req.body.respostas;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (respostas == undefined || !Array.isArray(respostas) || respostas.length !== 12) {
        res.status(400).send("Suas respostas estão ausentes ou inválidas! Devem ser exatamente 12 respostas.");
    } else {
        quizModel.salvar(idUsuario, respostas)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o salvamento das respostas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function obterMetricas(req, res) {
    quizModel.obterMetricas()
        .then(function (resultado) {
            if (resultado.length > 0) {
                var row = resultado[0];
                
                // Formata o resultado do SQL para a estrutura esperada pelo frontend
                var metricasFormatadas = {
                    totalUsuarios: Number(row.totalUsuarios),
                    totalTentativas: Number(row.totalTentativas),
                    respostas: [
                        { acertos: Number(row.acertos_q1), erros: Number(row.erros_q1) },
                        { acertos: Number(row.acertos_q2), erros: Number(row.erros_q2) },
                        { acertos: Number(row.acertos_q3), erros: Number(row.erros_q3) },
                        { acertos: Number(row.acertos_q4), erros: Number(row.erros_q4) },
                        { acertos: Number(row.acertos_q5), erros: Number(row.erros_q5) },
                        { acertos: Number(row.acertos_q6), erros: Number(row.erros_q6) },
                        { acertos: Number(row.acertos_q7), erros: Number(row.erros_q7) },
                        { acertos: Number(row.acertos_q8), erros: Number(row.erros_q8) },
                        { acertos: Number(row.acertos_q9), erros: Number(row.erros_q9) },
                        { acertos: Number(row.acertos_q10), erros: Number(row.erros_q10) },
                        { acertos: Number(row.acertos_q11), erros: Number(row.erros_q11) },
                        { acertos: Number(row.acertos_q12), erros: Number(row.erros_q12) }
                    ]
                };

                res.status(200).json(metricasFormatadas);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao obter as métricas do quiz! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    salvar,
    obterMetricas
};
