const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false 


});

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully...');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error; 
    }
}

async function executeRawQuery(query, replacements = {}) {
    try {
        const [results] = await sequelize.query(query, {
            replacements
        });

        return results;
    } catch (error) {
        console.error("Error in executeRawQuery:", error);
        throw error;
    }
}

module.exports = { initializeDatabase, executeRawQuery , sequelize};
