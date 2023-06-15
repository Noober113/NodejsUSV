'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Receive extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Receive.init({
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING,
        speed: DataTypes.STRING,
        course: DataTypes.STRING,
        distance: DataTypes.STRING,
        object: DataTypes.BOOLEAN,
        timeToStart: DataTypes.DATE,
        status: DataTypes.STRING,
        status_rubbish: DataTypes.STRING,
        value_1: DataTypes.STRING,
        value_2: DataTypes.STRING,
        value_3: DataTypes.STRING,
        value_4: DataTypes.STRING,
        value_5: DataTypes.STRING,
        value_6: DataTypes.STRING,
        value_7: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Receive',
    });
    return Receive;
};