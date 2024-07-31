const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testpostnode', 'postgres', '1122334455', {
    host: 'localhost',
    dialect: 'postgres',
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
            type: Sequelize.QueryTypes.SELECT // Specify the query type
        });

        return results;
    } catch (error) {
        console.error("Error in executeRawQuery:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

module.exports = { initializeDatabase, executeRawQuery };