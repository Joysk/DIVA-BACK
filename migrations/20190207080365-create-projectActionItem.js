'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProjectActionItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectActionId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      actionItemId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('ProjectActionItems', ['projectActionId', 'actionItemId']))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProjectActionItems')
  }
}
