const Sequelize = require("sequelize");
const db = require('../../base/mysql/mysql');
const location_vehicle = db.sequelize.define('location_vehicle', {
    id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    rfid: {
        type: Sequelize.STRING,
        allowNull: true
    },
    node_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
    },
    create_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
    },
});

module.exports ={
    location_vehicle: location_vehicle,
}