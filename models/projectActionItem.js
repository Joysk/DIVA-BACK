'use strict'
module.exports = (sequelize, DataTypes) => {
  const ProjectActionItem = sequelize.define('ProjectActionItem', {
    value: DataTypes.INTEGER
  }, {})
  ProjectActionItem.associate = function (models) {
    ProjectActionItem.belongsTo(models.ProjectAction)
    ProjectActionItem.belongsTo(models.ActionItem)
  }
  return ProjectActionItem
}
