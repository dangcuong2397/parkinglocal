const Sequelize = require("sequelize");
const db = require('../../base/mysql/mysql');
const media = db.sequelize.define('media', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    company: {
        type: Sequelize.STRING,
        allowNull: true
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    create_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    uuid: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports ={
    media: media,
}