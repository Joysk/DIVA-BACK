'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define('UserProject', {
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    permission: DataTypes.INTEGER
  }, {})
  UserProject.associate = function (models) {
  }
  return UserProject
}
