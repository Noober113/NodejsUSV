'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('point_tests', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            value1: {
                type: Sequelize.STRING
            },
            value2: {
                type: Sequelize.STRING
            },
            value3: {
                type: Sequelize.STRING
            },
            value4: {
                type: Sequelize.STRING
            }, value5: {
                type: Sequelize.STRING
            }, value6: {
                type: Sequelize.STRING
            }, value7: {
                type: Sequelize.STRING
            }, value8: {
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
        await queryInterface.dropTable('point_tests');
    }
};