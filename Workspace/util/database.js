

// Option 1: Passing a connection URI
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 3: Passing parameters separately (other dialects)

const { Sequelize, DataTypes } = require('sequelize');
const CONFIG = require('../config/config.json')

const sequelize = new Sequelize(
  CONFIG.POSTGRES.database, CONFIG.POSTGRES.username, CONFIG.POSTGRES.password,
  {
    host: CONFIG.POSTGRES.host,
    dialect: CONFIG.POSTGRES.dialect,
  }
);

const Employees = require('../models/Employees');
Employees(sequelize, DataTypes);

module.exports = sequelize;