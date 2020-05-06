'use strict'
module.exports = (sequelize, DataTypes) => {
  const ActionCategory = sequelize.define('ActionCategory', {
    name: DataTypes.STRING
  }, {})
  ActionCategory.associate = function (models) {
    ActionCategory.hasMany(models.ActionGroup)
  }
  return ActionCategory
}
