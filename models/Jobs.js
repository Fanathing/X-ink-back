const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Jobs = sequelize.define('Jobs', {
  ID: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID'
  },
  COMPANIES_ID: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'COMPANIES_ID',
    references: {
      model: 'Companies',
      key: 'ID'
    }
  },
  TITLE: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'TITLE'
  },
  JOB_DESCRIPTION: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'JOB_DESCRIPTION'
  },
  DEADLINE: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'DEADLINE'
  },
  STATUS: {
    type: DataTypes.ENUM('OPEN', 'CLOSED'),
    allowNull: false,
    defaultValue: 'OPEN',
    field: 'STATUS'
  },
  CREATED_AT: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'CREATED_AT'
  }
}, {
  tableName: 'Jobs',
  timestamps: false,
  underscored: false
});

module.exports = Jobs;


