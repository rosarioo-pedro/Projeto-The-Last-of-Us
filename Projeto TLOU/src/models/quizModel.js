var database = require("../database/config");

function salvar(idUsuario, respostas) {
    console.log("ACESSEI O QUIZ MODEL para salvar as respostas do usuario:", idUsuario);

    // Mapeia e higieniza as respostas de q1 a q12 para garantir que sejam inteiros (0 ou 1)
    var q = [];
    for (var i = 0; i < 12; i++) {
        var valor = parseInt(respostas[i]);
        q[i] = (valor === 1) ? 1 : 0;
    }

    var instrucaoSql = `
        INSERT INTO quiz (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, idUsuario) 
        VALUES (${q[0]}, ${q[1]}, ${q[2]}, ${q[3]}, ${q[4]}, ${q[5]}, ${q[6]}, ${q[7]}, ${q[8]}, ${q[9]}, ${q[10]}, ${q[11]}, ${idUsuario});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidas() {
    console.log("ACESSEI O QUIZ MODEL para buscar ultimas medidas");

    var instrucaoSql = `
        SELECT 
            SUM(q1) as acertos_q1, (COUNT(q1) - SUM(q1)) as erros_q1,
            SUM(q2) as acertos_q2, (COUNT(q2) - SUM(q2)) as erros_q2,
            SUM(q3) as acertos_q3, (COUNT(q3) - SUM(q3)) as erros_q3,
            SUM(q4) as acertos_q4, (COUNT(q4) - SUM(q4)) as erros_q4,
            SUM(q5) as acertos_q5, (COUNT(q5) - SUM(q5)) as erros_q5,
            SUM(q6) as acertos_q6, (COUNT(q6) - SUM(q6)) as erros_q6,
            SUM(q7) as acertos_q7, (COUNT(q7) - SUM(q7)) as erros_q7,
            SUM(q8) as acertos_q8, (COUNT(q8) - SUM(q8)) as erros_q8,
            SUM(q9) as acertos_q9, (COUNT(q9) - SUM(q9)) as erros_q9,
            SUM(q10) as acertos_q10, (COUNT(q10) - SUM(q10)) as erros_q10,
            SUM(q11) as acertos_q11, (COUNT(q11) - SUM(q11)) as erros_q11,
            SUM(q12) as acertos_q12, (COUNT(q12) - SUM(q12)) as erros_q12,
            COUNT(DISTINCT idUsuario) as totalUsuarios,
            COUNT(id) as totalTentativas
        FROM quiz;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal() {
    console.log("ACESSEI O QUIZ MODEL para buscar medidas em tempo real");

    var instrucaoSql = `
        SELECT 
            SUM(q1) as acertos_q1, (COUNT(q1) - SUM(q1)) as erros_q1,
            SUM(q2) as acertos_q2, (COUNT(q2) - SUM(q2)) as erros_q2,
            SUM(q3) as acertos_q3, (COUNT(q3) - SUM(q3)) as erros_q3,
            SUM(q4) as acertos_q4, (COUNT(q4) - SUM(q4)) as erros_q4,
            SUM(q5) as acertos_q5, (COUNT(q5) - SUM(q5)) as erros_q5,
            SUM(q6) as acertos_q6, (COUNT(q6) - SUM(q6)) as erros_q6,
            SUM(q7) as acertos_q7, (COUNT(q7) - SUM(q7)) as erros_q7,
            SUM(q8) as acertos_q8, (COUNT(q8) - SUM(q8)) as erros_q8,
            SUM(q9) as acertos_q9, (COUNT(q9) - SUM(q9)) as erros_q9,
            SUM(q10) as acertos_q10, (COUNT(q10) - SUM(q10)) as erros_q10,
            SUM(q11) as acertos_q11, (COUNT(q11) - SUM(q11)) as erros_q11,
            SUM(q12) as acertos_q12, (COUNT(q12) - SUM(q12)) as erros_q12,
            COUNT(DISTINCT idUsuario) as totalUsuarios,
            COUNT(id) as totalTentativas
        FROM quiz;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvar,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
};
