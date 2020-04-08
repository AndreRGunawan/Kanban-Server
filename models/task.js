'use strict';
module.exports = (sequelize, DataTypes) => {

  class Task extends sequelize.Sequelize.Model {}

  Task.init({

    title: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    tags: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    due_date: {
      type: DataTypes.DATE
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Task' // We need to choose the model name
  });



  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};