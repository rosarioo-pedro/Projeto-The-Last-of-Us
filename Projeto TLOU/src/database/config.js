var mysql = require("mysql2");

// CONEXÃO DO BANCO MYSQL SERVER
var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

function executar(instrucao) {

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        // Clona a configuração padrão
        var config = {
            host: mySqlConfig.host,
            database: mySqlConfig.database,
            user: mySqlConfig.user,
            password: mySqlConfig.password,
            port: mySqlConfig.port
        };

        // Roteamento Automático de Consultas:
        // Se a instrução for um SELECT ou SHOW, e houver credenciais de leitura configuradas, nós as usamos
        var instrucaoFormatada = instrucao.trim().toUpperCase();
        if ((instrucaoFormatada.startsWith("SELECT") || instrucaoFormatada.startsWith("SHOW")) && process.env.DB_USER_SELECT) {
            config.user = process.env.DB_USER_SELECT;
            config.password = process.env.DB_PASSWORD_SELECT;
            console.log(`\n[Database] Roteando consulta SELECT para o usuário de leitura: '${config.user}'`);
        } else {
            console.log(`\n[Database] Executando comando para o usuário padrão: '${config.user}'`);
        }

        var conexao = mysql.createConnection(config);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

module.exports = {
    executar
};