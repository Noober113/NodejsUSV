'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Send extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Send.init({
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING,
        round: DataTypes.BOOLEAN,
        start: DataTypes.BOOLEAN,
        time: DataTypes.DATE,
        speed: DataTypes.STRING,
        value_1: DataTypes.STRING,
        value_2: DataTypes.STRING,
        value_3: DataTypes.STRING,
        value_4: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Send',
    });
    return Send;
};