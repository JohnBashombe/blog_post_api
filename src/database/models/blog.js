module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define(
    "Blog",
    {
      blogId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { tableName: "Blog" }
  );

  return Blog;
};
