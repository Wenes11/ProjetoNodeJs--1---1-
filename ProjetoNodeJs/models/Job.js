const db = require('../db/conection'); // Importação única
const {Sequelize} = require('sequelize'); // Certifique-se de usar "S" maiúsculo
/// criando tabela
const Job = db.define('job',{
    title:{
        type: Sequelize.STRING,
    },
    salario:{
        type: Sequelize.STRING,
    },
    empresa:{
        type: Sequelize.STRING,
    },
    email:{
        type: Sequelize.STRING,
    },
    novo_emprego:{
        type: Sequelize.INTEGER,
    },
    descricao:{
        type: Sequelize.STRING,
    },

    
});
module.exports = Job;