const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testsqlnode', 'root', '1122334455', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false 
});

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error; 
    }
}

async function executeRawQuery(query, replacements = {}) {
    try {
        const [results] = await sequelize.query(query, {
            replacements,
            type: Sequelize.QueryTypes.SELECT
        });

        return results;
    } catch (error) {
        console.error("Error in executeRawQuery:", error);
        throw error;
    }
}

module.exports = { initializeDatabase, executeRawQuery };