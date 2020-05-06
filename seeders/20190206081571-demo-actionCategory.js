'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ActionCategories', [{
      name: 'Underground work',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Cable',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Others',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ActionCategories', null, {})
  }
}
