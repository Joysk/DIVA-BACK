'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ActionTypes', [{
      name: 'Without pavement',
      actionGroupId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Loose pavement',
      actionGroupId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Paving / Paving stone',
      actionGroupId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Asphalt',
      actionGroupId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Concrete',
      actionGroupId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Large / natural cobble',
      actionGroupId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Small / mosaic cobble',
      actionGroupId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ActionTypes', null, {})
  }
}
