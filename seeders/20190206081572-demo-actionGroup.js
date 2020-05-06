'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ActionGroups', [{
      name: 'Pit',
      actionCategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Ditch',
      actionCategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Standard position',
      actionCategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Cable reel',
      actionCategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Installation',
      actionCategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Standard position',
      actionCategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Standard position',
      actionCategoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ActionGroups', null, {})
  }
}
