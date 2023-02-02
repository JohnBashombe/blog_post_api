require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
  },
  test: {
    username: process.env.DATABASE_USERNAME_TEST,
    password: process.env.DATABASE_PASSWORD_TEST,
    database: process.env.DATABASE_NAME_TEST,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
  },
  production: {
    username: "root",
    password: "password",
    database: "blog_post_api",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
