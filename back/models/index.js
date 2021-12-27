// Restricted JavaScript
'use strict';

// FS for file system module help to store, access, and manage data on server
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db.config.json')[env];
const db = {};

let sequelize;

// New instance of Sequelize for initiating
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Better way to do this
// db.user = require("../models/user.model.js")(sequelize, Sequelize);
// Get all files in models folder
fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  }).forEach(file => {
    // Add DataTypes = Sequelize for each files in models
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associate each key in models
// More informations : 
// https://sequelize.org/master/class/lib/associations/base.js~Association.html
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;