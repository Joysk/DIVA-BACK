'use strict'
module.exports = (sequelize, DataTypes) => {
  const ActionType = sequelize.define('ActionType', {
    name: DataTypes.STRING
  }, {})
  ActionType.associate = function (models) {
    ActionType.belongsTo(models.ActionGroup)
    ActionType.hasMany(models.ProjectAction)
    ActionType.hasMany(models.ActionItem)
  }
  return ActionType
}
