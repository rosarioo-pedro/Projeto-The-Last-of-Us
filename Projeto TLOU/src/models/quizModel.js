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

function obterMetricas() {
    console.log("ACESSEI O QUIZ MODEL para obter métricas gerais");
    
    var instrucaoSql = `
        SELECT 
            COALESCE(SUM(q1), 0) as acertos_q1, (COALESCE(COUNT(q1), 0) - COALESCE(SUM(q1), 0)) as erros_q1,
            COALESCE(SUM(q2), 0) as acertos_q2, (COALESCE(COUNT(q2), 0) - COALESCE(SUM(q2), 0)) as erros_q2,
            COALESCE(SUM(q3), 0) as acertos_q3, (COALESCE(COUNT(q3), 0) - COALESCE(SUM(q3), 0)) as erros_q3,
            COALESCE(SUM(q4), 0) as acertos_q4, (COALESCE(COUNT(q4), 0) - COALESCE(SUM(q4), 0)) as erros_q4,
            COALESCE(SUM(q5), 0) as acertos_q5, (COALESCE(COUNT(q5), 0) - COALESCE(SUM(q5), 0)) as erros_q5,
            COALESCE(SUM(q6), 0) as acertos_q6, (COALESCE(COUNT(q6), 0) - COALESCE(SUM(q6), 0)) as erros_q6,
            COALESCE(SUM(q7), 0) as acertos_q7, (COALESCE(COUNT(q7), 0) - COALESCE(SUM(q7), 0)) as erros_q7,
            COALESCE(SUM(q8), 0) as acertos_q8, (COALESCE(COUNT(q8), 0) - COALESCE(SUM(q8), 0)) as erros_q8,
            COALESCE(SUM(q9), 0) as acertos_q9, (COALESCE(COUNT(q9), 0) - COALESCE(SUM(q9), 0)) as erros_q9,
            COALESCE(SUM(q10), 0) as acertos_q10, (COALESCE(COUNT(q10), 0) - COALESCE(SUM(q10), 0)) as erros_q10,
            COALESCE(SUM(q11), 0) as acertos_q11, (COALESCE(COUNT(q11), 0) - COALESCE(SUM(q11), 0)) as erros_q11,
            COALESCE(SUM(q12), 0) as acertos_q12, (COALESCE(COUNT(q12), 0) - COALESCE(SUM(q12), 0)) as erros_q12,
            COUNT(DISTINCT idUsuario) as totalUsuarios,
            COUNT(id) as totalTentativas
        FROM quiz;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvar,
    obterMetricas
};
