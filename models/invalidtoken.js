'use strict'
module.exports = (sequelize, DataTypes) => {
  const InvalidToken = sequelize.define('InvalidToken', {
    token: DataTypes.STRING
  }, {})
  InvalidToken.associate = function (models) {
    // associations can be defined here
  }
  return InvalidToken
}
