import bcrypt from 'bcryptjs';

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { tableName: 'User' }
  );

  User.beforeCreate((user) => {
    return bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
    });
  });
  return User;
};
