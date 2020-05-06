'use strict'

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    contactPerson: DataTypes.STRING,
    projectLeader: DataTypes.STRING,
    smNo: DataTypes.STRING,
    internalNo: DataTypes.STRING,
    city: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
    begin: DataTypes.DATE,
    end: DataTypes.DATE
  }, {})
  Project.associate = function (models) {
    Project.belongsTo(models.Client)
    Project.belongsToMany(models.User, { through: models.UserProject })
  }
  return Project
}
