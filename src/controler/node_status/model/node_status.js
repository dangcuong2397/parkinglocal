const Sequelize = require("sequelize");
const db = require('../../base/mysql/mysql');
const node_status = db.sequelize.define('node_status', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    node_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    create_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    note: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

module.exports ={
    node_status:node_status,
}