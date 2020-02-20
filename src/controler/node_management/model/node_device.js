const Sequelize = require("sequelize");
const db = require('../../base/mysql/mysql');
const node_device = db.sequelize.define('node_device', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    ip: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    park_name: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    row: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    col: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    floor: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    x_pixcel: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: null
    },
    y_pixcel: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: null
    },
});

module.exports ={
    node_device:node_device,
}