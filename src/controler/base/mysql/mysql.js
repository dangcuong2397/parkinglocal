
const Sequelize = require("sequelize");
const convert = require('../convert');

let host = process.env.mysql_localhost;
let port = process.env.mysql_port;
let user = process.env.mysql_user;
let password = process.env.mysql_password;
let database = process.env.mysql_database;
let connectionLimit = parseInt(process.env.mysql_connectionLimit,10);

const sequelize = new Sequelize(database, user, password, {
    host: host,
    port: port,
    logging: false,
    dialect: 'mysql',
    timezone: '+07:00',
    pool: {
        max: connectionLimit,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    define: {
        freezeTableName: true,
        timestamps: false,
        underscored: false
    },
    dialectOptions: {
        typeCast: function (field, next) { // for reading from database
            if (field.type === 'DATETIME' || field.type === 'DATE') {
                return convert.convertOutputDate(field.string())
            }
            return next()
        },
    }
});
function authenticate(){
    let connection = setInterval(() => {
        authenticate();
    }, 1000 * 60 * 1);
    sequelize.authenticate()
        .then(function (conn) {
            clearInterval(connection);
            console.log(`Database connected: ${host}:${port}`);
        })
        .catch(e => console.log(`ERROR: NOT CONNECTED TO DATABASE | ${e}`));
}
authenticate();

module.exports = {
    sequelize
};