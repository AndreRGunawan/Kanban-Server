'use strict';

const { encryptPassword } = require("../helpers/bcrypt.js")

module.exports = (sequelize, DataTypes) => {
  // const User = sequelize.define('User', {
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING,
  //   role: DataTypes.STRING
  // }, {});
  
  class User extends sequelize.Sequelize.Model {}

  User.init({
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      unique:{
        args: true,
        msg: 'Email is already registered'
      },
      allowNull: false,
      validate: {
        notNull:{
          args: true,
          msg: "Email cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Email must be provided"
        },
        isEmail : {
          args: true,
          msg: "Submitted email must follow email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    }
  }, {
    hooks:{
      beforeCreate: (user, options) => {
        user.password = encryptPassword(user.password)
      }
    },
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)

  };
  return User;
};