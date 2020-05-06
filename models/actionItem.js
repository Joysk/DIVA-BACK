'use strict'
module.exports = (sequelize, DataTypes) => {
  const ActionItem = sequelize.define('ActionItem', {
    name: DataTypes.STRING
  }, {})
  ActionItem.associate = function (models) {
    ActionItem.belongsTo(models.ActionType)
  }
  return ActionItem
}
