module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,

    /** DATABASE */
    db: {
        DB_HOST: 'db-mysql-mqtt-do-user-10749675-0.b.db.ondigitalocean.com',
        DB_USER: 'doadmin',
        DB_PASS: 'AVNS_0hx54_Ymeee5eb4Nu4M',
        DB_NAME: 'mqtt',
        DB_PORT: '25060',
        dialect: "mysql",

        // pool is optional, it will be used for Sequelize connection pool configuration
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },

    /** AUTH KEY */
    auth: {
        secret: "our-secret-key"
    }
};