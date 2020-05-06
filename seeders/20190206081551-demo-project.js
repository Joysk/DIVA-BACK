'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', [{
      name: 'FTTH Luzern',
      description: 'Alpenquai 10',
      contactPerson: 'James Rogerson',
      projectLeader: 'Leo Kidel',
      smNo: '123',
      internalNo: '321',
      city: 'Luzern',
      clientId: 1,
      begin: new Date(),
      end: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'FTTH Ebikon',
      description: 'Schmiedhof 3',
      contactPerson: 'Pinocci Hardi',
      projectLeader: 'Stefan Meier',
      smNo: '124',
      internalNo: '421',
      city: 'Ebikon',
      clientId: 1,
      begin: new Date(),
      end: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'FTTH Root D4',
      description: 'Oberfeldmatt 10',
      contactPerson: 'Edward Peterson',
      projectLeader: 'Mike Müller',
      smNo: '125',
      internalNo: '521',
      city: 'Root',
      clientId: 2,
      begin: new Date(),
      end: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {})
  }
}
