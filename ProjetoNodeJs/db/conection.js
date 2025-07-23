const { Sequelize } = require('sequelize');
const path = require('path');  // Para garantir que o caminho seja correto em diferentes sistemas operacionais

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'app.db')  // Usando o path para garantir que o arquivo db.app.db seja resolvido corretamente
});

module.exports = sequelize;
