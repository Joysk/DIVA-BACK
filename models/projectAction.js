'use strict'
module.exports = (sequelize, DataTypes) => {
  const ProjectAction = sequelize.define('ProjectAction', {
    name: DataTypes.STRING
  }, {})
  ProjectAction.associate = function (models) {
    ProjectAction.belongsTo(models.ActionType)
    ProjectAction.belongsTo(models.Project)
  }
  return ProjectAction
}
