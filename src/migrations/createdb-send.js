'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sends', {
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
            round: {
                type: Sequelize.BOOLEAN
            },
            start: {
                type: Sequelize.BOOLEAN
            },
            time: {
                type: Sequelize.DATE
            }, speed: {
                type: Sequelize.STRING
            }, value_1: {
                type: Sequelize.STRING
            }, value_2: {
                type: Sequelize.STRING
            }, value_3: {
                type: Sequelize.STRING
            }, value_4: {
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
        await queryInterface.dropTable('sends');
    }
};