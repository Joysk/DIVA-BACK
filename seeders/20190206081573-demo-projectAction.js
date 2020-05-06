'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProjectActions', [{
      name: 'Tiefbau von Muffe 101 bis Dorfstr. 57a',
      projectId: 1,
      actionTypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Grube A',
      projectId: 1,
      actionTypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Tiefbau von Grube A bis Haus 57a',
      projectId: 1,
      actionTypeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProjectActions', null, {})
  }
}
