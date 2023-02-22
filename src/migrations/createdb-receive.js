'use strict';
/** @type {import('sequelize-cli').Migration} */
// latitude: DataTypes.STRING,
//         longitude: DataTypes.STRING,
//         speed: DataTypes.STRING,
//         course: DataTypes.STRING,
//         distance: DataTypes.STRING,
//         object: DataTypes.STRING,
//         timeToStart: DataTypes.DATE,
//         timeToStop: DataTypes.DATE,
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('receive', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            latitude: {
                type: Sequelize.STRING
            },
            longitude: {
                type: Sequelize.STRING
            },
            speed: {
                type: Sequelize.STRING
            },
            course: {
                type: Sequelize.STRING
            },
            distance: {
                type: Sequelize.STRING
            },
            object: {
                type: Sequelize.BOOLEAN
            },
            timeToStart: {
                type: Sequelize.DATE
            },
            timeToStop: {
                type: Sequelize.DATE
            },
            status: {
                type: Sequelize.STRING
            },
            status_rubbish: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('receive');
    }
};