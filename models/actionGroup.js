'use strict'
module.exports = (sequelize, DataTypes) => {
  const ActionGroup = sequelize.define('ActionGroup', {
    name: DataTypes.STRING
  }, {})
  ActionGroup.associate = function (models) {
    ActionGroup.hasMany(models.ActionType)
    ActionGroup.belongsTo(models.ActionCategory)
  }
  return ActionGroup
}
