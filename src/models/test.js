'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class point_test extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    point_test.init({
        value1: DataTypes.STRING,
        value2: DataTypes.STRING,
        value3: DataTypes.STRING,
        value4: DataTypes.STRING,
        value5: DataTypes.STRING,
        value6: DataTypes.STRING,
        value7: DataTypes.STRING,
        value8: DataTypes.STRING,

    },
        {
            sequelize,
            modelName: 'point_test',
        });
    return point_test;
};