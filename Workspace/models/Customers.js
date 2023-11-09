const Sequelize = require('sequelize');

/**
 * 
 * @param {Sequelize.Sequelize} sequelize 
 * @param {Customers} DataTypes 
 * @returns 
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customers', {
    CustomerId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CompanyName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    ContactName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    ContactTitle: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    City: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Region: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    PostalCode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Country: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Phone: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    Fax: {
      type: DataTypes.STRING(24),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Customers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "City",
        fields: [
          { name: "City" },
        ]
      },
      {
        name: "CompanyName",
        fields: [
          { name: "CompanyName" },
        ]
      },
      {
        name: "Customers_pkey",
        unique: true,
        fields: [
          { name: "CustomerId" },
        ]
      },
      {
        name: "PostalCode",
        fields: [
          { name: "PostalCode" },
        ]
      },
      {
        name: "Region",
        fields: [
          { name: "Region" },
        ]
      },
    ]
  });
};
