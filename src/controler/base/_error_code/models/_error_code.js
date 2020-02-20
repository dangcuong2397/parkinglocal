'use strict';
/**
 * Module:
 * Author:      Tinasoft.vn
 * Created by:  @Harian
 * Modified:
 *
 */

const Sequelize = require("sequelize");
const db = require('../../mysql/mysql');

const _error_code = db.sequelize.define('_error_code', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    statusCode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    errorCode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    errorMessage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    errorDescription: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    }
},{
    indexes: [
        {
            unique: true,
            fields: ["errorCode"]
        }
    ]
});

module.exports = {
    _Error_Code: _error_code,
};
