'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clients', [{
      name: 'Swisscom',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Init7',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Sunrise',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clients', null, {})
  }
}
